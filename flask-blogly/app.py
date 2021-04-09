"""Blogly application."""

from flask import Flask, request, redirect, render_template, flash, url_for
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, User, Post, Tag, PostTag, db


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "Secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)
app.debug = True

connect_db(app)


@app.route('/', methods=['GET'])
def base_URL():
    """Shows home page"""
    p = Post.get_recent_posts()
    posts = [p[-1], p[-2], p[-3], p[-4], p[-5]]
    users = [User.get_single_user(p.user_id) for p in posts]
    tags = [p.tags for p in posts]

    return render_template("./recent_posts.html", posts=posts, users=users, tags=tags)


@app.route("/users", methods=["GET"])
def users():
    """Shows users page"""
    users = User.get_all_users()
    return render_template("./users.html", users=users)


@app.route("/user_detail/<id>", methods=["GET", "POST"])
def user_detail(id):
    """Show individual user detail page"""
    user = User.get_single_user(id)
    if user.img_url == "":
        user.img_url = "https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png"
    posts = user.posts
    if request.method == "POST":
        all_posts = request.form["all_posts"]
        return render_template("./user_detail.html", user=user, posts=posts, all_posts=all_posts)
    else:
        return render_template("./user_detail.html", user=user, posts=posts, all_posts="false")


@app.route("/create_user", methods=["GET"])
def create_user():
    """Show form to create a new user"""
    return render_template("./create_user.html")


@app.route("/add_user", methods=["POST"])
def add_user():
    """Add a new user to the database"""
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    img_url = request.form["img_url"]

    form_data = handle_form_data([first_name, last_name, img_url])

    if (form_data == "Missing input: First Name" or form_data == "Missing input: Last Name"):
        flash(form_data)
        return redirect("create_user")

    new_user = User(first_name=form_data[0],
                    last_name=form_data[1], img_url=form_data[2])
    User.add_user(new_user)
    return redirect(f"./user_detail/{new_user.id}")


@app.route("/edit_user/<id>", methods=["GET"])
def edit_user_form(id):
    """Show form to edit existing user"""
    user = User.get_single_user(id)
    return render_template("./edit_user.html", user=user)


@app.route("/edit_user/<id>", methods=["POST"])
def edit_user(id):
    """Edit existing customer information in database"""
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    img_url = request.form["img_url"]

    form_data = handle_form_data([first_name, last_name, img_url])
    if (form_data == "Missing input: First Name" or form_data == "Missing input: Last Name"):
        flash(form_data)
        return redirect(url_for("edit_user_form", id=id))

    User.update_user(User.get_single_user(id), form_data)

    return redirect(url_for("user_detail", id=id))


@app.route("/delete_user/<id>", methods=["POST"])
def delete_user(id):
    """Delete user from the database"""
    User.delete_user(id)
    return redirect(url_for("users"))


@app.route("/create_post/<id>", methods=["GET"])
def create_post(id):
    """Show form to create a new post"""
    user = User.get_single_user(id)
    tags = Tag.get_all_tags()
    return render_template("./create_post.html", user=user, tags=tags)


@ app.route("/add_post/", methods=["POST"])
def add_post():
    """Add new post"""
    user = User.get_single_user(request.form["user"])
    title = request.form["title"]
    content = request.form["content"]
    tags = request.form.getlist("tags")

    if (title == "" or content == ""):
        flash("Missing Input: Please fill out both Title and Content")
        return redirect(f"/create_post/{user.id}")

    post = Post(title=title, content=content, user_id=user.id)
    Post.add_post(post)
    for tag in tags:
        PostTag.add_post_tag(PostTag(post_id=post.id, tag_id=tag))

    return redirect(f"/post_detail/{post.id}")


@app.route("/post_detail/<post_id>", methods=["GET"])
def post_detail(post_id):
    """Show post detail template"""
    post = Post.get_single_post(post_id)
    user = User.get_single_user(post.user.id)
    tags = post.tags
    if user.img_url == "":
        user.img_url = "https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png"

    return render_template("./post_detail.html", post=post, user=user, tags=tags)


@app.route("/edit_post/<id>", methods=["GET"])
def edit_post_form(id):
    post = Post.get_single_post(id)
    tags = Tag.get_all_tags()
    return render_template("./edit_post.html", post=post, tags=tags)


@app.route("/edit_post/<id>", methods=["POST"])
def edit_post(id):
    """Edit existing customer information in database"""
    title = request.form["title"]
    content = request.form["content"]
    tags = request.form.getlist("tags")

    if (title == "" or content == ""):
        flash("Missing Input: Please fill out both Title and Content")
        return redirect(url_for("edit_post_form", id=id))

    post = Post.get_single_post(id)
    Post.update_post(post, [title, content])
    PostTag.delete_post_tags(post.id)
    for tag in tags:
        PostTag.add_post_tag(PostTag(post_id=post.id, tag_id=tag))

    return redirect(f"/post_detail/{id}")


@app.route("/delete_post/<id>", methods=["POST"])
def delete_post(id):
    """Delete user from the database"""
    post = Post.get_single_post(id)
    user = post.user_id
    Post.delete_post(id)
    return redirect(f"/user_detail/{user}")


def handle_form_data(form_data):
    if form_data[0] == "":
        return "Missing input: First Name"
    if form_data[1] == "":
        return "Missing input: Last Name"
    if form_data[2] == "":
        img = "https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png"
    else:
        img = form_data[2]

    return [form_data[0], form_data[1], img]


@app.route("/tag_list/", methods=["GET"])
def tag_list():
    """Show form to create a new tag"""
    tags = Tag.get_all_tags()
    return render_template("./tag_list.html", tags=tags)


@app.route("/create_tag", methods=["GET"])
def create_tag():
    """Show form to create a new tag"""
    return render_template("./create_tag.html")


@app.route("/tag_detail/<id>", methods=["GET"])
def tag_detail(id):
    """Show tag detail template"""
    tag = Tag.get_single_tag(id)
    posts = tag.posts
    return render_template("./tag_detail.html", tag=tag, posts=posts)


@app.route("/edit_tag/<id>", methods=["GET"])
def edit_tag_form(id):
    tag = Tag.get_single_tag(id)
    return render_template("./edit_tag.html", tag=tag)


@app.route("/edit_tag/<id>", methods=["POST"])
def edit_tag(id):
    """Edit existing tag information in database"""
    tag = request.form["tag_name"]

    if (tag == ""):
        flash("Missing Input: Please fill out a tag name to edit tag")
        return redirect(f"/edit_tag/{id}")

    Tag.update_tag(Tag.get_single_tag(id), tag)

    return redirect(f"/tag_detail/{id}")


@app.route("/add_tag/", methods=["POST"])
def add_tag():
    """Add new tag"""
    name = request.form["tag_name"]

    if (name == ""):
        flash("Missing Input: Please fill a name for the tag")
        return redirect("/create_tag")

    tag = Tag(name=name)
    Tag.add_tag(tag)

    return redirect(f"/tag_detail/{tag.id}")


@app.route("/delete_tag/<id>", methods=["POST"])
def delete_tag(id):
    """Delete user from the database"""
    Tag.delete_tag(id)
    return redirect("/tag_list/")


@app.errorhandler(404)
def page_not_found(e):
    return render_template('page_not_found.html'), 404

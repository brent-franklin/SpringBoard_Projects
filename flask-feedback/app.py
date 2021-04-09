from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from werkzeug.exceptions import Unauthorized
from forms import LoginForm, RegisterForm, FeedbackForm
from models import User, Feedback, connect_db

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgres:///flask-feedback"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "shhhhh"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

toolbar = DebugToolbarExtension(app)

connect_db(app)


@app.route('/', methods=['GET'])
def base_URL():
    """Homepage"""

    return redirect('/login')


@app.route('/login', methods=['GET', "POST"])
def loginForm():
    """Show the login form at startup if user not logged in"""

    if "username" in session:
        return redirect(f'/users/{session.get("username")}')

    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)

        if user:
            session["username"] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ["Bad Username/Password"]

    return render_template("/login.html", form=form)


@app.route('/register', methods=['GET', 'POST'])
def register():
    """If user is logged in then go to homepage, if not then register"""
    form = RegisterForm()

    if form.validate_on_submit():
        new_user = {
            'username': form.username.data,
            'email': form.email.data,
            'first_name': form.first_name.data,
            'last_name': form.last_name.data
        }
        password = form.password.data
        user = User.register(new_user, password)
        session['username'] = user.username

        return redirect(f"/users/{user.username}")

    else:
        return render_template("/register.html", form=form)


@app.route("/users/<username>", methods=['GET'])
def user(username):
    """Show the text after log in successful"""
    if "username" not in session or username != session['username']:
        flash("Please log in first!")
        return redirect("/")
    user = User.get_single_user(username)

    return render_template("/users/user.html", user=user)


@app.route("/logout", methods=['GET'])
def logout():
    """Logout route."""

    session.pop("username")
    return redirect("/login")


@app.route("/users/<username>/delete", methods=["GET"])
def delete_user(username):
    """Delete a user from the database"""
    if "username" not in session or username != session['username']:
        raise Unauthorized()

    User.delete_user(username)

    return redirect('/logout')


@app.route("/users/<username>/feedback/add", methods=['GET', "POST"])
def feedback_form(username):
    """Show form to add feedback"""

    if "username" not in session or username != session['username']:
        raise Unauthorized()

    form = FeedbackForm()

    if form.validate_on_submit():
        new_feedback = {
            'title': form.title.data,
            'content': form.content.data,
            'username': username
        }
        Feedback.add_new_feedback(new_feedback)

        return redirect(f"/users/{username}")

    else:
        return render_template("/feedback/feedback.html", form=form, user=username)


@app.route("/feedback/<feedback_id>/update", methods=['GET', "POST"])
def update_feedback(feedback_id):
    """Get form to update existing feedback"""

    feedback = Feedback.get_single_feedback(feedback_id)

    if "username" not in session or feedback.username != session['username']:
        raise Unauthorized()

    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        update_feedback = {
            'title': form.title.data,
            'content': form.content.data
        }
        Feedback.update_feedback(feedback, **update_feedback)

        return redirect(f"/users/{feedback.username}")

    else:
        return render_template("/feedback/feedback.html", form=form, feedback=feedback.id)


@app.route("/feedback/<feedback_id>/delete", methods=["GET"])
def delete_feedback(feedback_id):
    """Delete a feedback from the database"""

    feedback = Feedback.get_single_feedback(feedback_id)

    if "username" not in session or feedback.username != session['username']:
        raise Unauthorized()

    Feedback.delete_feedback(feedback_id)

    return redirect('/')

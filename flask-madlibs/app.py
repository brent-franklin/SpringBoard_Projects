from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
import re
import string
from stories import Story

app = Flask(__name__)
app.config['SECRET_KEY'] = "Secret"
debug = DebugToolbarExtension(app)

stories = {
    "story1": """Once upon a time in a long-ago {place}, there lived a large {adjective} {noun}. It loved to {verb} {plural_noun}.""",
    "story2": """All I {verb-ed} to do when I got {place} was boot up my {noun} and to {verb} in my {adjective} pajamas""",
    "story3": """I heard that a {noun} that lived in the biggest {noun2} forgot to {verb} the family {plural_noun}. When will they {verb} to {verb2} effectively?"""
}


@app.route("/")
def base():
    """The home page"""
    return render_template("index.html")


@app.route("/index")
def index():
    """The home page"""
    return render_template("index.html")


@app.route("/story")
def story():
    """Insert Story to Parse into Madlib"""
    return render_template("story.html")


s = str()  # create global string object for user story


@app.route("/story", methods=["POST"])
def story_post():
    """Insert Story to Parse int:o Madlib"""
    global s
    s = request.form["madlib-entry"]  # fill s with entry
    user_string = re.findall("\S*[\w]*[\w]\S*", s)  # grab all words to put in list

    return render_template("make_lib.html", words=user_string)  # pass list on to make_lib


story = list()  # create global list object for user story


@app.route("/play", methods=["POST"])
def play():
    """Players time to insert descriptors"""
    story[:] = []  # empty list if there is anything initially
    s = request.form  # get user input for the user descriptors
    descriptors = list()  # create list for each descriptor to push to
    count = 1  # need dynamic numbers to allow multiple of same descriptors
    for k, v in s.items():  # grab form items
        if k[0] in string.punctuation or k[-1] in string.punctuation:
            x = re.sub("[\w]*[\w]", v, k)
            if v != "":  # if item != undefined then append to descriptor and story
                print(x)
                story.append("{" + f"{count}: {x}" + "}")
                descriptors.append(f"{count}: {x}")
            else:  # else append word only to story
                story.append(k)
        else:
            if v != "":  # if item != undefined then append to descriptor and story
                story.append("{" + f"{count}: {v}" + "}")
                descriptors.append(f"{count}: {v}")
            else:
                story.append(k)
        count += 1
    return render_template("play.html", descriptors=descriptors)


@app.route("/final_story", methods=["POST"])
def final_story():
    """Show final madlib"""
    global s
    global story
    ans = request.form.to_dict()
    words = list()
    text = ""
    for word in story:
        if re.match("\W", word):
            text += word + " "
        else:
            text = text + word + " "
    for key, val in ans.items():
        words.append(key)
    final = Story(words, text)
    print(ans)
    fs = final.generate(ans)
    return render_template("final_story.html", final_story=fs, original_story=s)


@app.route("/form")
def form():
    "The Form itself"
    return render_template("form.html")

# @app.route("/form/<story>")
# def story_time(story):
#     if story == "story1":
#         return "<h1>Test</h1>"
#     elif story == "story2":
#         return "<h1>TestTest</h1>"
#     elif story == "story3":
#         return "<h1>TestTestTest</h1>"

# @app.route("/form/<story>", methods=["POST"])
# def story_time(story):
#     if story == 'story1':
#         words = {
#             "place": request.form["place"],
#             "noun": request.form["noun"],
#             "verb": request.form["verb"],
#             "adjective": request.form["adjective"],
#             "plural_noun": request.form["plural_noun"]
#         }
#         lib = Story(["place", "adjective", "noun", "verb", "plural_noun"],
#                     """Once upon a time in a long-ago {place}, there lived a large {adjective} {noun}. It loved to {verb} {plural_noun}.""")
#         return render_template("story.html", madlib=lib.generate(words))
#     elif story == "story2":
#         words = {
#             "verb-ed": request.form["plural_noun"],
#             "place": request.form["place"],
#             "noun": request.form["noun"],
#             "verb": request.form["verb"],
#             "adjective": request.form["adjective"]
#         }
#         lib = Story(["verb-ed", "place", "noun", "verb", "adjective"],
#                     """All I {verb-ed} to do when I got {place} was boot up my {noun} and to {verb} in my {adjective} pajamas""")
#         return render_template("story.html", madlib=lib.generate(words))
#     else:
#         words = {
#             "noun": request.form["noun"],
#             "noun2": request.form["noun2"],
#             "verb": request.form["verb"],
#             "plural_noun": request.form["plural_noun"],
#             "verb": request.form["verb"],
#             "verb2": request.form["verb2"]
#         }
#         lib = Story(["noun", "noun2", "verb", "plural_noun", "verb", "verb2"],
#                     """I heard that a {noun} that lived in the biggest {noun2} forgot to {verb} the family {plural_noun}. When will they {verb} to {verb2} effectively?""")
#         return render_template("story.html", madlib=lib.generate(words))
#

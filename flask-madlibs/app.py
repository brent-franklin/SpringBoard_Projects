from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
import re
import string
from stories import Story

app = Flask(__name__)
app.config['SECRET_KEY'] = "Secret"
debug = DebugToolbarExtension(app)

# Preset Stories
stories = [
  """Once upon a time in a long-ago {Place}, there lived a large {Adjective} {Noun}. It loved to {Verb} {Plural Noun}.""",
  """All I wanted to {Verb} when I got {Place} was boot up my {Noun} and to {Verb} in my {Adjective} pajamas.""",
  """I heard that a {Noun} that lived in the biggest {Noun 2} forgot to {Verb} the family {Plural Noun}. When will they {Verb 3} to {Verb 4} effectively?"""
]

@app.route("/")
def base():
    """The base page"""
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
    """Players will now insert descriptors"""
    story[:] = []  # empty list if there is anything initially
    s = request.form  # get user input for the user descriptors
    descriptors = list()  # create list for each descriptor to push to
    count = 1  # need dynamic numbers to allow multiple of same descriptors
    for k, v in s.items():  # grab form items
        if k[0] in string.punctuation or k[-1] in string.punctuation:
            x = re.sub("[\w]*[\w]", v, k)
            if v != "":  # if item != undefined then append to descriptor and story
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
    ans = request.form.to_dict() # grab input from form
    words = list() # create list to store values from form
    text = "" # Move words global variable "story" into a string
    for word in story:
        text += word + " "
    for key, val in ans.items(): # get the keys to generate story with descriptors
        words.append(key)
    final = Story(words, text) # add story info
    fs = final.generate(ans) # generate story with user input
    return render_template("final_story.html", final_story=fs, original_story=s)


@app.route("/form")
def form():
    "The Form itself"
    return render_template("form.html")

words = []
@app.route("/form/<story>")
def story_time(story):
    """These set up the preset madlibs, sets up 3 form options to play"""
    global words
    words[:] = [] # Make sure list of words is empty before setting new values
    if story == "1":
        words = ["Place", "Adjective", "Noun", "Verb", "Plural Noun"]
        return render_template("form.html", Id=story, words=words)
    elif story == "2":
        words = ["Verb", "Place", "Noun", "Verb","Adjective"]
        return render_template("form.html", Id=story, words=words)
    elif story == "3":
        words = ["Noun", "Noun 2", "Verb", "Plural Noun", "Verb 3", "Verb 4"]
        return render_template("form.html", Id=story, words=words)


@app.route("/madlib/<Id>", methods=["POST"])
def madlib(Id):
    """Generates madlib from preset story and user input"""
    ans = request.form.to_dict()
    madlib = Story(words, stories[int(Id) - 1])
    return render_template("madlib.html", madlib=madlib.generate(ans))



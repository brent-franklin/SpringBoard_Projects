from flask import Flask, request, redirect, render_template, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import surveys

# Set flask app config and debug
app = Flask(__name__)
app.config['SECRET_KEY'] = "Secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)



@app.route("/")
def base():
    """
    Main Route for home page
    """
    return render_template("index.html", surveys=surveys)

# Store user input in flask sessions
@app.route("/sessions", methods=["POST"])
def sessions():
    """
    Init sessions data
    """
    session['response'] = [] # set responses
    session['survey'] = request.form['survey'] # set chosen survey
    return redirect('/questions/0') # redirect to questions

# Route to each question
@app.route("/questions/<num>")
def questions(num):
    """
    Adding data for each question for questions.html
    """
    if int(num) != len(session["response"]): #  if url does not match point in survey
        flash("User Attempted to Access Invalid Question") # flash error message
        return redirect(f"/questions/{len(session['response'])}") # redirect to correct point in survey
    chosen_survey = surveys[session['survey']]
    survey = chosen_survey.questions[int(num)]
    title = chosen_survey.title
    instructions = chosen_survey.instructions
    question = survey.question
    choices = survey.choices
    allow_text = survey.allow_text
    return render_template("questions.html", question=question, choices=choices, allow_text=allow_text, num=num,
                           title=title, instructions=instructions)

# Route to store user answers
@app.route("/answer", methods=["POST"])
def answer():
    """
    Parsing data from user input
    """
    answer = request.form.to_dict()
    survey = surveys[session['survey']]
    questions = survey.questions
    key = list(answer.keys())[0]
    res = session["response"]
    if len(list(answer.keys())) == 2: # if text input then add to response
        text = list(answer.values())[1]
        res.append(answer[key] + ", " + text)
    else: # if no text then just add answer to response
        res.append(answer[key])
    session['response'] = res # set in session
    next_num = int(key[-1]) + 1
    if len(questions) == len(session["response"]): # if all questions answered then say thanks
        return render_template("thanks.html", answers=res, questions=questions)
    else:
        return redirect(f"/questions/{next_num}") # if more questions continue to next question

from flask import Flask, request, jsonify, render_template, session
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret"

boggle_game = Boggle()

@app.route("/")
def base():
    board = boggle_game.make_board()
    session['board'] = board
    session['high-score'] = 0
    session['attempts'] = 0
    return render_template("base.html", board=board)

@app.route("/replay")
def replay():
    board = boggle_game.make_board()
    session['board'] = board
    return jsonify({"board": board})

@app.route("/check_input")
def check_input():
    input = request.args["user-input"]
    board = session['board']
    res = boggle_game.check_valid_word(board, input)
    return jsonify({"res": res})

@app.route("/save_game_data", methods=["POST"])
def save_game_data():
    req = request.json['params']
    if (int(session['high-score']) < int(req['score'])):
        session['high-score'] = req['score']
    session['attempts'] += 1
    return jsonify({"high-score": session['high-score'], "attempts": session['attempts']})
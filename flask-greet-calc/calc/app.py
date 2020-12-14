# Put your app in here.
from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)


@app.route("/add")
def add_nums():
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    return str(add(a, b))


@app.route("/sub")
def sub_nums():
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    return str(sub(a, b))


@app.route("/mult")
def mult_nums():
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    return str(mult(a, b))


@app.route("/div")
def div_nums():
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    return str(div(a, b))


@app.route("/math/<op>")
def math_nums(op):
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    ops = {
        "add": add,
        "sub": sub,
        "mult": mult,
        "div": div
    }
    return str(ops[op](a, b))

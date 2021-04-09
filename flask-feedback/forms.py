
from wtforms import StringField, PasswordField, TextAreaField
from wtforms.validators import InputRequired, Length, NumberRange, Email
from flask_wtf import FlaskForm


class LoginForm(FlaskForm):
    """Login form for new users"""

    username = StringField("Username", validators=[
                           InputRequired(), Length(min=1, max=20)])
    password = PasswordField("Password", validators=[
                             InputRequired(), Length(min=8, max=25)])


class RegisterForm(FlaskForm):
    """Register form for new users"""

    username = StringField("Username", validators=[
                           InputRequired(), Length(min=1, max=20)])
    password = PasswordField("Password", validators=[
                             InputRequired(), Length(min=8, max=25)])
    email = StringField("Email", validators=[
        InputRequired(), Email(), Length(min=1, max=50)])
    first_name = StringField("First Name", validators=[
        InputRequired(), Length(min=1, max=30)])
    last_name = StringField("Last Name", validators=[
        InputRequired(), Length(min=1, max=30)])


class FeedbackForm(FlaskForm):
    """Form to add feedback"""

    title = StringField("Title", validators=[
                        InputRequired(), Length(min=1, max=100)])
    content = TextAreaField("Content", validators=[InputRequired()])

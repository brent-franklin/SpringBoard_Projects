from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, TextAreaField
from wtforms.validators import InputRequired, NumberRange, URL, Optional


class CupcakeForm(FlaskForm):
    """Form for editing cupcakes"""

    flavor = StringField("Flavor", validators=[InputRequired()])
    size = StringField("Size", validators=[InputRequired()])
    rating = IntegerField("Rating", validators=[
                          InputRequired(), NumberRange(min=1, max=10)])
    image = StringField("Image URL: Optional", validators=[Optional(), URL()])


class CupcakeSearchForm(FlaskForm):
    """Form for Searching cupcakes"""

    search_flavor = StringField("Search Flavors", validators=[InputRequired()])

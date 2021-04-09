from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FloatField, TextAreaField
from wtforms.validators import InputRequired, NumberRange, URL, Optional


class AddPetForm(FlaskForm):
    """Form for adding pet listings"""

    name = StringField("Name", validators=[InputRequired()])
    species = SelectField("Species", choices=[
                          ('Dog', 'Dog'), ('Cat', 'Cat'), ('Dorcupine', 'Porcupine')])
    photo_url = StringField("Photo_URL: Optional",
                            validators=[Optional(), URL()])
    age = FloatField(
        "Age (Years): Optional", validators=[Optional(), NumberRange(min=0.1, max=30)])
    notes = TextAreaField("Notes: Optional", validators=[Optional()])


class PetEditForm(FlaskForm):
    """Form to edit Pet"""

    photo_url = StringField("Photo_URL: Optional",
                            validators=[Optional(), URL()])
    age = FloatField(
        "Age (Years): Optional", validators=[Optional(), NumberRange(min=0.1, max=30)])
    notes = TextAreaField("Notes: Optional", validators=[Optional()])

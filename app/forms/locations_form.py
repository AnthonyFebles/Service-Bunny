from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Location


def address_exists(form, field):
    # Checking if username is already in use
    address = field.data
    loco = Location.query.filter(Location.address == address).first()
    if loco:
        raise ValidationError('Address is already in use.')

class LocationForm(FlaskForm):
    address = StringField("Address", validators=[DataRequired(), Length(max=100), address_exists])
    name = StringField("Name", validators=[DataRequired(), Length(max=20)])
    lat = FloatField("Latitude", validators=[DataRequired()])
    lng = FloatField("Longitude", validators=[DataRequired()])
    notes = StringField("Notes", validators=[Length(max=500)])

from flask_wtf import FlaskForm
from wtforms import DateTimeField
from wtforms.validators import DataRequired


class BookingForm(FlaskForm):
    scheduled_start = DateTimeField(
        "When", validators=[DataRequired()], format="%Y-%m-%d %H:%M:%S")
    

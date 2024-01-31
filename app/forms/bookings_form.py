from flask_wtf import FlaskForm
from wtforms import DateTimeField
from wtforms.validators import DataRequired


class BookingForm(FlaskForm):
    scheduled_start = DateTimeField("When", validators=[DataRequired()], format="%Y-%m-%d %H:%M:%S")
    scheduled_end = DateTimeField("Estimated End", format="%Y-%m-%d %H:%M:%S")
    started_at = DateTimeField("Actual Start", format="%Y-%m-%d %H:%M:%S")
    stopped_at = DateTimeField("Actual End", format="%Y-%m-%d %H:%M:%S")

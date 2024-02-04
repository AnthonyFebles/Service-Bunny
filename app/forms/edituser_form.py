from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


color_options = ['blue', 'green', 'red', 'yellow', 'purple', 'gray', 'orange']


def three_roles(form, field):
    role = field.data
    if role.lower() != 'manager' and role.lower() != 'technician' and role.lower() != 'customer':
        raise ValidationError(
            'Role is not recognized. Must be manager, technician, or customer')


def colors(form, field):
    color = field.data
    if color.lower() not in color_options:
        raise ValidationError('Color not recognized')


def numbers(form, field):
    number = field.data
    if number and len(str(number)) != 10:
        raise ValidationError('Invalid Phone Number')


class EditUserForm(FlaskForm):
    username = StringField(
        'username', validators=[Length(max=30)])
    password = StringField('password')
    first_name = StringField('first_name', validators=[
        Length(max=20)])
    last_name = StringField('last_name', validators=[
        Length(max=20)])
    schedule_color = StringField('color')
    phone_number = IntegerField('number', validators=[numbers])

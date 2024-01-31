from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


color_options = ['blue', 'green', 'red', 'yellow', 'purple', 'gray', 'orange']

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
    
def three_roles(form, field):
    role = field.data
    if role.lower() != 'manager' and  role.lower() !=  'technician' and  role.lower() != 'customer' :
        raise ValidationError('Role is not recognized. Must be manager, technician, or customer')
    
def colors(form, field):
    color = field.data
    if color.lower() not in color_options :
        raise ValidationError('Color not recognized')
    
def numbers(form, field):
    number = field.data
    if len(str(number)) is not 10:
        raise ValidationError('Invalid Phone Number')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), Email, Length(max=40), user_exists])
    password = StringField('password', validators=[DataRequired()])
    role = StringField('role', validators=[DataRequired(), three_roles, Length(max=10)] )
    first_name = StringField('first_name', validators=[
                             DataRequired(), Length(max=20)])
    last_name = StringField('last_name', validators=[
                            DataRequired(), Length(max=20)])
    schedule_color = StringField('color', validators=[DataRequired(), colors])
    manager = IntegerField('manager')
    phone_number = IntegerField('number', validators=[numbers])
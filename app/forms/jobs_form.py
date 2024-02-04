from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, BooleanField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Job

categories = ["General", "Moving", "Plumbing", "Electrical", "Nurse Call", "Network", "Construction", "Demolition", "Automotive"]


def price_range(form, field):
    # Checking if username is already in use
    price = field.data
    if price < 15:
        raise ValidationError('Price is too low.')
    if price > 9999:
        raise ValidationError('Price is too high')

def category_check(form, field):
    cat = field.data
    
    if cat not in categories:
        raise ValidationError('Category not recognized')

class JobForm(FlaskForm):
    location_id = IntegerField("Location", validators=[DataRequired()])
    worker_id = IntegerField("Worker Id")
    title = StringField("Title", validators=[DataRequired(), Length(max=50)])
    price = IntegerField("Price", validators=[DataRequired(), price_range])
    category = StringField("Category", validators=[DataRequired(), Length(max=30), category_check])
    description = StringField("Description", validators=[DataRequired(), Length(max=500)])
    solution = StringField("Solution", validators=[Length(max=500)])
    customer_check = BooleanField("Customer Check")
    employee_check = BooleanField("Employee Check")

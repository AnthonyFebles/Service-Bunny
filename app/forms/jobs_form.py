from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, BooleanField
from wtforms.validators import DataRequired, Length


class JobForm(FlaskForm):
    worker_id = IntegerField("Worker Id")
    description = StringField("Description", validators=[DataRequired(), Length(max=500)])
    solution = StringField("Solution", validators=[Length(max=500)])
    customer_check = BooleanField("Customer Check")
    employee_check = BooleanField("Employee Check")

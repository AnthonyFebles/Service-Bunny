from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime, date
from .user import User

user_jobs = db.Table(
        "user_jobs",
        db.Column("user_id", db.ForeignKey(
            add_prefix_for_prod("users.id")), primary_key=True),
        db.Column("job_id", db.ForeignKey(
            add_prefix_for_prod("jobs.id")), primary_key=True)
    )

class Job(db.Model):
    __tablename__ = 'jobs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        


    id = db.Column(db.Integer, primary_key=True)
    
    location_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('locations.id')),  nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True)
    
    description = db.Column(db.String(500), nullable=False)
    solution = db.Column(db.String(500), nullable=True)
    customer_check = db.Column(db.Boolean, nullable=False, default=False)
    employee_check = db.Column(db.Boolean, nullable=False, default=False)
    started_at = db.Column(db.DateTime, nullable=True)
    stopped_at = db.Column(db.DateTime, nullable=True)
    scheduled_start = db.Column(db.DateTime, nullable=True)
    scheduled_end = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    
    locations = db.relationship('Location', back_populates='jobs')
    users = db.relationship('User', back_populates= 'jobs')
    
    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'location_id': self.location_id,
            'customer_id': self.customer_id,
            'employee_id': self.employee_id,
            'solution': self.solution,
            'customer_check': self.customer_check,
            'employee_check': self.employee_check,
            'started_at': self.started_at,
            'stopped_at': self.stopped_at,
            'scheduled_start': self.scheduled_start,
            'scheduled_end': self.scheduled_end,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        }

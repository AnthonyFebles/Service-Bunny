from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Job(db.Model):
    __tablename__ = 'jobs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        


    
    location_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('locations.id')),  nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    
    id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, nullable=True)
    title = db.Column(db.String(25), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    solution = db.Column(db.String(500), nullable=True)
    customer_check = db.Column(db.Boolean, nullable=False, default=False)
    employee_check = db.Column(db.Boolean, nullable=False, default=False)
    price = db.Column(db.Integer, nullable=False)
    category= db.Column(db.String(30), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    
    users = db.relationship('User', back_populates='jobs')
    locations = db.relationship('Location', back_populates='jobs')
    bookings = db.relationship('Booking', back_populates='jobs', cascade='all, delete-orphan')
    reviews = db.relationship("Review", back_populates="jobs", cascade='all, delete-orphan')
    job_images = db.relationship('Job_Image', back_populates='jobs', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'location_id': self.location_id,
            'user_id': self.user_id,
            'worker_id': self.worker_id,
            'description': self.description,
            'solution': self.solution,
            'title': self.title,
            'price' : self.price,
            'category': self.category,
            'customer_check': self.customer_check,
            'employee_check': self.employee_check,
            'bookings': [booking.to_dict() for booking in self.bookings],
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        }

    def to_dict_no_bookings(self):
        return {
            'id': self.id,
            'location_id': self.location_id,
            'user_id': self.user_id,
            'worker_id': self.worker_id,
            'description': self.description,
            'solution': self.solution,
            'customer_check': self.customer_check,
            'employee_check': self.employee_check,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'title': self.title,
            'price': self.price,
            'category': self.category,
        }

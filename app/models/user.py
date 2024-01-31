from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(40), nullable=False, unique=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    schedule_color = db.Column(db.String(15), nullable=False)
    manager = db.Column(db.Integer, nullable=True)
    phone_number = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    jobs = db.relationship("Job", back_populates="users")
    locations = db.relationship(
        "Location", back_populates='users', cascade='all, delete-orphan')
    reviews = db.relationship(
        "Review", back_populates='users', cascade='all, delete-orphan')
    bookings = db.relationship(
        "Booking", back_populates='users', cascade='all, delete-orphan')
    profiles = db.relationship(
        "Profile", back_populates='users', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'role': self.role,
            'email': self.email,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'schedule_color': self.schedule_color,
            'manager': self.manager,
            'phone_number': self.phone_number,
            'jobs': [jobs.to_dict() for jobs in self.jobs],
            'reviews': [reviews.to_dict() for reviews in self.reviews],
            'bookings': [bookings.to_dict() for bookings in self.bookings],
            'profiles': [profiles.to_dict() for profiles in self.profiles],

        }



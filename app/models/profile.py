from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Profile(db.Model, UserMixin):
    __tablename__ = 'profiles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    id = db.Column(db.Integer, primary_key=True)
    profile_image = db.Column(db.String(50), nullable=True)
    description = db.Column(db.String(300), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    
    users = db.relationship(
        "User", back_populates='profiles')
    reviews = db.relationship(
        "Review", back_populates='profiles', cascade='all, delete-orphan')
    

    def to_dict(self):
        return {
            'id': self.id,
            'profile_image': self.profile_image,
            'description': self.description,
            'reviews': [reviews.to_dict for reviews in self.reviews]
        }

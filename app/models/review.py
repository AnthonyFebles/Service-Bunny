from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('jobs.id')), nullable=False)
    profile_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('profiles.id')), nullable=False)

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(250), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    
    users = db.relationship("User", back_populates='reviews')
    jobs = db.relationship("Job", back_populates='reviews')
    review_images = db.relationship("Review_Image", back_populates='reviews')
    profiles = db.relationship('Profile', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'rating': self.rating,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
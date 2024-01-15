from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review_Image(db.Model):
    __tablename__ = 'review_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('reviews.id')), nullable=False)

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    reviews = db.relationship("Review", back_populates='review_images')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
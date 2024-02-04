from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Location(db.Model):
    __tablename__ = 'locations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(50), nullable=False, unique=True)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    notes = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
  
    users = db.relationship("User", back_populates="locations")
    jobs = db.relationship("Job", back_populates="locations")
    parts = db.relationship("Part", back_populates="locations", cascade='all, delete-orphan')

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'latitude': self.lat,
            'longitude': self.lng,
            'notes': self.notes,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_id': self.user_id
        }
    
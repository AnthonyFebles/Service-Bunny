from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime, date


class Location(db.Model):
    __tablename__ = 'locations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(200), nullable=False, unique=True)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    notes = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    
    users = db.relationship("User", back_populates="locations")
    # parts = db.relationship("Part", back_populates="locations")

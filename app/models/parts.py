from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Part(db.Model):
    __tablename__ = 'parts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    location_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('locations.id')), nullable=False)    

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(50), nullable=False)
    serial_number= db.Column(db.String(10), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    
    locations = db.relationship("Location", back_populates='parts')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'serial_number': self.serial_number,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
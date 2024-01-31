from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    job_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('jobs.id')),  nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    id = db.Column(db.Integer, primary_key=True)
    started_at = db.Column(db.DateTime, nullable=True)
    stopped_at = db.Column(db.DateTime, nullable=True)
    scheduled_start = db.Column(db.DateTime, nullable=False)
    scheduled_end = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship('User', back_populates='bookings')
    jobs = db.relationship('Job', back_populates='bookings')


    def to_dict(self):
        return {
            'id': self.id,
            'job_id': self.job_id,
            'user_id': self.user_id,
            'started_at': self.started_at,
            'stopped_at': self.stopped_at,
            'scheduled_start': self.scheduled_start,
            'scheduled_end': self.scheduled_end,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

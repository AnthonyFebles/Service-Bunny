from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime, date

user_roles = db.Table(
    "user_roles",
    db.Column("user_id", db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("roles_id", db.ForeignKey(add_prefix_for_prod("roles.id")), primary_key=True)
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    profile_image = db.Column(db.String(100), nullable=True)
    schedule_color = db.Column(db.String(50), nullable=False)
    manager = db.Column(db.String(5), nullable=False, default=1)
    company = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    
    roles = db.relationship("Role", secondary=user_roles, back_populates="users")
    
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
            'username': self.username,
            'email': self.email
        }

class Role(db.Model):
    __tablename__ = 'roles'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=False, unique=True)
    
    users = db.relationship("User", secondary=user_roles,back_populates="roles")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }

from app.models import db, Booking, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_bookings():
    
    date = datetime(2024, 2, 2, 10, 10, 10)
    booking1 = Booking(
        user_id=3, job_id=1, scheduled_start=date
    )
    booking2 = Booking(
        user_id=4,  job_id=2, scheduled_start=date
    )
    booking3 = Booking(
        user_id=5,  job_id=3, scheduled_start=date
    )
    booking4 = Booking(
        user_id=6, job_id=4, scheduled_start=date
    )
    booking5 = Booking(
        user_id=4, job_id=5, scheduled_start=date
    )


    db.session.add(booking1)
    db.session.add(booking2)
    db.session.add(booking3)
    db.session.add(booking4)
    db.session.add(booking5)
    db.session.commit()


def undo_bookings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookings"))

    db.session.commit()

from app.models import db, Location, environment, SCHEMA
from sqlalchemy.sql import text


def seed_locations():
    location1 = Location(
        user_id=2, address="123 Address St.", lat=41.40338, lng=2.17403, notes="The very first users location. This guy is a pain."
    )
    location2 = Location(
        user_id=7, address="333 Spring Ln.", lat=41.40338, lng=2.17403, notes="Beware of dog. Please call before arrival."
    )
    location3 = Location(
        user_id=8, address="12-B Address Blvd.", lat=41.40338, lng=2.17403, notes="Knock loudly, resident is old and hard of hearing."
    )
    
    db.session.add(location1)
    db.session.add(location2)
    db.session.add(location3)
    db.session.commit()


def undo_locations():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.locations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM locations"))

    db.session.commit()

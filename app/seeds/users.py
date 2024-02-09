from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name="Joe", last_name="Schmoe",  schedule_color="Blue", role="Manager")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name="Marnie", last_name="Schmoel",  schedule_color="Red", role="Customer")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name="Bobbie", last_name="Schmoe", schedule_color="Green", role="Technician", manager=1, phone_number=1231231234)
    steve = User(
        username='steve', email='steve@aa.io', password='password', first_name="Steve", last_name="Schmoe", schedule_color="Yellow", role="Technician", manager=1, phone_number=1231231234)
    juan = User(
        username='juan', email='juan@aa.io', password='password', first_name="Juan", last_name="Schmoe", schedule_color="Purple", role="Technician", manager=1, phone_number=1231231234)
    shmake = User(
        username='shmake', email='shmake@aa.io', password='password', first_name="Shmake", last_name="Yake", schedule_color="Green", role="Technician")
    anthony = User(
        username='anthony', email='anthony@aa.io', password='password', first_name="Anthony", last_name="Febles",  schedule_color="Red", role="Customer")
    martha = User(
        username='martha', email='martha@aa.io', password='password', first_name="Martha", last_name="Old",  schedule_color="Red", role="Customer")
    
    
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(steve)
    db.session.add(juan)
    db.session.add(shmake)
    db.session.add(anthony)
    db.session.add(martha)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
from app.models.user import db, environment, SCHEMA, user_roles
from sqlalchemy.sql import text 


# Adds a demo user, you can add other users here if you want
def seed_user_roles():
    manager = user_roles.insert().values(user_id ="1", roles_id= "1")
    technician = user_roles.insert().values(user_id="2", roles_id="2")
    customer = user_roles.insert().values(user_id="3", roles_id="3")

    db.session.execute(manager)
    db.session.execute(technician)
    db.session.execute(customer)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_roles():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_roles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_roles"))

    db.session.commit()

from app.models import db, User, environment, SCHEMA, Role
from sqlalchemy.sql import text



# Adds a demo user, you can add other users here if you want
def seed_roles():
    manager = Role(
        name="Manager", description="Manager, has permissions for their own technicians, all jobs, and all customers. A company name is required for managers")
    technician = Role(
        name="Technician", description="Technician, can only see what jobs they have")
    customer = Role(
        name="Customer", description="Customer, can request jobs, choose the manager/service-provider they want, and see what technician is coming. ")

    db.session.add(manager)
    db.session.add(technician)
    db.session.add(customer)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_roles():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.roles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM roles"))

    db.session.commit()

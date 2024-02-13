from app.models import db, Job, environment, SCHEMA
from sqlalchemy.sql import text

def seed_jobs() :
    job1 = Job(
        location_id = 1, user_id = 2, title= "Toilet won't flush.", worker_id=3, price=35, category="Plumbing", description="There's water all over the floor. This is an emergency. 2nd floor and I don't want the water to leak down"
    )
    job2 = Job(
        location_id=1, user_id=2, title="Dog needs to be walked.", worker_id=4, price=20, category="General", description="She's a very friendly 90lb german shepherd. Only bites sometimes."
    )
    job3 = Job(
        location_id=1, user_id=2, title="Need somebody to hang my clothes for me.", worker_id=5, price=20, category="General", description="I can't keep bending up and down, my doctor says it's bad for my back"
    )
    job4 = Job(
        location_id=2, user_id=7, title="Moving.", worker_id=6, price=100, category="Moving", description="from downtown to uptown. 2 bedrooms and 1 kitchen and living room"
    )
    job5 = Job(
        location_id=2, user_id=7, title="Packing.", worker_id=4, price=100, category="Moving", description="everything needs to be disassembled and packed inside boxes."
    )
    job6 = Job(
        location_id=3, user_id=8, title="Call bell system is down on the 2nd floor.", price=500, description="North wing in the emerald unit no calls coming into the nurse console. No zone or dome lights lighting whole systems looks like it's powered off ", category="NurseCall"
    )
    
    db.session.add(job1)
    db.session.add(job2)
    db.session.add(job3)
    db.session.add(job4)
    db.session.add(job5)
    db.session.add(job6)
    
    db.session.commit()
    


def undo_jobs() :
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.jobs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM jobs"))

    db.session.commit()

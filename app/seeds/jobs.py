from app.models import db, Job, environment, SCHEMA
from sqlalchemy.sql import text

def seed_jobs() :
    job1 = Job(
        location_id = 1, user_id = 2, description= "Toilet won't flush.", worker_id=3
    )
    job2 = Job(
        location_id=1, user_id=2, description="Dog needs to be walked.", worker_id=4
    )
    job3 = Job(
        location_id=1, user_id=2, description="Need somebody to hang my clothes for me.", worker_id=5
    )
    job4 = Job(
        location_id=2, user_id=7, description="Moving.", worker_id=6
    )
    job5 = Job(
        location_id=2, user_id=7, description="Packing.", worker_id=4
    )
    job6 = Job(
        location_id=3, user_id=8, description="Call bell system is down on the 2nd floor."
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

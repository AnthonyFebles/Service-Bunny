from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from app.models.job import Job, db
from ..forms.jobs_form import JobForm
from app.api.auth_routes import validation_errors_to_error_messages

job_routes = Blueprint('jobs', __name__)

# Create Route
# Logged in User should be able to create a job


@job_routes.route("/", methods=["POST"])
@login_required
def create_job():

    form = JobForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_job = Job(
            user_id=current_user.id,
            location_id=form.location_id.data,
            description=form.description.data
        )

        db.session.add(new_job)
        db.session.commit()

        return jsonify(new_job.to_dict()), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# Read Routes
@job_routes.route("/")
@login_required
def read_jobs():
    
    if current_user.role == "Manager" :
        
        all_jobs = Job.query.filter(Job.worker_id == None).all()
        all_job_details = [job.to_dict_no_bookings() for job in all_jobs]
        
        return jsonify(all_job_details), 200

    
    if current_user.role == "Technician" :
        
        worker_jobs = Job.query.filter(Job.worker_id == current_user.id).all()
        work_job_details = [job.to_dict_no_bookings() for job in worker_jobs]
        
        return jsonify(work_job_details), 200
    
    user_jobs = Job.query.filter(Job.user_id == current_user.id).all()
    job_details = [job.to_dict() for job in user_jobs]
    
    return jsonify(job_details), 200


# Update Routes


@job_routes.route("/<int:jobId>", methods=["PUT"])
@login_required
def update_job(jobId):

    job = Job.query.get(jobId)

    if not job:
        return {'errors': 'Job not found'}, 404

    form = JobForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        
        
        worker_id=form.worker_id.data
        description=form.description.data
        solution=form.solution.data
        customer_check=form.customer_check.data
        employee_check=form.employee_check.data
        
        print(type(form.customer_check.data), "TESINTG FORM DATA")
        
        job.location_id=job.location_id
        job.worker_id=worker_id
        job.description=description
        job.solution=solution
        job.customer_check=customer_check 
        job.employee_check=employee_check
        

        db.session.commit()

        return jsonify(job.to_dict()), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Delete Routes


@job_routes.route("/<int:jobId>", methods=["DELETE"])
@login_required
def delete_job(jobId):

    job = Job.query.get(jobId)

    if not job:
        return {'errors': 'Job not found'}, 404

    if job.user_id == current_user.id:

        db.session.delete(job)
        db.session.commit()

    return jsonify({"message": "Job has been Deleted successfully"}), 200

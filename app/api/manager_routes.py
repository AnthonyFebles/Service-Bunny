from flask import Blueprint, jsonify, session, request
from app.models import User, db, Job
from app.forms import SignUpForm
from app.forms import EditUserForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.auth_routes import validation_errors_to_error_messages

manager_routes= Blueprint('manager', __name__)


@manager_routes.route('/signup', methods=['POST'])
@login_required
def create_user():
    """
    Creates a new user
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            role="Technician",
            schedule_color=form.data['schedule_color'],
            manager=current_user.id,
            phone_number=form.data['phone_number']

        )
        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@manager_routes.route('/')
@login_required
def manager():
    technicians = User.query.filter(User.manager == current_user.id)
    technician_details = [technician.to_dict() for technician in technicians]

    return jsonify(technician_details), 200

@manager_routes.route('/currentjobs')
@login_required
def current_jobs():
    technicians = User.query.filter(User.manager == current_user.id)
    technician_ids = [technician.id for technician in technicians]
    
    jobs = Job.query.filter(Job.worker_id.in_(technician_ids)).all()
    job_details = [job.to_dict() for job in jobs]
    
    
    
    return jsonify(job_details), 200
    

@manager_routes.route('/<int:userId>', methods=["PUT"])
@login_required
def edit_user(userId):
    user = User.query.get(userId)
    
    if not user:
        return {'errors': 'User not found'}, 404
    
    if user.manager != current_user.id :
        return {'errors': ['Unauthorized']}, 401

    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        
            first_name=form.data['first_name']
            last_name=form.data['last_name']
            username=form.data['username']
            password=form.data['password']
            schedule_color=form.data['schedule_color']
            phone_number=form.data['phone_number']
            
            user.first_name = first_name or user.first_name
            user.last_name = last_name or user.last_name
            user.username = username or user.username
            user.password = password or user.password
            # user.schedule_color = user.schedule_color
            user.phone_number = phone_number or user.phone_number
            
            db.session.commit()
            return jsonify(user.to_dict()), 200
        
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@manager_routes.route("/<int:userId>", methods=["DELETE"])
@login_required
def delete_user(userId):

    user = User.query.get(userId)

    if not user:
        return {'errors': 'User not found'}, 404

    if user.manager == current_user.id:

        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User has been Deleted successfully"}), 200
    
    return {'errors': ['Unauthorized']}, 401

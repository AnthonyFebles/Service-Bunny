from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from datetime import datetime

from app.models.booking import Booking, db
from app.models.user import User
from ..forms.bookings_form import BookingForm
from app.api.auth_routes import validation_errors_to_error_messages

booking_routes = Blueprint('bookings', __name__)

# Create Route
# Logged in User should be able to create a booking


@booking_routes.route("/", methods=["POST"])
@login_required
def create_booking():

    form = BookingForm()
    

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_booking = Booking(
            user_id=current_user.id,
            scheduled_start=form.scheduled_start.data,
            job_id=form.job_id.data
        )
        
        db.session.add(new_booking)
        db.session.commit()
        
        return jsonify(new_booking.to_dict()), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# Read Routes
@booking_routes.route("/")
@login_required
def read_bookings():
    
    # if current_user.role == 'Manager':
    #     technicians = User.query.filter(User.manager == current_user.id)
    #     technician_details = [technician.to_dict() for technician in technicians]
    #     manager_bookings = [{technician['first_name']: technician["bookings"]} for technician in technician_details]
        
    #     return jsonify({'bookings':manager_bookings}), 200
    
    # if current_user.role == 'Customer':
        

    user_bookings = Booking.query.filter(
        Booking.user_id == current_user.id).all()

    booking_details = [booking.to_dict() for booking in user_bookings]

    return jsonify(booking_details), 200


# Update Routes


@booking_routes.route("/<int:bookingId>", methods=["PUT"])
@login_required
def update_booking(bookingId):

    booking = Booking.query.get(bookingId)

    if not booking:
        return {'errors': 'Booking not found'}, 404
    
    form=BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        scheduled_start = form.scheduled_start.data
        scheduled_end = form.scheduled_end.data
        started_at = form.started_at.data
        stopped_at = form.stopped_at.data
        
        booking.scheduled_start = scheduled_start
        booking.scheduled_end = scheduled_end
        booking.started_at = started_at
        booking.stopped_at = stopped_at
        
        db.session.commit()
    
    
        return jsonify(booking.to_dict()), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400 

# Delete Routes


@booking_routes.route("/<int:bookingId>", methods=["DELETE"])
@login_required
def delete_booking(bookingId):

    booking = Booking.query.get(bookingId)

    if not booking:
        return {'errors': 'Booking not found'}, 404


    db.session.delete(booking)
    db.session.commit()
     

    return jsonify({"message": "Booking has been Deleted successfully"}), 200

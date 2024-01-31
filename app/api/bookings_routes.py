from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from app.models.booking import Booking, db
from ..forms.bookings_form import BookingForm
from app.api.auth_routes import validation_errors_to_error_messages

booking_routes = Blueprint('bookings', __name__)

# Create Route
# Logged in User should be able to create a booking


@booking_routes.route("/bookings", methods=["POST"])
@login_required
def create_booking():

    form = BookingForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_booking = Booking(
            user_id=current_user.id,
            scheduled_start=form.scheduled_start.data
        )
        return jsonify(new_booking.to_dict()), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# Read Routes
@booking_routes.route("/bookings")
@login_required
def read_bookings():

    user_bookings = Booking.query.filter(
        Booking.user_id == current_user.id).all()

    booking_details = [booking.to_dict() for booking in user_bookings]

    return jsonify(booking_details), 200

# Update Routes


@booking_routes.route("/bookings/<int:bookingId>")
@login_required
def update_booking(bookingId):

    booking = Booking.query.get(bookingId)

    if not booking:
        return {'errors': 'Booking not found'}, 404

    return jsonify(booking.to_dict()), 200

# Delete Routes


@booking_routes.route("/bookings/<int:bookingId>")
@login_required
def delete_booking(bookingId):

    booking = Booking.query.get(bookingId)

    if not booking:
        return {'errors': 'Booking not found'}, 404

    if booking.user_id == current_user.id:

        db.session.delete(booking)
        db.session.commit()

    return jsonify({"message": "Board has been Deleted successfully"}), 200

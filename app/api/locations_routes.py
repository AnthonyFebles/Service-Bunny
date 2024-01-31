from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from app.models.location import Location, db
from ..forms.locations_form import LocationForm
from app.api.auth_routes import validation_errors_to_error_messages

location_routes = Blueprint('locations', __name__)

#Create Route
#Logged in User should be able to create a location

@location_routes.route("/locations", methods=["POST"])
@login_required
def create_location():
    
    form = LocationForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        new_location = Location(
            user_id = current_user.id,
            address =form.address.data,
            lat= form.lat.data,
            lng= form.lng.data,
            notes= form.notes.data
        )
        return jsonify(new_location.to_dict()), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#Read Routes
@location_routes.route("/locations")
@login_required
def read_locations():
    
    user_locations = Location.query.filter(Location.user_id == current_user.id).all()
    
    location_details = [location.to_dict() for location in user_locations]
    
    return jsonify(location_details), 200

#Update Routes
@location_routes.route("/locations/<int:locationId>")
@login_required
def update_location(locationId):
    
    location = Location.query.get(locationId)
    
    if not location:
        return {'errors': 'Location not found'}, 404
    
    return jsonify(location.to_dict()), 200

#Delete Routes
@location_routes.route("/locations/<int:locationId>")
@login_required
def delete_location(locationId):
    
    location = Location.query.get(locationId)

    if not location:
        return {'errors': 'Location not found'}, 404
    
    if location.user_id == current_user.id:
        
        db.session.delete(location)
        db.session.commit()
        
    return jsonify({"message": "Board has been Deleted successfully" }), 200




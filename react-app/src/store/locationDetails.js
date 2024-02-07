import { csrfFetch } from "./csrf";
const CREATE_SPOT = "locationDetails/CREATE_JOB";
const DELETE_SPOT = "locationDetails/DELETE";
const GET_ONE = "locationDetails/GET_ONE";

const createLocation = (location) => ({
	type: CREATE_SPOT,
	location,
});

const getOneLocation = (location) => ({
	type: GET_ONE,
	location,
});

const removeLocation = (locationId) => ({
	type: DELETE_SPOT,
	locationId,
});

export const getALocation = (locationId) => async (dispatch) => {
	const response = await csrfFetch(`/api/locations/${locationId}`);
	// console.log(response, "asdhfbjlasdjbfioas")
	if (response.ok) {
		const Location = await response.json();
		dispatch(getOneLocation(Location));
		// console.log(Location, "this is the location in getOne")
		return Location;
	}

	return response;
};

export const createNewLocation = (location) => async (dispatch) => {
	const response = await csrfFetch(`/api/locations`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(location),
	});

	if (response.ok) {
		const newLocation = await response.json();
		dispatch(createLocation(newLocation));
		return newLocation;
	}

	return new Error("Failed to create Location");
};

export const updateLocation = (location, locationId) => async (dispatch) => {
	const response = await csrfFetch(`/api/locations/${locationId}`, {
		method: "PUT",
		body: JSON.stringify(location),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const Location = await response.json();
		dispatch(createLocation(location));
		return Location;
	}

	return new Error("Failed to Update");
};

export const deleteLocation = (locationId) => async (dispatch) => {
	const res = await csrfFetch(`/api/locations/${locationId}`, {
		method: "DELETE",
	});

	if (res.ok) {
		const location = await res.json();
		//console.log(location, "res when deleting location");
		dispatch(removeLocation(locationId));
		return location;
	}

	return res;
};

const LocationReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_ONE:
			// console.log(action, "action inside get one location reducer");
			const newGet = {};
			return { ...action.location };

		case DELETE_SPOT:
			//console.log(action, "action when deleting");
			const newState = { ...state };
			delete newState[action.locationId];

			return newState;

		default:
			return state;
	}
};

export default LocationReducer;

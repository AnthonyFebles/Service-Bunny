import { csrfFetch } from "./csrf";

const LOAD = "locations/LOAD";
const CREATE = "locations/CREATE";
const UPDATE = "locations/UPDATE";
const DELETE = "location/DELETE";

const load = (locations) => ({
	type: LOAD,
	locations,
});

const create = (locationPayLoad) => ({
	type: CREATE,
	locationPayLoad,
});

const update = (locationPayLoad) => ({
	type: UPDATE,
	locationPayLoad,
});

const remove = (locationId) => ({
	type: DELETE,
	locationId,
});

export const getLocations = () => async (dispatch) => {
	const res = await fetch("/api/locations/");

	if (res.ok) {
		const locations = await res.json();
		//console.log(locations, "This is the locations **********");
		dispatch(load(locations));
	}

	return res;
};

export const createNewLocation = (locationPayload) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/locations/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(locationPayload),
		});

		if (response.ok) {
			// console.log("res is ok?", response)
			const newLocation = await response.json();
			dispatch(create(newLocation));
			return newLocation;
		}
	} catch (error) {
		const res = await error.json();
		// console.log("res not ok")
		// console.log(res, "this is the res ************")
		//console.log(res, "error")
		throw res;
	}
};

export const updateLocation = (locationPayLoad) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/locations/${locationPayLoad.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(locationPayLoad),
		});

		if (response.ok) {
			//console.log("res is ok?")
			const updatedLocation = await response.json();
			dispatch(update(locationPayLoad));
			return updatedLocation;
		}
	} catch (error) {
		const res = await error.json();
		//console.log(res, "error")
		throw res;
	}
};

export const deleteLocation = (locationId) => async (dispatch) => {
	try {
		const res = await csrfFetch(`api/locations/${locationId}`, {
			method: "DELETE",
		});

		if (res.ok) {
			const location = await res.json();
			dispatch(remove(locationId));
			return location;
		}
		return res;
	} catch (error) {
		// console.log(error,"ERROR ")
		const res = await error.json();
		// console.log(res)
		throw res;
	}
};

const initialState = {
	locations: [],
};

const sortList = (locations) => {
	return locations
		.sort((LocationA, LocationB) => {
			return LocationA.id - LocationB.id;
		})
		.map((Location) => Location.id);
};

const LocationsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD:
			//console.log(action, "console log the action")
			const allLocations = {};
			if (action.locations) {
				action.locations.forEach((location) => {
					allLocations[location.id] = location;
				});
				//console.log(action, "load action");

				return {
					...allLocations,

					locations: sortList(action.locations),
				};
			} else
				return {
					...allLocations,
					...state,
				};
		case DELETE:
			const newState = { ...state };
			// console.log(newState, "new state")
			// console.log(action, "action")
			delete newState[action.locationId];
			// console.log(newState, "new state after del");
			return newState;

		default:
			return state;
	}
};

export default LocationsReducer;

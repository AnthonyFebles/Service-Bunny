import { csrfFetch } from "./csrf";

const LOAD = "bookings/LOAD";
const CREATE = "bookings/CREATE";
const UPDATE = "bookings/UPDATE";
const DELETE = "booking/DELETE";

const load = (list) => ({
	type: LOAD,
	list,
});

const create = (bookingPayLoad) => ({
	type: CREATE,
	bookingPayLoad,
});

const update = (bookingPayLoad) => ({
	type: UPDATE,
	bookingPayLoad,
});

const remove = (bookingId) => ({
	type: DELETE,
	bookingId,
});

export const getBookings = () => async (dispatch) => {
	const res = await fetch("/api/bookings/");

	if (res.ok) {
		const list = await res.json();
		//console.log(list, "This is the list **********");
		dispatch(load(list));
	}

	return res;
};

export const createNewBooking = (bookingPayload) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/bookings/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bookingPayload),
		});

		if (response.ok) {
			// console.log("res is ok?", response)
			const newBooking = await response.json();
			dispatch(create(newBooking));
			return newBooking;
		}
	} catch (error) {
		const res = await error.json();
		// console.log("res not ok")
		// console.log(res, "this is the res ************")
		//console.log(res, "error")
		throw res;
	}
};

export const updateBooking = (bookingPayLoad) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/bookings/${bookingPayLoad.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bookingPayLoad),
		});
		if (!response.ok) {
			//console.log("res not ok");
			throw response;
		}

		if (response.ok) {
			//console.log("res is ok?")
			const updatedBooking = await response.json();
			dispatch(update(bookingPayLoad));
			return updatedBooking;
		}
	} catch (error) {
		//console.log(error, "error");
		const res = await error.json();
		throw res;
	}
};

export const deleteBooking = (bookingId) => async (dispatch) => {
	try {
		const res = await csrfFetch(`/api/bookings/${bookingId}`, {
			method: "DELETE",
		});

		if (res.ok) {
			const booking = await res.json();
			dispatch(remove(bookingId));
			return booking;
		}

		if (!res.ok) {
			//console.log("res not ok")
		}
		return res;
	} catch (error) {
		//console.log(error,"ERROR ")
		const res = await error.json();
		// console.log(res)
		throw res;
	}
};

const initialState = {
	list: [],
};

const sortList = (list) => {
	return list
		.sort((BookingA, BookingB) => {
			return BookingA.id - BookingB.id;
		})
		.map((Booking) => Booking.id);
};

const BookingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD:
			//console.log(action, "console log the action")
			const allBookings = {};
			if (action.list) {
				action.list.forEach((booking) => {
					allBookings[booking.id] = booking;
				});
				//console.log(action, "load action");

				return {
					...allBookings,

					list: sortList(action.list),
				};
			} else
				return {
					...allBookings,
					...state,
				};
		case DELETE:
			const newState = { ...state };
			// console.log(newState, "new state")
			// console.log(action, "action")
			delete newState[action.bookingId];
			// console.log(newState, "new state after del");
			return newState;

		default:
			return state;
	}
};

export default BookingsReducer;

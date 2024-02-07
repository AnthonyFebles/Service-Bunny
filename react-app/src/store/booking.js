import { csrfFetch } from "./csrf";

const LOAD_ONE = "booking/LOAD_ONE";

const loadOne = (booking) => ({
	type: LOAD_ONE,
	booking,
});

export const getBooking = (booking) => async (dispatch) => {
	const res = await fetch(`/api/bookings/${booking}`);

	if (res.ok) {
		const list = await res.json();
		//console.log(list, "This is the list **********");
		dispatch(loadOne(list));
	}

	return res;
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

const BookingReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_ONE:
			const allBookings = {};
			// console.log(action)
			if (action.booking){
                return { ... action.booking}
            }  else
				return {
					...allBookings,
					...state,
				};
		default:
			return state;
	}
};

export default BookingReducer;

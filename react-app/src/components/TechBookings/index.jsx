import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookings } from "../../store/bookings";
import { getBooking } from "../../store/booking";

const TechBookings = ({booking}) => {
	const dispatch = useDispatch();

    

	const [isLoading, setIsLoading] = useState(true);

	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();

	const bookings = useSelector((state) => {
		return state.bookings;
		// .bookings.map((bookingId) => state.bookings[bookingId]);
	});

    const thisBooking = useSelector((state) => {
        return state.booking
    })

    console.log(thisBooking, "this booking" )
    console.log(booking.id, "booking prop")

	useEffect(() => {
			dispatch(getBookings())
            dispatch(getBooking(booking.id))
			.then(() => setIsLoading(false));
	}, [dispatch]);

	// console.log(currJobs, "curr Jobs")

	if (!sessionUser) return <>{navigate("/")}</>;

	if (isLoading) return <>Loading...</>;

	return (
		<div className="manager_container">
			<div>Actually Started On : {booking.started_at}</div>
			<div>Completed On : {booking.stopped_at}</div>
			<div className="job_details-button_container">
				<button className="job_details-start_button">Start Job</button>
				<button className="job_details-end_button">End Job</button>
				<button className="job_details-cancel_button">Cancel Job</button>
			</div>
		</div>
	);
};

export default TechBookings;

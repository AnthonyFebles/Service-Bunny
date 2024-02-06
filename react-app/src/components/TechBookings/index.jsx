import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookings, updateBooking } from "../../store/bookings";
import { getBooking } from "../../store/booking";
import { getOne } from "../../store/jobDetails";

const TechBookings = ({ booking }) => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [isStarted, setIsStarted] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const [customerApproval, setCustomerApproval] = useState("");

	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();

	const bookings = useSelector((state) => {
		return state.bookings;
		// .bookings.map((bookingId) => state.bookings[bookingId]);
	});

	const thisBooking = useSelector((state) => {
		return state.booking;
	});

	console.log(thisBooking, "this booking");
	console.log(booking.id, "booking prop");

	useEffect(() => {
		dispatch(getBookings());
		dispatch(getBooking(booking.id)).then(() => setIsLoading(false));

		if (booking.started_at) {
			setIsStarted(true);
		}
		if (booking.stopped_at) {
			setIsDone(true);
		}
		if (booking.stopped_at && booking.started_at) {
			setCustomerApproval("Awaiting Customer Approval");
		}
	}, [dispatch]);

	// console.log(currJobs, "curr Jobs")

	if (!sessionUser) return <>{navigate("/")}</>;

	if (isLoading) return <>Loading...</>;

	const handleStart = async () => {
		const currDate = new Date();
		const payload = {
			id: booking.id,
			job_id: booking.job_id,
			user_id: sessionUser.id,
			started_at: `${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDate()} ${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()}`,
		};
		try {
			await dispatch(updateBooking(payload))
				.then(() => dispatch(getBooking(booking.id)))
				.then(() => dispatch(getOne(booking.job_id)));
			setIsStarted(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleEnd = async () => {
		const currDate = new Date();
		const payload = {
			id: booking.id,
			job_id: booking.job_id,
			user_id: sessionUser.id,
			stopped_at: `${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDate()} ${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()}`,
		};
		try {
			await dispatch(updateBooking(payload))
				.then(() => dispatch(getBooking(booking.id)))
				.then(() => dispatch(getOne(booking.job_id)));
			setIsDone(true);
            setCustomerApproval("Awaiting Customer Approval");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="manager_container">
			<div>Actually Started On : {booking.started_at}</div>
			<div>Completed On : {booking.stopped_at}</div>
			<div className="job_details-button_container">
				<button
					className="job_details-start_button"
					disabled={isStarted}
					onClick={handleStart}
				>
					Start Job
				</button>
				<button
					className="job_details-end_button"
					disabled={isDone}
					onClick={handleEnd}
				>
					End Job
				</button>
				<button className="job_details-cancel_button" disabled={isStarted}>
					Cancel Job
				</button>
				<p>{customerApproval}</p>
			</div>
		</div>
	);
};

export default TechBookings;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	deleteBooking,
	getBookings,
	updateBooking,
} from "../../store/bookings";
import { getBooking } from "../../store/booking";
import { getOne } from "../../store/jobDetails";
import { getJobs, updateJob } from "../../store/jobs";
import { getJob } from "../../store/job";

const TechBookings = ({ booking, job }) => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [isStarted, setIsStarted] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const [solution, setSolution] = useState(job.solution);
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

	//! Psuedo Code for cancel button
	// Update the job using the job_id from the booking
	// Update the job to have a worker_id of 0 .then =>
	// Delete the current booking using booking.id and .then => navigate to "/home"

	const handleCancel = async () => {
		let payload = {
			location_id: job.location_id,
			id: job.id,
			worker_id: 0,
			description: job.description,
			title: job.title,
			price: job.price,
			category: job.category,
		};

		await dispatch(updateJob(payload, job.id))
			.then(() => dispatch(deleteBooking(booking.id)))
			.then(() => navigate("/home"));
	};

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

		const jobPayload = {
			location_id: job.location_id,
			id: job.id,
			worker_id: job.worker_id,
			description: job.description,
			solution,
			title: job.title,
			price: job.price,
			category: job.category,
		};

		try {
			await dispatch(updateBooking(payload))
				.then(() => dispatch(getBooking(booking.id)))
				.then(() => dispatch(getOne(booking.job_id)))
				.then(() => dispatch(updateJob(jobPayload, job.id)));
			dispatch(getJob());
			setIsDone(true);
			setCustomerApproval("Awaiting Customer Approval");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="technician_container">
			<div className="job_details-solution">
				<input
					type="textarea"
					name="solution"
					onChange={(e) => setSolution(e.target.value)}
					value={solution}
					disabled={isDone}
				/>
			</div>
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
					disabled={!isStarted || isDone || !solution}
					onClick={handleEnd}
				>
					End Job
				</button>
				{!solution && isStarted && (
					<p className="tech_no_solution-message">A Solution is Required to End the Job</p>
				)}
				<button
					className="job_details-cancel_button"
					onClick={handleCancel}
					disabled={isStarted}
				>
					Cancel Job
				</button>
				<p>{customerApproval}</p>
			</div>
		</div>
	);
};

export default TechBookings;

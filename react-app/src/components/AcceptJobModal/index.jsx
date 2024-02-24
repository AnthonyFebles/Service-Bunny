import React, { useEffect, useState } from "react";
import Mermaid from "../Mermaid";
import { updateJob } from "../../store/jobs";
import { getJobs } from "../../store/jobs";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { getJob } from "../../store/job";
import { createNewBooking } from "../../store/bookings";
import { getBookings } from "../../store/bookings";
import "./AcceptJobModal.css";
import { getManagers } from "../../store/manager";
import mermaid from "mermaid";
import { getChart } from "../../store/chart";
import { store } from "../../index";

function AcceptJobModal({ job, techs }) {
	const AMPM = (hour) => {
		const currHour = hour;
		const twelveHour = currHour % 12 || 12;
		let amPM = hour < 12 ? "AM" : "PM";

		return `${twelveHour} ${amPM}`;
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [location_id, setLocation_id] = useState(job.location_id);
	const [worker_id, setWorker_id] = useState("");
	const [currDate, setCurrDate] = useState(new Date());
	const [currHour, setCurrHour] = useState(currDate.getHours());
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	//console.log(currDate, "date");

	let payload = {
		location_id,
		id: job.id,
		worker_id,
		description: job.description,
		title: job.title,
		price: job.price,
		category: job.category,
	};
	// console.log(worker_id, "worker Id")

	//! Date Format = (year-month-day  hour:minute:second)
	const schedulePayload = {
		scheduled_start: `${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDate()} ${currHour}:00:00`,
		user_id: worker_id,
		job_id: job.id,
	};

	//console.log(schedulePayload, "scheduled");

	const futureHours = [];

	for (let i = currDate.getHours() + 1; i < 24; i++) {
		futureHours.push(i);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await dispatch(updateJob(payload, job.id)).then(() =>
				dispatch(createNewBooking(schedulePayload))
			);
			navigate("/home");
			await dispatch(getJob()).then(() => {
				dispatch(getBookings());
			});
			window.location.reload(false);
			closeModal();
		} catch (data) {
			//console.log(data, "errors");
			setErrors(data.errors);
		} finally {
			await dispatch(getJobs())
				.then(() => {
					dispatch(getBookings());
				})
				.then(() => dispatch(getManagers()))
				.then(() => dispatch(getJob()))
				.then(() => {});
			dispatch(getChart(store.getState().manager, store.getState().job));
		}
	};

	// console.log(errors, "errors")

	return (
		<div className="assign_job_modal-container">
			<h1 className="assign_job_modal-title">
				Assign A Technician To This Job
			</h1>
			<div className="assign_job_modal-job">
				{" "}
				<b>Job:</b> {job.title}
			</div>
			<div className="assign_job_modal-description">
				<b>Details:</b> {job.description}
			</div>
			<div className="assign_job_modal-price">
				<b>Rate:</b> ${job.price} /hr
			</div>
			<div className="assign_job_modal-category">
				<b>Type:</b> {job.category}{" "}
			</div>
			<form onSubmit={handleSubmit} className="assign_tech_form">
				<ul>
					{errors.map((error, idx) => (
						<li className={"edit_errors"} key={idx}>
							{error}
						</li>
					))}
				</ul>
				<select
					onChange={(e) => setCurrHour(parseInt(e.target.value))}
					className="assign_job_modal-select"
				>
					Schedule
					{futureHours.map((hour) => {
						return (
							<option key={hour + 100} value={hour} label={AMPM(hour)}></option>
						);
					})}
				</select>
				<select
					onChange={(e) => setWorker_id(parseInt(e.target.value))}
					className="assign_job_modal-select"
				>
					Techs
					<option value="" selected disabled hidden>
						Select A Technician
					</option>
					{techs.map((tech, index) => {
						return (
							<option
								key={tech.id}
								value={tech.id}
								label={tech.first_name + " " + tech.last_name}
							></option>
						);
					})}
				</select>
				<div className="accept_job-assign_container">
					<button type="submit" className="accept_job-assign_button">
						Assign
					</button>
				</div>
			</form>
		</div>
	);
}

export default AcceptJobModal;

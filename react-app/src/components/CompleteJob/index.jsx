import React, { useState } from "react";

import { updateJob } from "../../store/jobs";
import { getJobs } from "../../store/jobs";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { getJob, deleteJob } from "../../store/job";
import { createNewBooking } from "../../store/bookings";
import { getBookings } from "../../store/bookings";
import { getManagers } from "../../store/manager";
import { getChart } from "../../store/chart";
import { store } from "../../index";
import "./CompleteJob.css";

function CompleteJobModal({ job }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	// console.log(worker_id, "worker Id")

	const handleComplete = async () => {
		try {
			await dispatch(deleteJob(job.id))
				.then(() => dispatch(getJob()))
				.then(() => {
					dispatch(getBookings());
				});
			closeModal();
		} catch (error) {
			setErrors(error.errors);
		} finally {
			window.location.reload(false);
			await dispatch(getJobs())
				.then(() => {
					dispatch(getBookings());
				})
				.then(() => dispatch(getManagers()))
				.then(() => dispatch(getJob()))
				.then(() => {
					closeModal();
				});
			dispatch(getChart(store.getState().manager, store.getState().job));
		}
	};

	// console.log(errors, "errors")

	return (
		<div className="complete_job_modal-container">
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<h1 className="complete_job-title">Mark Job As Completed?</h1>
			<div className="complete_job-buttons">
				<button onClick={handleComplete} className="complete_job_modal-yes">
					Yes
				</button>
				<button onClick={() => closeModal()} className="complete_job_modal-no">
					No
				</button>
			</div>
		</div>
	);
}

export default CompleteJobModal;

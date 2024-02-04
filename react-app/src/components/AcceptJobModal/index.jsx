import React, { useState } from "react";

import { updateJob } from "../../store/jobs";
import { getJobs } from "../../store/jobs";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { getJob } from "../../store/job";

function AcceptJobModal({job, techs}) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [location_id, setLocation_id] = useState(job.location_id);
	const [worker_id, setWorker_id] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

    let payload = {
        location_id,
        id: job.id,
        worker_id,
        description: job.description,
        title: job.title,
        price: job.price,
        category: job.category
    }
    // console.log(worker_id, "worker Id")

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {const data = await dispatch(updateJob(payload, job.id));
		navigate("/home");
        dispatch(getJob());
        closeModal()
        ;}
		catch (data) {
			setErrors(data.errors);
		} finally {
           dispatch(getJobs()).then(() => dispatch(getJob));
        } 
	};

    console.log(errors, "errors")

	return (
		<div className="assign_job_modal-container">
			<h1 className="assign_job_modal-title">
				Assign A Technician To This Job
			</h1>
			<div className="assign_job_modal-title"> Job: {job.title}</div>
			<div className="assign_job_modal-description">
				Details: {job.description}
			</div>
			<div className="assign_job_modal-price">Rate: ${job.price} /hr</div>
			<div className="assign_job_modal-category">Type: {job.category} </div>
			<form onSubmit={handleSubmit} className="assign_tech_form">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
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
				<button type="submit">Assign</button>
			</form>
		</div>
	);
}

export default AcceptJobModal;

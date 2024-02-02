import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { getJobs, updateJob } from "../../store/jobs";
import { getJob } from "../../store/job";


function TechInfoModal({ tech, job }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);

	const { closeModal } = useModal();

	console.log(job[0].worker_id, "worker-id");
	console.log(tech.id, "tech-id");

	useEffect(() => {
		dispatch(getJobs()).then(() => dispatch(getJob()));
	}, [dispatch]);

    const unassignPayLoad = {
        worker_id : 0
    }

	const handleUnassign = async (custom, jobId) => {
		try {
			const data = await dispatch(updateJob(custom, jobId));
			navigate("/home");
			dispatch(getJob());
			closeModal();
		} catch (data) {
			setErrors(data.errors);
		} finally {
			dispatch(getJobs()).then(() => dispatch(getJob));
		}
	};

	return (
		<>
			<div className="techs_name-modal">
				{tech.first_name} {tech.last_name}{" "}
			</div>
			<div className="techs_email-modal">{tech.email}</div>
			<div className="techs_number-modal">{tech.phone_number}</div>
			<div className="techs_jobs-modal">
				Assigned Jobs :
				{job.map((job) => {
					if (job) {
						if (job.worker_id == tech.id) {
							return (
								<div className="tech_job-modal">
									<div>{job.title}</div>
									<p>{errors}</p>
									<button
										onClick={() =>
											handleUnassign(
												{
													location_id: job.location_id,
													id: job.id,
													worker_id: 0,
													description: job.description,
													title: job.title,
													price: job.price,
													category: job.category,
												},
												job.id
											)
										}
									>
										Un-Assign
									</button>
								</div>
							);
						}
					}
				})}
			</div>
		</>
	);
}

export default TechInfoModal;

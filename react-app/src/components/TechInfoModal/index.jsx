import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../../store/jobs";
import { getJob } from "../../store/job";

function TechInfoModal({ tech, job }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { closeModal } = useModal();


	console.log(job[0].worker_id, "worker-id");
	console.log(tech.id, "tech-id");
    
    useEffect(() => {
			dispatch(getJobs())
				.then(() => dispatch(getJob()))
		}, [dispatch]);

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
								<div className="tech-job">
									<div>{job.description}</div>
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

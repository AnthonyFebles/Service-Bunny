import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Mermaid from "../Mermaid";
import OpenModalButton from "../OpenModalButton";
import { getManagers } from "../../store/manager";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../../store/jobs";
import { getJob } from "../../store/job";
import { getLocations } from "../../store/locations";
import { getBookings } from "../../store/bookings";
import AcceptJobModal from "../AcceptJobModal";
import TechInfoModal from "../TechInfoModal";
import SignupFormModal from "../SignupFormModal";
import CompleteJobModal from "../CompleteJob";
import "./ManagerHome.css";

const ManagerHome = () => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);

	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();

	const jobs = useSelector((state) => {
		return state.jobs.list.map((jobId) => state.jobs[jobId]);
	});

	const currJobs = useSelector((state) => {
		return state.job.list.map((jobId) => state.job[jobId]);
	});

	const manager = useSelector((state) => {
		return state.manager.list.map((id) => state.manager[id]);
	});

	const locations = useSelector((state) => {
		return state.locations.locations.map(
			(locationId) => state.locations[locationId]
		);
	});
	const bookings = useSelector((state) => {
		return state.bookings;
		// .bookings.map((bookingId) => state.bookings[bookingId]);
	});

	console.log(manager, "manager")

	useEffect(() => {
		dispatch(getJobs())
			.then(() => dispatch(getLocations()))
			.then(() => dispatch(getBookings()))
			.then(() => dispatch(getManagers()))
			.then(() => dispatch(getJob()))
			.then(() => setIsLoading(false));
	}, [dispatch]);

	console.log(currJobs, "curr Jobs");

	if (!sessionUser) return <>{navigate("/")}</>;

	if (isLoading)
		return (
			<>
				<img src="Images/running.gif" className="loading_bunny"></img>
			</>
		);

	const createSchedule = (manager, currJobs) => {
		if (manager.length > 0) {
		let final = `\n`
		for(let i =0; i < manager.length; i++) {
			let technician = manager[i]
			if (technician.bookings[0]) {
				final += `section ${technician.first_name} ${technician.last_name}\n`
				for(let j=0; j<technician.bookings.length; j++){
					
					let booking = technician.bookings[j]
					//console.log(technician.bookings[j],"booking in loop");
					let found = currJobs.find((el) => el.id == booking.id);
					console.log(found, "found")
					if(found){
					 final += `${found.title} :${booking.scheduled_start.slice(-12, -7)}, 1h\n`;
				}
				}
				
			}
		}
		return final
	}
	};

	

	let chartDefinition =
		`
---
displayMode: compact
--- 
gantt
    
    dateFormat HH:mm
    axisFormat %H:%M\n` + createSchedule(manager, currJobs);

	console.log(chartDefinition, "chart")

	function loadJobs(jobs) {
		return (
			<div className="jobs_container">
				{jobs.toReversed().map((job) => {
					if (job) {
						return (
							<div className="job" key={job.id}>
								<OpenModalButton
									className={"assign_tech_button"}
									buttonText={job.title}
									modalComponent={<AcceptJobModal job={job} techs={manager} />}
								/>
							</div>
						);
					}
				})}
			</div>
		);
	}

	function loadTechs(manager) {
		return (
			<div className="techs_container">
				{manager.map((tech) => {
					if (tech) {
						return (
							<div className="tech" key={tech.id}>
								<OpenModalButton
									className={"techs_button"}
									buttonText={tech.first_name + " " + tech.last_name}
									modalComponent={<TechInfoModal tech={tech} job={currJobs} />}
								/>
							</div>
						);
					}
				})}
			</div>
		);
	}

	return (
		
		<div className="manager_container">
			{manager.length > 0 && console.log(createSchedule(manager, currJobs), "create string")}
			<div className="manager_schedule">Schedule</div>
			<Mermaid chart={chartDefinition} />
			<div className="outer_jobs_container">
				<h2 className="jobs_done-title">Ready For Billing</h2>
				<div className="jobs_done">
					{currJobs.length > 0 &&
						currJobs.toReversed().map((job) => {
							if (job)
								if (job.customer_check)
									return (
										<div>
											<OpenModalButton
												className={"done_job"}
												buttonText={job.title}
												modalComponent={<CompleteJobModal job={job} />}
											></OpenModalButton>
										</div>
									);
						})}
				</div>
				<h2 className="jobs_title">Available Jobs</h2>
				<div className="jobs">
					{jobs.length > 0 ? (
						loadJobs(jobs)
					) : (
						<div>No Available Jobs, Check Back Later...</div>
					)}
				</div>
			</div>
			<div className="outer_techs_container">
				<h2 className="techs_title">Your Technicians</h2>
				<div className="techs">{manager.length > 0 && loadTechs(manager)}</div>
			</div>
			<div className="new_techs_container">
				<OpenModalButton
					className={"new_tech-button"}
					buttonText={"Create A New Tech Account"}
					modalComponent={<SignupFormModal manager={sessionUser.id} />}
				/>
			</div>
		</div>
	);
};

export default ManagerHome;

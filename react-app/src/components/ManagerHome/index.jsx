import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

	if (isLoading) return <>Loading...</>;

	function loadJobs(jobs) {
		return (
			<div className="jobs">
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
			<div className="techs">
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
			<div className="manager_schedule">Schedule</div>
			<div className="jobs_container">
				<div className="jobs_done">
					Ready For Billing:
					{currJobs.length > 0 &&
						currJobs.toReversed().map((job) => {
							if (job)
								if (job.customer_check)
									return (
										<div>
											<OpenModalButton
												buttonText={job.title}
												modalComponent={<CompleteJobModal job={job} />}
											></OpenModalButton>
										</div>
									);
						})}
				</div>
				<div className="jobs_title">
					Available Jobs :
					{jobs.length > 0 ? (
						loadJobs(jobs)
					) : (
						<div>No Available Jobs, Check Back Later</div>
					)}
				</div>
			</div>
			<div className="techs_container">
				<div className="techs_title">
					Your Technicians :{manager.length > 0 && loadTechs(manager)}
				</div>
			</div>
			<div>
				<OpenModalButton
					buttonText={"Create A New Tech Account"}
					modalComponent={<SignupFormModal manager={sessionUser.id} />}
				/>
			</div>
		</div>
	);
};

export default ManagerHome;
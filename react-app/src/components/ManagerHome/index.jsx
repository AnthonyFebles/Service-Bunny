import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import mermaid from "mermaid";
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
import { getChart } from "../../store/chart";
import {store} from "../../index"

const ManagerHome = () => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	

	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();



	useEffect(() => {
		dispatch(getJobs())
			.then(() => dispatch(getLocations()))
			.then(() => dispatch(getBookings()))
			.then(() => dispatch(getManagers()))
			.then(() => dispatch(getJob()))
			.then(() =>
				dispatch(getChart(store.getState().manager, store.getState().job))
			)
			.then(() => setIsLoading(false));
	}, [dispatch]);

	const jobs = useSelector((state) => {
		return state.jobs.list.map((jobId) => state.jobs[jobId]);
	});

	const currJobs = useSelector((state) => {
		return state.job.list.map((jobId) => state.job[jobId]);
	});

	const manager = useSelector((state) => {
		return state.manager.list.map((id) => state.manager[id]);
	});
	//console.log(manager.length, "manager");
	
	const chart = useSelector((state) => {
		return state.chart;
	});

	//console.log(chart, "chart")

	// const locations = useSelector((state) => {
	// 	return state.locations.locations.map(
	// 		(locationId) => state.locations[locationId]
	// 	);
	// });
	// const bookings = useSelector((state) => {
	// 	return state.bookings;
	// 	// .bookings.map((bookingId) => state.bookings[bookingId]);
	// });

	//console.log(currJobs, "curr Jobs");
	
	if (!sessionUser) return <>{navigate("/")}</>;

	if (isLoading)
		return (
			<>
				<img src="Images/running.gif" className="loading_bunny"></img>
			</>
		);

	//console.log(chartDefinition, "chart");

	


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
	//console.log(chart, "chart state")

	return (
		<div className="manager_container">
			<h1 className="manager_schedule">Schedule</h1>
			{manager.length > 0 && manager.some((el) => el.bookings.length > 0) && (
				<Mermaid chart={chart} />
			)}
			{manager.length > 0 &&
				!manager.some((el) => el.bookings.length > 0) && (
					<h2 className="no_techs-title">
						You Don't Have Any Jobs Booked Yet. Check Under Available Jobs...
					</h2>
				)}
			{manager.length == 0 && (<h2 className="no_techs-title">Start by Hiring Some Techs On The Bottom Right...</h2>)}
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
						<div>No Customers Are Requesting Jobs Right Now, Check Back Later...</div>
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

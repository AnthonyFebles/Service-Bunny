import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { getManagers } from "../../store/manager";
import { NavLink, useNavigate } from "react-router-dom";
import { getJobs } from "../../store/jobs";
import { getJob } from "../../store/job";
import { getLocations } from "../../store/locations";
import { getBookings } from "../../store/bookings";

const TechnicianHome = () => {
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
			.then(() => dispatch(getJob()))
			.then(() => setIsLoading(false));
	}, [dispatch]);

	if (!sessionUser) return <>{navigate("/")}</>;

	if (isLoading) return <>Loading...</>;

	if (!jobs) return <div>No Jobs Assigned To You Yet</div>;

	console.log(bookings, "bookings");
	console.log(jobs, "jobs");

	return (
		<div className="tech_homepage-job_container">
			<h1 className="tech_homepage-job_header">Your Jobs</h1>
			<nav>
				{jobs.toReversed().map((job) => {
					if (job)
						return (
							<div key={job.id} className="tech_homepage-jobs">
								<NavLink to={`/jobs/${job.id}`}>
									<div>
										<img
											src={`/Images/${job.category}.jpg`}
											alt="Job Link"
											className="job_image"
											title={`${job.title}`}
										/>
									</div>
								</NavLink>
								<p className="job__title">{`${job.title}`}</p>
							</div>
						);
				})}
			</nav>
		</div>
	);
};

export default TechnicianHome;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { getManagers } from "../../store/manager";
import { NavLink, useNavigate } from "react-router-dom";
import { getJobs } from "../../store/jobs";
import { getJob } from "../../store/job";
import { getLocations } from "../../store/locations";
import { getBookings } from "../../store/bookings";
import NewLocationModal from "../NewLocationModal";
import "./CustomerHome.css"

const CustomerHome = () => {
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

	if (!locations) return <div>You Have No Locations Yet.</div>;

	console.log(locations, "locations");
	console.log(jobs, "jobs");

	return (
		<>
			<OpenModalButton
				buttonText={"Create A New Location"}
				modalComponent={<NewLocationModal />}
			></OpenModalButton>
			<div className="customer_homepage-location_container">
			<h1 className="customer_homepage-location_header">Your Locations</h1>
				<nav className="customer_homepage-locations">
					{locations.toReversed().map((location) => {
						if (location)
							return (
								<div key={location.id} className="customer_homepage-a-location">
									<NavLink
										to={`/locations/${location.id}`}
										className="location_nav_image"
									>
										<img
											src={`/Images/locations.jpg`}
											alt="Location Link"
											className="location_image"
											title={`${location.name}`}
											height={200}
											width={250}
										/>

										<p className="location__title">{`${location.name}`}</p>
									</NavLink>
								</div>
							);
					})}
				</nav>
			</div>
			<div className="customer_homepage-job_container">
				<h1 className="customer_homepage-job_header">Your Jobs</h1>
				<nav>
					<h2 className="location_details-is_booked_header">
						Waiting On Approval:
					</h2>
					{jobs.toReversed().map((job) => {
						if (job)
							if (job.bookings[0])
								if (job.employee_check)
									if (!job.customer_check)
										return (
											<div key={job.id} className="tech_homepage-jobs">
												<NavLink to={`/jobs/${job.id}`}>
													
														<img
															src={`/Images/${job.category}.jpg`}
															alt="Job Link"
															className="job_image"
															title={`${job.title}`}
															height={200}
															width={250}
														/>
													
												<p className="job__title">{`${job.title}`}</p>
												</NavLink>
											</div>
										);
					})}
					<h2 className="location_details-is_booked_header">
						Technician Assigned:
					</h2>
					{jobs.toReversed().map((job) => {
						if (job)
							if (job.bookings[0])
								if (!job.employee_check)
									if (!job.customer_check)
										return (
											<div key={job.id} className="tech_homepage-jobs">
												<NavLink to={`/jobs/${job.id}`}>
													
														<img
															src={`/Images/${job.category}.jpg`}
															alt="Job Link"
															className="job_image"
															title={`${job.title}`}
															height={200}
															width={250}
														/>
													
												<p className="job__title">{`${job.title}`}</p>
												</NavLink>
											</div>
										);
					})}
					<h2 className="location_details-is_booked_header">
						Not Booked Yet:{" "}
					</h2>
					{jobs.toReversed().map((job) => {
						if (job)
							if (!job.bookings[0])
								return (
									<div key={job.id} className="tech_homepage-jobs">
										<NavLink to={`/jobs/${job.id}`}>
											
												<img
													src={`/Images/${job.category}.jpg`}
													alt="Job Link"
													className="job_image"
													title={`${job.title}`}
													height={200}
													width={250}
												/>
											
										<p className="job__title">{`${job.title}`}</p>
										</NavLink>
									</div>
								);
					})}
				</nav>
			</div>
		</>
	);
};

export default CustomerHome;

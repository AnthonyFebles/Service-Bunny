import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { getOne } from "../../store/jobDetails";
import TechBookings from "../TechBookings";
import { getLocations } from "../../store/locations";
import { getALocation } from "../../store/locationDetails";


const JobDetails = () => {
	const dispatch = useDispatch();

	const { jobId } = useParams();

	const [isLoading, setIsLoading] = useState(true);
	const [errors, setErrors] = useState("");

	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();

	const job = useSelector((state) => state.jobDetails);
	const locations = useSelector((state) => state.locationDetails)

	console.log(job, "job");
	console.log(locations, "location")

	useEffect(() => {
		const fetchAssets = async () => {
			try {
				setErrors("");
				await dispatch(getOne(jobId))
					.then(() => dispatch(getALocation(job.location_id)))
					.then(() => setIsLoading(false));
			} catch (error) {
				setIsLoading(false);
				setErrors(error);
			}
		};
		fetchAssets();
	}, [dispatch, jobId]);

	if (!job.price) {
		return <div>You are unauthorized to view this job</div>;
	}

	// console.log(currJobs, "curr Jobs")

	if (!sessionUser) return <>{navigate("/")}</>;

	if (isLoading) return <>Loading...</>;

	if (sessionUser.role == "Manager") {
		return (
			<>
				{job ? (
					<>
						<div className="job_details-container">
							<div className="job_details-title">Title: {job.title}</div>
							<div className="job_details-title">Category: {job.category}</div>
							<div className="job_details-title">
								Details: {job.description}
							</div>
							<div>Location: {locations.address}</div>
							<div>Hourly Rate : $ {job.price}</div>
							<div className="job_details-title">Created: {job.created_at}</div>
						</div>
						{job.bookings && job.bookings[0] && (
							<div className="job_details-schedule_container">
								<div className="job_details-scheduled_for">
									Scheduled To Start On: {job.bookings[0].scheduled_start}
								</div>
								<div>Actually Started On : {job.bookings[0].actual_start}</div>
								<div>Completed On : {job.bookings[0].stopped_at}</div>
							</div>
						)}
					</>
				) : (
					<div className="no_job">No Job Details Here</div>
				)}
			</>
		);
	}

	if (sessionUser.role == "Technician") {
		return (
			<>
				{job ? (
					<>
						<div className="job_details-container-tech">
							<div className="job_details-title">Title: {job.title}</div>
							<div className="job_details-title">Category: {job.category}</div>
							<div className="job_details-title">
								Details: {job.description}
							</div>
							<div>Location: {locations.address}</div>
							<div className="job_details-title">Created: {job.created_at}</div>
						</div>
						{job.bookings && job.bookings[0] && (
							<div className="job_details-schedule_container-tech">
								<div className="job_details-scheduled_for">
									Scheduled To Start On: {job.bookings[0].scheduled_start}
								</div>
								<div className="tech_booking-container">
									<TechBookings booking={job.bookings[0]} job={job} />
								</div>
							</div>
						)}
					</>
				) : (
					<div className="no_job">No Job Details Here</div>
				)}
			</>
		);
	}

	if (sessionUser.role == "Customer") {
		return (
			<>
				{job ? (
					<>
						<div className="job_details-container-customer">
							<div className="job_details-title">Title: {job.title}</div>
							<div className="job_details-category">
								Category: {job.category}
							</div>
							<div className="job_details-description">
								Details: {job.description}
							</div>
							<div className="job_details-address">
								Location: {locations.address}
							</div>
							<div className="job_details-Created">Created: {job.created_at}</div>
						</div>
						{job.bookings && job.bookings[0] && (
							<div className="job_details-schedule_container-customer">
								<div className="job_details-scheduled_for">
									Scheduled To Start On: {job.bookings[0].scheduled_start}
								</div>
								<div className="customer_booking-container"></div>
							</div>
						)}
					</>
				) : (
					<div className="no_job">No Job Details Here</div>
				)}
			</>
		);
	}
};

export default JobDetails;

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { getOne, updateJob } from "../../store/jobDetails";
import TechBookings from "../TechBookings";
import { getLocations } from "../../store/locations";
import { useModal } from "../../context/Modal";
import { getALocation } from "../../store/locationDetails";
import OpenModalButton from "../OpenModalButton";
import EditJobModal from "../EditJobModal";
import { deleteJob } from "../../store/jobs";
import { getOneWorker } from "../../store/worker";
import "./JobDetails.css";

const JobDetails = () => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	closeModal();
	const { jobId } = useParams();

	const job = useSelector((state) => state.jobDetails);

	const [isLoading, setIsLoading] = useState(true);
	const [errors, setErrors] = useState("");

	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();

	const locations = useSelector((state) => state.locationDetails);
	const worker = useSelector((state) => state.worker);

	console.log(job, "job");
	console.log(locations, "location");
	console.log(worker, "worker");

	useEffect(() => {
		const fetchAssets = async () => {
			try {
				setErrors("");
				await dispatch(getOne(jobId))
					.then(() => dispatch(getALocation(job.location_id)))
					.then(() => dispatch(getOneWorker(job.worker_id)))
					.then(() => setIsLoading(false));
			} catch (error) {
				setIsLoading(false);
				setErrors(error.errors);
			}
		};
		fetchAssets();
	}, [dispatch, jobId, job.worker_id, job.location_id]);

	if (!job.price) {
		return <div>You are unauthorized to view this job</div>;
	}

	const handleDelete = async () => {
		try {
			await dispatch(deleteJob(job.id));
			navigate("/home");
		} catch (error) {
			setErrors(error.errors);
		}
	};

	const handleComplete = async () => {
		let payload = {
			location_id: job.location_id,
			id: job.id,
			worker_id: job.worker_id,
			description: job.description,
			title: job.title,
			price: job.price,
			category: job.category,
			employee_check: job.employee_check,
			customer_check: true,
		};

		try {
			await dispatch(updateJob(payload, job.id)).then(() =>
				dispatch(getOne(jobId))
			);
		} catch (error) {
			setErrors(error.errors);
		}
	};

	if (!sessionUser) return <>{navigate("/")}</>;

	if (isLoading) return <>Loading...</>;

	if (sessionUser.role == "Manager") {
		return (
			<>
				{job ? (
					<div className="job_details-outer_container">
						<div className="job_details-container">
							<div className="job_details-title">
								<b>{job.title}</b>
							</div>
							<br></br>
							<div className="job_details-category">
								<b>Category:</b> {job.category}
							</div>
							<br></br>
							<div className="job_details-details">
								<b>Details:</b> {job.description}
							</div>
							<br></br>
							<div className="job_details-address">
								<b>Location:</b> {locations.address}
							</div>
							<br></br>
							<div className="job_details-price">
								<b>Hourly Rate:</b> ${job.price}
							</div>
							<br></br>
							<div className="job_detail-created">
								<b>Created:</b> {job.created_at.slice(0, 16)}
							</div>
						</div>
						{job.bookings && job.bookings[0] && (
							<div className="job_details-schedule_container">
								<div className="job_details-scheduled_for">
									<b>Scheduled To Start On:</b>{" "}
									{job.bookings[0].scheduled_start}
								</div>
								<br></br>
								<div>
									<b>Actually Started On:</b> {job.bookings[0].actual_start}
								</div>

								<br></br>
								<div>
									<b>Completed On:</b> {job.bookings[0].stopped_at}
								</div>
							</div>
						)}
					</div>
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
							<div className="job_details-container">
								<div className="job_details-title">
									<b>{job.title}</b>
								</div>
								<br></br>
								<div className="job_details-category">
									<b>Category:</b> {job.category}
								</div>
								<br></br>
								<div className="job_details-details">
									<b>Details:</b> {job.description}
								</div>
								<br></br>
								<div className="job_details-address">
									<b>Location:</b> {locations.address}
								</div>
								<br></br>
								<div className="job_details-price">
									<b>Hourly Rate:</b> ${job.price}
								</div>
								<br></br>
								<div className="job_detail-created">
									<b>Created:</b> {job.created_at.slice(0, 16)}
								</div>
							</div>
						</div>
						<div className="job_details-schedule_container-tech">
							{job.bookings && job.bookings[0] && (
								<div className="job_details-container">
									<div className="job_details-scheduled_for">
										Scheduled To Start On: {job.bookings[0].scheduled_start}
									</div>
									
										<TechBookings
											booking={job.bookings[0]}
											job={job}
											className="tech_booking-container"
										/>
									
								</div>
							)}
						</div>
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
						{job.bookings.length ? (
							<>
								<div>
									This Job Has A Current Booking And Can Not Be Edited Or
									Deleted
								</div>
								<button disabled={true}>Edit This Job</button>
								<button disabled={true}>Delete This Job</button>
								{worker && worker.phone_number && (
									<>
										<div>Contact The Assigned Technician</div>
										<div>
											{worker.first_name} {worker.last_name}
										</div>
										<div>{`(${worker.phone_number
											.toString()
											.slice(0, 3)})-${worker.phone_number
											.toString()
											.slice(3, 6)}-${worker.phone_number
											.toString()
											.slice(6)}`}</div>
									</>
								)}
								{job.employee_check && !job.customer_check && (
									<>
										<div>Technicians Solution: {job.solution}</div>
										<button onClick={handleComplete}>Mark As Completed</button>
									</>
								)}
								{job.customer_check && (
									<div>Awaiting Manager Acknowledgement</div>
								)}
							</>
						) : (
							<>
								<OpenModalButton
									buttonText={"Edit This Job"}
									modalComponent={<EditJobModal currJob={job} />}
								></OpenModalButton>
								<button onClick={handleDelete}>Delete This Job</button>
							</>
						)}
						<div className="job_details-container">
							<div className="job_details-title">
								<b>{job.title}</b>
							</div>
							<br></br>
							<div className="job_details-category">
								<b>Category:</b> {job.category}
							</div>
							<br></br>
							<div className="job_details-details">
								<b>Details:</b> {job.description}
							</div>
							<br></br>
							<div className="job_details-address">
								<b>Location:</b> {locations.address}
							</div>
							<br></br>
							<div className="job_details-price">
								<b>Hourly Rate:</b> ${job.price}
							</div>
							<br></br>
							<div className="job_detail-created">
								<b>Created:</b> {job.created_at.slice(0, 16)}
							</div>
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

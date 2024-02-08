import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getALocation } from "../../store/locationDetails";
import OpenModalButton from "../OpenModalButton";
import EditLocationModal from "../EditLocationModal";

const LocationDetails = () => {
	const dispatch = useDispatch();

	const { locationId } = useParams();

	const [isLoading, setIsLoading] = useState(true);
	const [errors, setErrors] = useState("");

	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();

	const location = useSelector((state) => state.locationDetails);

	console.log(location, "location");

	useEffect(() => {
		const fetchAssets = async () => {
			try {
				setErrors("");
				await dispatch(getALocation(locationId)).then(() =>
					setIsLoading(false)
				);
			} catch (error) {
				setIsLoading(false);
				setErrors(error);
			}
		};
		fetchAssets();
	}, [dispatch, locationId]);

	// console.log(currJobs, "curr Jobs")

	if (!sessionUser) return <>{navigate("/")}</>;

	if (isLoading) return <>Loading...</>;

	if (sessionUser.role == "Customer") {
		return (
			<>
				{location ? (
					<>
						<div className="job_details-container-customer">
							<div className="location_details-name">Name: {location.name}</div>
							<div className="location_details-address">
								Address: {location.address}
							</div>
							<div className="location_details-notes">
								Notes: {location.notes}
							</div>
						</div>
						<OpenModalButton
							buttonText={"Edit This Location"}
                            modalComponent={<EditLocationModal currLocation={location}/>}
						></OpenModalButton>
						<div>Requested Jobs: </div>
						{location.jobs && (
							<nav>
								<h2 className="location_details-is_booked_header">
									Technician Assigned:
								</h2>
								{location.jobs.toReversed().map((job) => {
									if (job)
										if (job.bookings[0])
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
								<h2 className="location_details-is_booked_header">
									Not Booked Yet:{" "}
								</h2>
								{location.jobs.toReversed().map((job) => {
									if (job)
										if (!job.bookings[0])
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
						)}
					</>
				) : (
					<div className="no_job">No Location Details Here</div>
				)}
			</>
		);
	}
};

export default LocationDetails;

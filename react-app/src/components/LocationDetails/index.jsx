import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getALocation } from "../../store/locationDetails";


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
				await 
					 dispatch(getALocation(locationId))
					.then(() => setIsLoading(false));
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
							<div className="location_details-name">Name: {location.Name}</div>
							<div className="location_details-address">
								Address: {location.address}
							</div>
							<div className="location_details-notes">Notes: {location.notes}</div>
						</div>
                        <div>Requested Jobs: </div>
						{location.jobs && (
							<nav>
								{location.jobs.toReversed().map((job) => {
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

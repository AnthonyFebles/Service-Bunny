import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../store/jobs";
import { getLocations } from "../../store/locations";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import { getBookings } from "../../store/bookings";
import { getManagers } from "../../store/manager";

const AllStores = () => {
	const dispatch = useDispatch();

	const ulRef = useRef();

	const [isLoading, setIsLoading] = useState(true);

	const sessionUser = useSelector((state) => state.session.user);

	const jobs = useSelector((state) => {
		return state.jobs.list.map((jobId) => state.jobs[jobId]);
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

	console.log(jobs, "jobs");
	console.log(sessionUser, "user");
	console.log(locations, "locations");
	console.log(bookings, "bookings");
    console.log(manager, "manager");

	useEffect(() => {
		dispatch(getJobs())
			.then(() => dispatch(getLocations()))
			.then(() => dispatch(getBookings()))
			.then(() => dispatch(getJobs()))
			.then(() => dispatch(getManagers()))
			.then(() => setIsLoading(false));
	}, [dispatch]);

	return <></>;
};

export default AllStores;

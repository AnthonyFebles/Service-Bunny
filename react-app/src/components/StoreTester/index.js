import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../store/jobs";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";


const AllJobs = () => {
	const dispatch = useDispatch();

	const ulRef = useRef();

	const [isLoading, setIsLoading] = useState(true);

	const sessionUser = useSelector((state) => state.session.user);


	const jobs = useSelector((state) => {
		return state.jobs.list.map((jobId) => state.jobs[jobId]);
	});

    console.log(jobs)
    console.log(sessionUser)

	useEffect(() => {
		dispatch(getJobs()).then(() => setIsLoading(false));
	}, [dispatch]);


    return <></>
}

export default AllJobs
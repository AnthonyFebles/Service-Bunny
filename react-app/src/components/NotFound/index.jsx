import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


function NotFound({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div>404 There's nothing here</div>
	);
}

export default NotFound;

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ManagerHome from "../ManagerHome";
import TechnicianHome from "../TechnicianHome";
import CustomerHome from "../CustomerHome";

const HomePage = () => {
	
	const sessionUser = useSelector((state) => state.session.user);
	const navigate = useNavigate();

	if (!sessionUser) return <>{navigate("/")}</>;

	switch (sessionUser.role) {
		case "Manager":
			return (
				<div>
					<ManagerHome />
				</div>
			);
		case "Technician":
			return (
				<div>
					{" "}
					<TechnicianHome />{" "}
				</div>
			);
		case "Customer":
			return (
				<div>
					{" "}
					<CustomerHome />{" "}
				</div>
			);
	}

	return <div>Loading...</div>;
};

export default HomePage;

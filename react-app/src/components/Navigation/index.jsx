import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<header>
			<nav>
				{sessionUser ? (
					<NavLink exact to="/home">
						<div className="logo-name">
							<img
								src="https://i.imgur.com/6H6dkkv.png"
								width="70"
								height="70"
							/>
							<p>Service Bunny</p>
						</div>
					</NavLink>
				) : (
					<NavLink exact to="/">
						<div className="logo-name">
							<img
								src="https://i.imgur.com/6H6dkkv.png"
								width="70"
								height="70"
							/>
							<p>Service Bunny</p>
						</div>
					</NavLink>
				)}
			</nav>
			<img
				src="Images/running.gif"
				height={150}
				className="running_bunny"
			></img>
			<div className="right_side_nav">
				{isLoaded && <ProfileButton user={sessionUser} />}
			</div>
		</header>
	);
}

export default Navigation;

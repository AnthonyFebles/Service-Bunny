import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

		const handleManagerLogin = () => {
			const demoCredentials = {
				email: "demo@aa.io",
				password: "password",
			};

			dispatch(login(demoCredentials.email, demoCredentials.password)).then(
				() => {
					navigate("/home");
				}
			);
		};
			const handleTechnicianLogin = () => {
				const demoCredentials = {
					email: "steve@aa.io",
					password: "password",
				};

				dispatch(login(demoCredentials.email, demoCredentials.password)).then(
					() => {
						navigate("/home");
					}
				);
			};
			const handleCustomerLogin = () => {
				const demoCredentials = {
					email: "marnie@aa.io",
					password: "password",
				};

				dispatch(login(demoCredentials.email, demoCredentials.password)).then(
					() => {
						navigate("/home");
					}
				);
			};

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout()).then(() => {
			navigate("/");
		});
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
	const closeMenu = () => setShowMenu(false);

	return (
		<>
			<button onClick={openMenu}>
				<i className="fas fa-user-circle" />
			</button>
			<ul className={ulClassName} ref={ulRef}>
				{user ? (
					<>
						<li>{user.username}</li>
						<li>{user.email}</li>
						<li>
							<button onClick={handleLogout}>Log Out</button>
						</li>
						<div className="manager-login">
							<button onClick={handleManagerLogin}>Manager-Demo-Login</button>
						</div>
						<div className="technician-login">
							<button onClick={handleTechnicianLogin}>
								Technician-Demo-Login
							</button>
						</div>
						<div className="customer-login">
							<button onClick={handleCustomerLogin}>Customer-Demo-Login</button>
						</div>
					</>
				) : (
					<>
						<OpenModalButton
							buttonText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>

						<OpenModalButton
							buttonText="Sign Up"
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
						<div className="manager-login">
							<button onClick={handleManagerLogin}>Manager-Demo-Login</button>
						</div>
						<div className="technician-login">
							<button onClick={handleTechnicianLogin}>
								Technician-Demo-Login
							</button>
						</div>
						<div className="customer-login">
							<button onClick={handleCustomerLogin}>Customer-Demo-Login</button>
						</div>
					</>
				)}
			</ul>
		</>
	);
}

export default ProfileButton;

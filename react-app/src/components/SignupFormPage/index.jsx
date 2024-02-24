import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useModal } from "../../context/Modal";

const roles = ["Manager", "Customer"];

function SignupFormPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [role, setRole] = useState("");
	const [first_name, setFirst_Name] = useState("");
	const [last_name, setLast_Name] = useState("");
	const [scheduleColor, setScheduleColor] = useState("Blue");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(payload));
			if (data) {
				setErrors(data);
			} else {
				alert("Account Created!");
				navigate("/home");
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	const payload = {
		username,
		email,
		password,
		role,
		schedule_color: scheduleColor,
		first_name,
		last_name,
		phone_number: phoneNumber,
	};

	return (
		<>
			<h1 className="new_tech_modal-name_title">Create An Account</h1>
			<form onSubmit={handleSubmit} className="create_tech_form">
				<ul>
					{errors.map((error, idx) => (
						<li className={"edit_errors"} key={idx}>
							{error}
						</li>
					))}
				</ul>
				<div className="form-row">
					<label className="form-group">
						First Name
						<span> </span>
						<input
							className="log_in-input"
							type="text"
							value={first_name}
							onChange={(e) => setFirst_Name(e.target.value)}
							required
						/>
					</label>
					<label className="form-group">
						Last Name
						<span> </span>
						<input
							className="log_in-input"
							type="text"
							value={last_name}
							onChange={(e) => setLast_Name(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="form-row">
					<label className="form-group">
						Phone Number
						<span> </span>
						<input
							className="log_in-input"
							type="text"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							required
						/>
					</label>
					<label className="form-group">
						Email
						<span> </span>
						<input
							className="log_in-input"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="form-row">
					<label className="form-group">
						Username
						<span> </span>
						<input
							className="log_in-input"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
					<select
						onChange={(e) => setRole(e.target.value)}
						className="create_tech_modal-select"
					>
						<option value="" selected disabled hidden>
							Type of Account
						</option>
						{roles.map((color) => {
							return (
								<option
									key={color + "100"}
									value={color}
									label={color}
								></option>
							);
						})}
					</select>
				</div>
				<div className="form-row">
					<label className="form-group">
						Password
						<span> </span>
						<input
							className="log_in-input"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
					<label className="form-group">
						Confirm
						<span> </span>
						<input
							className="log_in-input"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<button type="submit" className={"form_new_tech-button"}>
					Sign Up
				</button>
			</form>
		</>
	);
}

export default SignupFormPage;

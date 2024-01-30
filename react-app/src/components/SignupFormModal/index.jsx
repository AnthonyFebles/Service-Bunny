import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signTechUp } from "../../store/session";
import "./SignupForm.css";
import { getManagers } from "../../store/manager";
const color_options = [
	"Blue",
	"Green",
	"Red",
	"Yellow",
	"Purple",
	"Gray",
	"Orange",
];

function SignupFormModal({ manager }) {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [role, setRole] = useState("Technician");
	const [first_name, setFirst_Name] = useState("");
	const [last_name, setLast_Name] = useState("");
	const [scheduleColor, setScheduleColor] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signTechUp(payload));
			dispatch(getManagers());
			if (data) {
				setErrors(data);
			} else {
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
		first_name,
		last_name,
		schedule_color: scheduleColor,
		phone_number: phoneNumber,
		manager: manager,
	};

	return (
		<>
			<h1 className="new_tech_modal-name_title">New Technician</h1>
			<form onSubmit={handleSubmit} className="create_tech_form">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx} className="signUp_errors">
							{error}
						</li>
					))}
				</ul>
				<div className="form-row">
					<label className="form-group">
						First Name
						<span> </span>
						<input
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
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
					<select
						onChange={(e) => setScheduleColor(e.target.value)}
						className="create_tech_modal-select"
					>
						<option value="" selected disabled hidden>
							Favorite Color
						</option>
						{color_options.map((color) => {
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
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<button type="submit" className={"form_new_tech-button"}>
					Create
				</button>
			</form>
		</>
	);
}

export default SignupFormModal;

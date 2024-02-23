import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));

		if (data) {
			setErrors(data);
		} else {
			closeModal();
			navigate("/home");
		}
	};

	return (
		<>
			<h1>Log In</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li className={"edit_errors"} key={idx}>
							{error}
						</li>
					))}
				</ul>
				<div className="form-row">
					<label className="form-group">
						<b>Email</b> <span>{` `}</span>
						<input
							className="log_in-input"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					<label className="form-group">
						<b>Password</b> <span>{` `}</span>
						<input
							className="log_in-input"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<button type="submit" className="edit_location-current_location">
					Log In
				</button>
			</form>
		</>
	);
}

export default LoginFormModal;

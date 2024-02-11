import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate, NavLink } from "react-router-dom";
import { getJobs, updateJob } from "../../store/jobs";
import { getJob } from "../../store/job";
import { deleteManager, getManagers, updateManager } from "../../store/manager";
import "./TechInfoModal.css";

function TechInfoModal({ tech, job }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [errors, setErrors] = useState([]);
	const [showEdit, setShowEdit] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState(tech.phone_number);
	const [first_name, setFirstName] = useState(tech.first_name);
	const [last_name, setLastName] = useState(tech.last_name);
	const [username, setUsername] = useState(tech.username);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { closeModal } = useModal();

	const editPayload = {
		first_name,
		last_name,
		username,
		password,
		phone_number: phoneNumber,
	};

	// console.log(job[0].worker_id, "worker-id");
	console.log(tech.id, "tech-id");

	useEffect(() => {
		dispatch(getJobs()).then(() => dispatch(getJob()));
	}, [dispatch, showEdit]);

	const unassignPayLoad = {
		worker_id: 0,
	};

	const handleEditMenu = async () => {
		if (showEdit) {
			setShowEdit(false);
		} else setShowEdit(true);
	};

	const handleUnassign = async (custom, jobId) => {
		try {
			const data = await dispatch(updateJob(custom, jobId));
			navigate("/home");
			dispatch(getJob());
			closeModal();
		} catch (data) {
			setErrors(data.errors);
		} finally {
			dispatch(getJobs()).then(() => dispatch(getJob));
		}
	};

	const handleDeleteUser = async (techId) => {
		try {
			const data = await dispatch(deleteManager(techId));
			dispatch(getManagers());
			closeModal();
		} catch (error) {
			setErrors(error.errors);
		} finally {
			dispatch(getJobs()).then(() => dispatch(getJob));
		}
	};

	const handleEditUser = async (techId) => {
		if (password == confirmPassword) {
			try {
				const data = await dispatch(updateManager(editPayload, techId));
				dispatch(getManagers());
				closeModal();
			} catch (error) {
				setErrors(error.errors);
			} finally {
				dispatch(getJobs()).then(() => dispatch(getJob));
			}
		}
		else setErrors(["Confirmed password does not match"])
	};

	return (
		<div className="managers_tech_modal-container">
			<div className="techs_name-modal">
				{tech.first_name} {tech.last_name}{" "}
			</div>
			<div className="techs_info_button_container">
				<button className="techs_edit_button-modal" onClick={handleEditMenu}>
					Edit Technician Details
				</button>
				<button
					className="techs_delete_button-modal"
					onClick={(e) => (e.preventDefault(), handleDeleteUser(tech.id))}
				>
					Permanently Delete This Tech
				</button>
			</div>
			{showEdit && (
				<form
					onSubmit={(e) => (e.preventDefault(), handleEditUser(tech.id))}
					className="techs_edit_form-modal"
				>
					<div className="edit_tech_modal-name_title">
						Edit {tech.first_name}{" "}
					</div>
					<ul>
						{errors.map((error, idx) => (
							<li className={"edit_errors"} key={idx}>
								{error}
							</li>
						))}
					</ul>
					<div className="form-row">
						<label className="form-group">
							First Name:
							<span> </span>
							<input
								type="text"
								value={first_name}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</label>

						<label className="form-group">
							Last Name:
							<span> </span>
							<input
								type="text"
								value={last_name}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</label>
					</div>
					<div className="form-row-2">
						<label className="form-group-2">
							Username:
							<span> </span>
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</label>
						<label className="form-group-2">
							Contact:
							<span> </span>
							<input
								type="text"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</label>
					</div>
					<div className="form-row-3">
						<label className="form-group-3">
							New Pass
							<span> </span>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
						<label className="form-group-3">
							Confirm
							<span> </span>
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</label>
					</div>
					<button className={"form_edit_tech-button"} type="submit">
						Edit
					</button>
				</form>
			)}
			<div className="techs_email-modal">{tech.email}</div>
			<div className="techs_number-modal">{`(${tech.phone_number
				.toString()
				.slice(0, 3)})-${tech.phone_number
				.toString()
				.slice(3, 6)}-${tech.phone_number.toString().slice(6)}`}</div>
			<div className="techs_jobs-modal_title">Assigned Jobs: </div>
			<div className="techs_jobs-modal">
				{job.map((job) => {
					if (job) {
						if (job.worker_id == tech.id) {
							return (
								<div className="tech_job-modal">
									<NavLink
										to={`/jobs/${job.id}`}
										className={"tech_job-title_link"}
									>
										{job.title}
									</NavLink>
									<p>{errors}</p>
									<button
										className={"tech_modal-unassign_button"}
										onClick={() =>
											handleUnassign(
												{
													location_id: job.location_id,
													id: job.id,
													worker_id: 0,
													description: job.description,
													title: job.title,
													price: job.price,
													category: job.category,
												},
												job.id
											)
										}
									>
										Un-Assign
									</button>
								</div>
							);
						}
					}
				})}
			</div>
		</div>
	);
}

export default TechInfoModal;

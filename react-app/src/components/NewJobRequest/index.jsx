import React, { useState } from "react";
import { createNewJob, updateJob } from "../../store/jobs";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { createNewLocation, getLocations } from "../../store/locations";
import { getALocation } from "../../store/locationDetails";
import "./NewJobRequest.css"

let categories = [
	"General",
	"Moving",
	"Plumbing",
	"Electrical",
	"NurseCall",
	"Network",
	"Construction",
	"Demolition",
	"Automotive",
];

function NewJobRequest({ currLocation }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [location_id, setLocation_id] = useState(currLocation.id);
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const sessionUser = useSelector((state) => state.session.user);

	const payload = {
		location_id,
		worker_id: 0,
		title,
		price,
		category,
		description,
	};

	// console.log(worker_id, "worker Id")
	console.log(payload);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await dispatch(createNewJob(payload)).then(() =>
				dispatch(getALocation(currLocation.id))
			);
			closeModal();
		} catch (data) {
			setErrors(data.errors);
		}
	};

	// console.log(errors, "errors")

	return (
		<div className="new_job-container">
			<h2 className="new_job-header">Create A New Job For This Location</h2>
			<form className="new_job-form" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className="form-row">
					<label className="new_job-title form-group">
						What's the job?
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						></input>
					</label>
					<label className="new_job-price form-group">
						What's the hourly rate you're willing to pay?
						<input
							type="text"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required
						></input>
					</label>
				</div>
				<div className="form-row">
					<select
						onChange={(e) => setCategory(e.target.value)}
						className="new_job-select form-group"
					>
						Categories
						<option value="" selected disabled hidden>
							Select A Category
						</option>
						{categories.map((category, index) => {
							return (
								<option key={index} value={category} label={category}></option>
							);
						})}
					</select>
				</div>
				<div className="form-row">
					<label className="new_job-description form-group">
						Give some more details on what you need done
						<div>
							<textarea
								className="tech_solution_textarea"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</div>
					</label>
				</div>
				<div>
					<button type="submit" className="new_job-submit">
						Request Job
					</button>
				</div>
			</form>
		</div>
	);
}

export default NewJobRequest;

import React, { useState } from "react";
import { getOne, updateJob } from "../../store/jobDetails";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { createNewLocation, getLocations } from "../../store/locations";
import { getALocation } from "../../store/locationDetails";

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

function EditJobModal({ currJob }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [location_id, setLocation_id] = useState(currJob.location_id);
	const [title, setTitle] = useState(currJob.title);
	const [price, setPrice] = useState(currJob.price);
	const [category, setCategory] = useState(currJob.category);
	const [description, setDescription] = useState(currJob.description);
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
	//console.log(payload, "payloas");

	const handleEdit = async (e) => {
		e.preventDefault();
		try {
			const data  = await dispatch(updateJob(payload, currJob.id))
				 dispatch(getOne(currJob.id))
				dispatch(getALocation(currJob.location_id));
			closeModal();
		} catch (error) {
			//console.log("catch", error)
			setErrors(error.errors);
		}
	};

	//console.log(errors, "errors")

	return (
		<div className="new_job-container">
			
			<h2 className="new_job-header">Edit This Job</h2>
			<form className="new_job-form" onSubmit={handleEdit}>
				<ul>
					{errors.map((error, idx) => (
						<li className={"edit_errors"} key={idx}>
							{error}
						</li>
					))}
				</ul>
				<div className="form-row">
					<label className="new_job-title form-group">
						What's the job?<span>{` `}</span>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						></input>
					</label>
					<label className="new_job-price form-group">
						How much will you pay per hour? <span>{` `}</span>
						<input
							type="number"
							min="15"
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
						Edit Job
					</button>
				</div>
			</form>
		</div>
	);
}

export default EditJobModal;

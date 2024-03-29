import React, { useState } from "react";
import { updateJob } from "../../store/jobs";
import { getJobs } from "../../store/jobs";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { getJob } from "../../store/job";
import { createNewBooking } from "../../store/bookings";
import { createNewLocation, getLocations } from "../../store/locations";
import { setDefaults, fromLatLng } from "react-geocode";
import "./NewLocationModal.css";

function NewLocationModal() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [notes, setNotes] = useState("");
	const [address, setAddress] = useState("");
	const [lat, setLat] = useState("");
	const [lng, setLng] = useState("");
	const [name, setName] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const sessionUser = useSelector((state) => state.session.user);

	const payload = {
		user_id: sessionUser.id,
		name,
		address,
		lat,
		lng,
		notes,
	};

	// console.log(worker_id, "worker Id")

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await dispatch(createNewLocation(payload)).then(() =>
				dispatch(getLocations())
			);
			closeModal();
		} catch (data) {
			setErrors(data.errors);
		}
	};

	setDefaults({
		key: `${process.env.REACT_APP_GOOGLE_MAPS_API}`,
		language: "en",
	});

	const handleLocation = async (e) => {
		e.preventDefault();
		try {
			await navigator.geolocation.getCurrentPosition((position) => {
				setLat(position.coords.latitude);
				setLng(position.coords.longitude);
				//console.log(lat, lng);
				fromLatLng(
					position.coords.latitude.toString(),
					position.coords.longitude.toString()
				) // Get address from latitude & longitude.
					.then(({ results }) => {
						const add = results[0].formatted_address;
						setAddress(add);
					})
					.catch(console.error);
			});
		} catch (error) {
			//console.log(error);
			setErrors(["Couldn't automatically retrieve your location"]);
		}
	};

	// console.log(errors, "errors")

	return (
		<div className="new_location-container">
			<h2 className="new_location-header">Create A New Location</h2>
			<br></br>
			<form className="new_location-form" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li className={"edit_errors"} key={idx}>
							{error}
						</li>
					))}
				</ul>
				<button
					onClick={handleLocation}
					className="new_location-current_location"
				>
					<i class="fa-solid fa-location-crosshairs"></i> Use Current Location
				</button>
				<br></br>
				<div className="form-row">
					<label className="new_location-name form-group">
						Name:<span>{"  "}</span>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						></input>
					</label>
					<label className="new_location-notes form-group">
						Notes:
						<span>{"  "}</span>
						<input
							type="textarea"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						></input>
					</label>
				</div>
				<br></br>
				<div className="form-row">
					<label className="new_location-lat form-group">
						Latitude:
						<span>{"  "}</span>
						<input
							type="text"
							value={lat}
							onChange={(e) => setLat(e.target.value)}
							required
						></input>
					</label>
					<label className="new_location-lng form-group">
						Longitude:
						<span>{"  "}</span>
						<input
							type="text"
							value={lng}
							onChange={(e) => setLng(e.target.value)}
							required
						></input>
					</label>
					<br></br>
				</div>
				<div>
					<label className="new_location-address form-row">
						Address:
						<input
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							className="long_input"
							required
						></input>
					</label>
				</div>
				<br></br>
				<div className="new_location-submit-container">
					<button type="submit" className="new_location-submit">
						Create Location
					</button>
				</div>
			</form>
		</div>
	);
}

export default NewLocationModal;

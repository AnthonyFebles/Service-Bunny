import React, { useState } from "react";
import { updateJob } from "../../store/jobs";
import { getJobs } from "../../store/jobs";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { getJob } from "../../store/job";
import { createNewBooking } from "../../store/bookings";
import {
	createNewLocation,
	getLocations,
	updateLocation,
} from "../../store/locations";
import { getALocation } from "../../store/locationDetails";
import { setDefaults, fromLatLng } from "react-geocode";

function EditLocationModal({ currLocation }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [notes, setNotes] = useState(currLocation.notes);
	const [address, setAddress] = useState(currLocation.address);
	const [lat, setLat] = useState(currLocation.latitude);
	const [lng, setLng] = useState(currLocation.longitude);
	const [name, setName] = useState(currLocation.name);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const sessionUser = useSelector((state) => state.session.user);

	const location = useSelector((state) => state.locationDetails);

	const payload = {
		name,
		address,
		lat,
		lng,
		notes,
	};
	console.log(payload);

	// console.log(worker_id, "worker Id")

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await dispatch(updateLocation(payload, location.id)).then(() =>
				dispatch(getALocation(location.id))
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
				console.log(lat, lng);
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
			console.log(error);
			setErrors(["Couldn't automatically retrieve your location"]);
		}
	};

	// console.log(errors, "errors")

	return (
		<div className="new_location-container">
			<h2 className="new_location-header">Create A New Location</h2>
			<form className="new_location-form" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<button
					onClick={handleLocation}
					className="new_location-current_location"
				>
					Use Current Location
				</button>
				<label className="new_location-name">
					Name
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					></input>
				</label>
				<label className="new_location-address">
					Address
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					></input>
				</label>
				<label className="new_location-lat">
					Latitude
					<input
						type="text"
						value={lat}
						onChange={(e) => setLat(e.target.value)}
						required
					></input>
				</label>
				<label className="new_location-lng">
					Longitude
					<input
						type="text"
						value={lng}
						onChange={(e) => setLng(e.target.value)}
						required
					></input>
				</label>
				<label className="new_location-notes">
					Notes
					<input
						type="textarea"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
					></input>
				</label>

				<button type="submit" className="new_location-submit">
					Update Location
				</button>
			</form>
		</div>
	);
}

export default EditLocationModal;

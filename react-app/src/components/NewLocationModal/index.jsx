import React, { useState } from "react";
import { updateJob } from "../../store/jobs";
import { getJobs } from "../../store/jobs";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { getJob } from "../../store/job";
import { createNewBooking } from "../../store/bookings";
import { createNewLocation, getLocations } from "../../store/locations";
import {
	setKey,
	setDefaults,
	setLanguage,
	setRegion,
	fromAddress,
	fromLatLng,
	fromPlaceId,
	setLocationType,
	geocode,
	RequestType,
} from "react-geocode";

function NewLocationModal() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [notes, setNotes] = useState("");
	const [address, setAddress] = useState("");
	const [lat, setLat] = useState("");
	const [lng, setLng] = useState("");
    const [name, setName] = useState("")
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
			dispatch(createNewLocation(payload)).then(() => dispatch(getLocations()));
            closeModal()
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
				<button onClick={handleLocation} className="new_location-current_location">Use Current Location</button>
				<label className="new_location-address">
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
						onChange={(e) => setAddress(e.target.value)}
						required
					></input>
				</label>
				<label className="new_location-lng">
					Longitude
					<input
						type="text"
						value={lng}
						onChange={(e) => setAddress(e.target.value)}
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

				<button type="submit" className="new_location-submit">Create Location</button>
			</form>
		</div>
	);
}

export default NewLocationModal;

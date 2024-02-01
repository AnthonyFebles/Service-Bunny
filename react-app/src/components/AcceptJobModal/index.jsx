import React, { useState } from "react";
import { login } from "../../store/session";
import { updateJob } from "../../store/jobs";
import { getJobs } from "../../store/jobs";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";

function AcceptJobModal({job, techs}) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [location_id, setLocation_id] = useState(job.location_id);
	const [worker_id, setWorker_id] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

    let payload = {
        location_id,
        id: job.id,
        worker_id,
        description: job.description
    }
    // console.log(worker_id, "worker Id")

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {const data = await dispatch(updateJob(payload));
		navigate("/home");}
		catch (data) {
			setErrors(data);
		} finally {
			closeModal();
		}
	};

	return (
		<>
			<h1>Assign A Technician To This Job</h1>
			<form onSubmit={handleSubmit} className="assign_tech_form">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<select onChange={(e) => setWorker_id(parseInt(e.target.value))}>
                    
					Techs
					{techs.map((tech, index) => {
                        return (
                            <option
                            key={tech.id}
                            value={tech.id}
                            label={tech.first_name + " " + tech.last_name}
                            >
                            </option>
                        )
                    })}
				</select>
				<button type="submit">Assign</button>
			</form>
		</>
	);
}

export default AcceptJobModal;

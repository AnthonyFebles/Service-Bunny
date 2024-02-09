import React, { useState } from "react";

import { updateJob } from "../../store/jobs";
import { getJobs } from "../../store/jobs";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { getJob, deleteJob } from "../../store/job";
import { createNewBooking } from "../../store/bookings";

function CompleteJobModal({job}) {


	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();


	
	// console.log(worker_id, "worker Id")

	const handleComplete = async () => {
        try {
            await dispatch(deleteJob(job.id)).then(()=> dispatch(getJob()))
            closeModal()
        }catch(error){
            setErrors(error.errors)
        }
    }


	



	

	// console.log(errors, "errors")

	return (
		<div className="complete_job_modal-container">
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<h1 className="complete_job-title">Mark Job As Completed?</h1>
			<button onClick={handleComplete} >Yes</button>
			<button onClick={()=>closeModal()}>No</button>
		</div>
	);
}

export default CompleteJobModal;

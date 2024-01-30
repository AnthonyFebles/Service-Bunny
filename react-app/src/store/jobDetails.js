import { csrfFetch } from "./csrf";
const CREATE_SPOT = "jobDetails/CREATE_JOB";
const DELETE_SPOT = "jobDetails/DELETE";
const GET_ONE = "jobDetails/GET_ONE";

const createJob = (job) => ({
	type: CREATE_SPOT,
	job,
});

const getOneJob = (job) => ({
	type: GET_ONE,
	job,
});

const removeJob = (jobId) => ({
	type: DELETE_SPOT,
	jobId,
});

export const getOne = (jobId) => async (dispatch) => {
	const response = await csrfFetch(`/api/jobs/${jobId}`);
	// console.log(response, "asdhfbjlasdjbfioas")
	if (response.ok) {
		const Job = await response.json();
		dispatch(getOneJob(Job));
		// console.log(Job, "this is the job in getOne")
		return Job;
	}

	return response;
};

export const createNewJob = (job) => async (dispatch) => {
	const response = await csrfFetch(`/api/jobs`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(job),
	});

	if (response.ok) {
		const newJob = await response.json();
		dispatch(createJob(newJob));
		return newJob;
	}

	return new Error("Failed to create Job");
};

export const updateJob = (job, jobId) => async (dispatch) => {
	const response = await csrfFetch(`/api/jobs/${jobId}`, {
		method: "PUT",
		body: JSON.stringify(job),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const Job = await response.json();
		dispatch(createJob(job));
		return Job;
	}

	return new Error("Failed to Update");
};

export const deleteJob = (jobId) => async (dispatch) => {
	const res = await csrfFetch(`/api/jobs/${jobId}`, {
		method: "DELETE",
	});

	if (res.ok) {
		const job = await res.json();
		//console.log(job, "res when deleting job");
		dispatch(removeJob(jobId));
		return job;
	}

	return res;
};

const JobReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_ONE:
			// console.log(action, "action inside get one job reducer");
			const newGet = {};
			return { ...action.job };

		case DELETE_SPOT:
			//console.log(action, "action when deleting");
			const newState = { ...state };
			delete newState[action.jobId];

			return newState;

		default:
			return state;
	}
};

export default JobReducer;

import { csrfFetch } from "./csrf";

const LOAD = "jobs/LOAD";
const CREATE = "jobs/CREATE";
const UPDATE = "jobs/UPDATE";
const DELETE = "job/DELETE";

const load = (list) => ({
	type: LOAD,
	list,
});

const create = (jobPayLoad) => ({
	type: CREATE,
	jobPayLoad,
});

const update = (jobPayLoad) => ({
	type: UPDATE,
	jobPayLoad,
});

const remove = (jobId) => ({
	type: DELETE,
	jobId,
});

export const getJobs = () => async (dispatch) => {
	const res = await fetch("/api/jobs/");

	if (res.ok) {
		const list = await res.json();
		//console.log(list, "This is the list **********");
		dispatch(load(list));
	}

	return res;
};

export const createNewJob = (jobPayload) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/jobs`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(jobPayload),
		});

		if (response.ok) {
			// console.log("res is ok?", response)
			const newJob = await response.json();
			dispatch(create(newJob));
			return newJob;
		}
	} catch (error) {
		const res = await error.json();
		// console.log("res not ok")
		// console.log(res, "this is the res ************")
		//console.log(res, "error")
		throw res;
	}
};

export const updateJob = (jobPayLoad) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/jobs/${jobPayLoad.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(jobPayLoad),
		});

		if (response.ok) {
			//console.log("res is ok?")
			const updatedJob = await response.json();
			dispatch(update(jobPayLoad));
			return updatedJob;
		}
	} catch (error) {
		const res = await error.json();
		//console.log(res, "error")
		throw res;
	}
};

export const deleteJob = (jobId) => async (dispatch) => {
	try {
		const res = await csrfFetch(`api/jobs/${jobId}`, {
			method: "DELETE",
		});

		if (res.ok) {
			const job = await res.json();
			dispatch(remove(jobId));
			return job;
		}
		return res;
	} catch (error) {
		// console.log(error,"ERROR ")
		const res = await error.json();
		// console.log(res)
		throw res;
	}
};

const initialState = {
	list: [],
};

const sortList = (list) => {
	return list
		.sort((JobA, JobB) => {
			return JobA.id - JobB.id;
		})
		.map((Job) => Job.id);
};

const JobsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD:
			//console.log(action, "console log the action")
			const allJobs = {};
			if (action.list) {
				action.list.forEach((job) => {
					allJobs[job.id] = job;
				});
				//console.log(action, "load action");

				return {
					...allJobs,

					list: sortList(action.list),
				};
			} else
				return {
					...allJobs,
					...state,
				};
		case DELETE:
			const newState = { ...state };
			// console.log(newState, "new state")
			// console.log(action, "action")
			delete newState[action.jobId];
			// console.log(newState, "new state after del");
			return newState;

		default:
			return state;
	}
};

export default JobsReducer;

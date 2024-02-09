import { csrfFetch } from "./csrf";

const LOAD_ONE = "job/LOAD_ONE";
const DELETE = "job/DELETE";



const loadOne = (list) => ({
	type: LOAD_ONE,
	list
});

const remove = (jobId) => ({
	type: DELETE,
	jobId,
});

export const deleteJob = (jobId) => async (dispatch) => {
	try {
		const res = await csrfFetch(`/api/jobs/${jobId}`, {
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

export const getJob = () => async (dispatch) => {
	const res = await fetch(`/api/manager/currentjobs`);

	if (res.ok) {
		const list = await res.json();
		//console.log(list, "This is the list **********");
		dispatch(loadOne(list));
	}

	return res;

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

const JobReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_ONE:
			const allJobs = {};
			// console.log(action)
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

export default JobReducer;

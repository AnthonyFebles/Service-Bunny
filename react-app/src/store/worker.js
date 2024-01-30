import { csrfFetch } from "./csrf";

const GET_WORKER = "worker/GET_ONE";

const getWorker = (worker) => ({
	type: GET_WORKER,
	worker,
});

export const getOneWorker = (workerId) => async (dispatch) => {
	const response = await csrfFetch(`/api/users/${workerId}`);
	// console.log(response, "asdhfbjlasdjbfioas")
	if (response.ok) {
		const worker = await response.json();
		dispatch(getWorker(worker));
		// console.log(Job, "this is the job in getOne")
		return worker;
	}

	return response;
};

const WorkerReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_WORKER:
			// console.log(action, "action inside get one job reducer");
			const newGet = {};
			if (action.worker) return { ...action.worker };
			else return { ...newGet };

		default:
			return state;
	}
};

export default WorkerReducer;

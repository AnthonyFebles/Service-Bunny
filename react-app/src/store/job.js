import { csrfFetch } from "./csrf";

const LOAD_ONE = "job/LOAD_ONE";




const loadOne = (list) => ({
	type: LOAD_ONE,
	list
});



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
		default:
			return state;
	}
};

export default JobReducer;

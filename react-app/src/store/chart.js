import { csrfFetch } from "./csrf";

const LOAD_ONE = "chart/LOAD_ONE";

const loadOne = (chart) => ({
	type: LOAD_ONE,
	chart,
});
const createSchedule = (manager, currJobs) => {
	//console.log(currJobs, "props for func");
	let a = manager.list.map((id) => manager[id]);
	let b = currJobs.list.map((jobId) => currJobs[jobId]);

	//console.log(a,b, "a,b")
	if (a.length > 0) {
		let final = ``;
		for (let i = 0; i < a.length; i++) {
			let technician = a[i];
			if (technician.bookings[0]) {
				final += `section ${technician.first_name} ${technician.last_name}\n`;
				for (let j = 0; j < technician.bookings.length; j++) {
					let booking = technician.bookings[j];
					//console.log(technician.bookings[j], "booking in loop");
					let found = b.find((el) => el.id == booking.job_id);
					//console.log(found, "found");
					if (found) {
						final += `${found.title} :${booking.scheduled_start.slice(
							-12,
							-7
						)}, 1h\n`;
					}
				}
			}
		}
		//console.log(JSON.stringify(final), "finals");
		final = final.replace(/^\s+|\s+$/g, "");
		//console.log(JSON.stringify(final), "finals pt 2");
		return final;
	}
	return "failed";
};

export const getChart = (man, curr) => async (dispatch) => {
	let chartDefinition = `gantt
dateFormat HH:mm
axisFormat %H:%M
`;
	chartDefinition += createSchedule(man, curr);
	//console.log(chartDefinition, "chart")
	await dispatch(loadOne(chartDefinition));

	return chartDefinition;
};

const initialState = {};

const ChartReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_ONE:
			const allCharts = {};
			//console.log(action, "actions");
			if (action.chart) {
				//console.log("actions_woork", action);
				return action.chart;
			} else
				return {
					...allCharts,
					...state,
				};
		default:
			return state;
	}
};

export default ChartReducer;

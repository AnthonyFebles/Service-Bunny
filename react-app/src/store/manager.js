import { csrfFetch } from "./csrf";

const LOAD = "manager/LOAD";
const CREATE = "manager/CREATE";
const UPDATE = "manager/UPDATE";
const DELETE = "manager/DELETE";

const load = (list) => ({
	type: LOAD,
	list,
});

const create = (managerPayLoad) => ({
	type: CREATE,
	managerPayLoad,
});

const update = (managerPayLoad) => ({
	type: UPDATE,
	managerPayLoad,
});

const remove = (managerId) => ({
	type: DELETE,
	managerId,
});

export const getManagers = () => async (dispatch) => {
	const res = await fetch("/api/manager/");

	if (res.ok) {
		const list = await res.json();
		//console.log(list, "This is the list **********");
		dispatch(load(list));
	}

	return res;
};

export const createNewManager = (managerPayload) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/manager/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(managerPayload),
		});

		if (response.ok) {
			// console.log("res is ok?", response)
			const newManager = await response.json();
			dispatch(create(newManager));
			return newManager;
		}
	} catch (error) {
		const res = await error.json();
		// console.log("res not ok")
		// console.log(res, "this is the res ************")
		//console.log(res, "error")
		throw res;
	}
};

export const updateManager = (managerPayLoad, id) => async (dispatch) => {
	try {
		const response = await fetch(`/api/manager/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(managerPayLoad),
		});

		if (response.ok) {
			//console.log("res is ok?")
			const updatedManager = await response.json();
			dispatch(update(managerPayLoad));
			return updatedManager;
		}
	} catch (error) {
		const res = await error.json();
		//console.log(res, "error")
		throw res;
	}
};

export const deleteManager = (managerId) => async (dispatch) => {
	try {
		const res = await csrfFetch(`api/manager/${managerId}`, {
			method: "DELETE",
		});

		if (res.ok) {
			const manager = await res.json();
			dispatch(remove(managerId));
			return manager;
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
		.sort((ManagerA, ManagerB) => {
			return ManagerA.id - ManagerB.id;
		})
		.map((Manager) => Manager.id);
};

const ManagersReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD:
			//console.log(action, "console log the action")
			const allManagers = {};
			if (action.list) {
				action.list.forEach((manager) => {
					allManagers[manager.id] = manager;
				});
				//console.log(action, "load action");

				return {
					...allManagers,

					list: sortList(action.list),
				};
			} else
				return {
					...allManagers,
					...state,
				};
		case DELETE:
			const newState = { ...state };
			// console.log(newState, "new state")
			// console.log(action, "action")
			delete newState[action.managerId];
			// console.log(newState, "new state after del");
			return newState;

		default:
			return state;
	}
};

export default ManagersReducer;

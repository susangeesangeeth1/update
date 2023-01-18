import * as t from "../types";

import swal from "sweetalert";
export const setModalOpen = (isModalOpen) => {
	return {
		type: t.MODAL_OPEN,
		payload: isModalOpen,
	};
};

export const fetchEmployees = () => {
	return {
		type: t.EMPLOYEE_FETCH_REQUESTED,
	};
};

export const addEmployee = (employee) => {
	swal({
		title: "Successfuly Added",
		icon: "success",
		dangerMode: true,
	});
	return {
		type: t.EMPLOYEE_ADD_REQUESTED,
		payload: employee,
	};
};

export const updateEmployee = (employee) => {
	swal({
		title: "Successfuly Updated",
		icon: "success",
		dangerMode: true,
	});
	return {
		type: t.EMPLOYEE_UPDATE_REQUESTED,
		payload: employee,
	};
};

export const deleteEmployee = (id) => {
	swal({
		title: "Successfuly Deleted",
		icon: "success",
		dangerMode: true,
	});
	return {
		type: t.EMPLOYEE_DELETE_REQUESTED,
		payload: id,
	};
};

export const setSelectedEmployee = (id) => {
	return {
		type: t.EMPLOYEE_SELECTED,
		payload: id,
	};
};

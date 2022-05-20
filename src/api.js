import axios from 'axios';

const url = 'http://93.95.97.34/api';

// export let responseData = {};
export let authUserId = '';
export const getLogIn = (data, cb) => {
	return	axios.post(`${url}/users/login`, {...data})
			.then(response => {
				if(response.status === 200) {
					// responseData = response;
					localStorage.setItem('authUserId', response.data.id)
					cb(true);
				}
			})
}	

// Tasks
export const getTasks = (data) => {
	return axios.post(`${url}/tasks`, data)
}

export const getTask = (id) => {
	return axios.get(`${url}/tasks/${id}`)
}

export const addOrEditTask = (data) => {
	return axios.put(`${url}/tasks/createOrEdit`, data)
}

export const addTaskWorktime = (id, data) => {
	return axios.patch(`${url}/tasks/${id}/worktime`, data)
}

export const changeTaskStatus = (id, status) => {
	return axios.patch(`${url}/tasks/${id}/status/${status}`)
}

export const deleteTask = (id) => {
	return axios.delete(`${url}/tasks/${id}`)
}

// Users
export const getAllUsers = () => {
	return axios.get(`${url}/users/all`)
}

export const getUsers = (data) => {
	return axios.post(`${url}/users`, data)
}

export const getUser = (id) => {
	return axios.get(`${url}/users/${id}`)
}

export const editUser = (data) => {
	return axios.put(`${url}/users/edit`, data)
}

// Comments
export const getComments = (id) => {
	return axios.get(`${url}/comments/${id}`)
}

export const addOrEditComment = (data) => {
	return axios.put(`${url}/comments/createOrEdit`, data)
}

export const deleteComment = (id) => {
	return axios.delete(`${url}/comments/${id}`)
}

// const deleteUs = () => {
// 	return axios.delete('http://93.95.97.34/api/users/627b7cd4ed9ba9598dc06afa')
// }

// deleteUs();





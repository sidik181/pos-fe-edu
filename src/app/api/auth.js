import axios from 'axios';

const API_URL = import.meta.env.VITE_BE_URI;

export const loginUser = async data => {
	return await axios.post(`${API_URL}/api/login`, data, {
		withCredentials: true,
	});
};

export const getProfile = async () => {
	return axios.get('/api/profile', {
		withCredentials: true
	});
};

export const refreshTokenAPI = async () => {
	return await axios.post(`${API_URL}/api/session-token`, {}, {
		withCredentials: true
	});
};

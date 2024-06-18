import axios from 'axios'

const API_URL = import.meta.env.VITE_BE_URI;

export const getOrder = async () => {
	return await axios.get(`${API_URL}/api/order`, {
		withCredentials: true
	});
}

export const addOrder = async data => {
	return await axios.post(`${API_URL}/api/order`, data, {
		withCredentials: true
	});
}

export const approveOrRejectOrder = async (idTransaction, statusTransaction) => {
	return await axios.put(`${API_URL}/api/order-status/${idTransaction}`, {statusTransaction}, {
		withCredentials: true
	});
}
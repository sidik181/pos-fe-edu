import axios from 'axios'

const API_URL = import.meta.env.VITE_BE_URI;

export const getProducts = async () => {
	return await axios.get(`${API_URL}/api/products`, {
		withCredentials: true
	});
}

export const addProduct = async data => {
	return await axios.post(`${API_URL}/api/products`, data, {
		withCredentials: true
	});
}

export const deleteProduct = async idProduct => {
	return await axios.delete(`${API_URL}/api/products/${idProduct}`, {
		withCredentials: true
	});
}
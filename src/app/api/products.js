import apiInstance from '../../hooks/apiInstance';

const API_URL = import.meta.env.VITE_BE_URI;

export const getProducts = async () => {
	return await apiInstance.get(`${API_URL}/api/products`);
}

export const addProduct = async data => {
	return await apiInstance.post(`${API_URL}/api/products`, data);
}

export const deleteProduct = async idProduct => {
	return await apiInstance.delete(`${API_URL}/api/products/${idProduct}`);
}
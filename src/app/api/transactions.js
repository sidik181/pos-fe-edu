import apiInstance from '../../hooks/apiInstance';

const API_URL = import.meta.env.VITE_BE_URI;

export const getOrder = async () => {
	return await apiInstance.get(`${API_URL}/api/order`);
}

export const addOrder = async data => {
	return await apiInstance.post(`${API_URL}/api/order`, data);
}

export const approveOrRejectOrder = async (orderId, status) => {
	return await apiInstance.put(`${API_URL}/api/order-status/${orderId}`, {
    statusTransaction: status,
  });
}
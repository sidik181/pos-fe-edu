import apiInstance from "../../hooks/apiInstance";

const API_URL = import.meta.env.VITE_BE_URI;

export const getProfile = async () => {
  return apiInstance.get(`${API_URL}/api/profile`);
};

export const getCashier = async () => {
  return apiInstance.get(`${API_URL}/api/cashier`);
};

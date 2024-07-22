import axios from "axios";

const API_URL = import.meta.env.VITE_BE_URI;

export const loginUser = async (data) => {
  return await axios.post(`${API_URL}/api/login`, data, {
		withCredentials: true
	});
};

export const refreshAccessToken = async () => {
  return await axios.post(
    `${API_URL}/api/refresh-token`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const logoutUser = async () => {
  return await axios.post(
    `${API_URL}/api/logout`,
    {},
    {
      withCredentials: true,
    }
  );
};

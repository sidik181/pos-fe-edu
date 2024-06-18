import { jwtDecode } from 'jwt-decode';

export const getErrorMessage = error => {
	if (error.response && error.response.data && error.response.data.message) {
		return error.response.data.message;
	}
	return error.message || 'Something went wrong';
};

export const formatPrice = price => {
	const rupiah = new Intl.NumberFormat('id', {
		style: 'currency',
		currency: 'IDR',
		maximumFractionDigits: 0
	}).format(price);
	return rupiah;
};

export const isTokenExpired = (token) => {
	if (!token) return true;

	try {
		const decoded = jwtDecode(token);
		const currentTime = Date.now() / 1000;

		if (decoded.exp < currentTime) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error("Failed to decode token:", error);
		return true;
	}
};



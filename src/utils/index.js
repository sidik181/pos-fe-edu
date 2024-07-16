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

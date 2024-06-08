import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: [],
	currentPage: 0,
	pageSize: 5,
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setData: (state, action) => {
			state.data = action.payload;
		},
		nextPage: (state) => {
			if ((state.currentPage + 1) * state.pageSize < state.data.length) {
				state.currentPage += 1;
			}
		},
		previousPage: (state) => {
			if (state.currentPage > 0) {
				state.currentPage -= 1;
			}
		},
		setPageSize: (state, action) => {
			state.pageSize = action.payload;
		},
	},
});

export const { setData, nextPage, previousPage, setPageSize } = productSlice.actions;

export default productSlice.reducer;

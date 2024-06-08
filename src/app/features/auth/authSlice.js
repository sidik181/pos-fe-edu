import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: 'auth',
	initialState: localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : { user: null, accessToken: null },
	reducers: {
		userLogin: (state, action) => {
			const { user, accessToken } = action.payload;
			state.user = user;
			state.accessToken = accessToken;
			localStorage.setItem('accessToken', JSON.stringify({ user, accessToken }));
		},
		userLogout: (state) => {
			localStorage.removeItem('accessToken');
			state.user = null;
			state.token = null;
		},
	},
})
export const { userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer
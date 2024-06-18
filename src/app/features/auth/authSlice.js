import { createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie'

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		isValid: true
	},
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		},
		logout: (state) => {
			Cookies.remove('token');
			state.user = null;
			state.accessToken = null;
		},
		setAccessToken(state, action) {
			state.accessToken = action.payload;
		},
	},
})
export const { setUser, logout, setAccessToken } = authSlice.actions;

export default authSlice.reducer
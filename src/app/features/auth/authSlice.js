import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshToken } from "./authService";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    accessTokenExpiresAt: null,
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.accessTokenExpiresAt = action.payload.accessTokenExpiresAt;
        state.user = action.payload.user;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.accessTokenExpiresAt = action.payload.accessTokenExpiresAt;
        state.user = action.payload.user;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.accessToken = null;
        state.accessTokenExpiresAt = null;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        state.accessTokenExpiresAt = null;
        state.user = null;
        state.status = "idle";
        state.error = null;
      });
  },
});

export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;

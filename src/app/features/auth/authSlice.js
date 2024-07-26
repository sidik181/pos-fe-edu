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
        state.status = "succeeded";
      })
      .addCase(refreshToken.rejected, (state) => {
        state.accessToken = null;
        state.accessTokenExpiresAt = null;
        state.user = null;
        state.status = "idle"; 
      })
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        state.accessTokenExpiresAt = null;
        state.user = null;
        state.status = "logout";
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        state.accessToken = null;
        state.accessTokenExpiresAt = null;
        state.user = null;
        state.status = "logout";
        state.error = null;
      });
  },
});

export default authSlice.reducer;

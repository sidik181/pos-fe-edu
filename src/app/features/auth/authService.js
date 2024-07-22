import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, refreshAccessToken } from "../../api/auth";

export const login = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const response = await loginUser(values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshAccessToken();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUser();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../../config";  

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
};


export const registerUser = createAsyncThunk("/auth/register",
  async (sendData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, sendData, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration Failed"
      );
    }
  }
);


export const loginUser = createAsyncThunk("/auth/login",
  async (sendData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, sendData, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login Failed"
      );
    }
  }
);

export const checkAuth = createAsyncThunk("/auth/check-auth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/auth/check-auth`, {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-store,no-cache,must-revalidate,proxy-revalidate",
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Auth Check Failed"
      );
    }
  }
);


export const logoutUser = createAsyncThunk("/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/auth/logout`, {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-store,no-cache,must-revalidate,proxy-revalidate",
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout Failed"
      );
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending,(state)=>{
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated =  true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = true ;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;

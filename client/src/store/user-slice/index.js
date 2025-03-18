import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../../config";

export const getAllServices = createAsyncThunk(
  "user/services",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/services`, {
      });
      
     
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Service creation failed");
    }
  }
);

const serviceSlice = createSlice({
  name: "userView",
  initialState: {
    isLoading: false,
    services: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload.data || [];
        
      })
      .addCase(getAllServices.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default serviceSlice.reducer;

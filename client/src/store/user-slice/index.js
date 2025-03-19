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
export const getSpecificService = createAsyncThunk(
  "user/:id",
  async (id , { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/serviceDetail/${id}`, {
      });
      
     
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Service creation failed");
    }
  }
);

export const sentBookRequest = createAsyncThunk(
  "book/:id",
  async ({serviceId,formData}, { rejectWithValue }) => {
    try {
      console.log("It's working")
      const response = await axios.post(`${API_URL}/user/book/${serviceId}`,formData,{
        withCredentials:true
      });      
     
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Service creation failed");
    }
  }
);


export const getAllRequests = createAsyncThunk(
  "user/account",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id)
      const response = await axios.post(`${API_URL}/user/account`,{id},{
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
    specificService:[],
    booking : [],
    requests : []
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
      })

      .addCase(getSpecificService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpecificService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.specificService = action.payload.data || [];
        console.log(state.specificService)
      })

      .addCase(getSpecificService.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(sentBookRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sentBookRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.booking = action.payload.data || [];
      })
      .addCase(sentBookRequest.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getAllRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requests = action.payload.data || [];
        console.log(state.requests,"from asynchthunk")
      })
      .addCase(getAllRequests.rejected, (state) => {
        state.isLoading = false;
      })

      
  },
});

export default serviceSlice.reducer;

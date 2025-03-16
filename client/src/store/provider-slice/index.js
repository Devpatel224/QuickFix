import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../../config";  

export const createService = createAsyncThunk(
    "service/createService",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/service-provider/create-service`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Service creation failed");
        }
    }
);

export const getServices = createAsyncThunk(
    "service/getServices",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/services`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Fetching services failed");
        }
    }
);

const serviceSlice = createSlice({
    name: "service",
    initialState: {
        isLoading: false,
        services: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.services.push(action.payload);
            })
            .addCase(createService.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getServices.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.services = action.payload;
            })
            .addCase(getServices.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default serviceSlice.reducer;

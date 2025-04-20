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
    async ( id , { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/service-provider/get-services/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Fetching services failed");
        }
    }
);

export const deleteService = createAsyncThunk(
    "service/deleteService",
    async ( id , { rejectWithValue }) => {
        try {
            console.log("Delete Service:", id);
            const response = await axios.delete(`${API_URL}/service-provider/delete-service/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Fetching services failed");
        }
    }
);

export const getBookings = createAsyncThunk(
    "/dashboard",
    async ( _ , { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/service-provider/dashboard`,{
                withCredentials : true
            }); 
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Fetching services failed");
        }
    }
);

export const statusChange = createAsyncThunk(
    "dashboard/booking",
    async ({bookingId,statusType , statusValue}, { rejectWithValue }) => {
        try {
            console.log(bookingId)
            const response = await axios.post(`${API_URL}/service-provider/dashboard/booking/${bookingId}`, {[statusType]:statusValue,});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Service creation failed");
        }
    }
);

export const setDates = createAsyncThunk(
    "dashboard/setDates",
    async ({id,unavailableDates}, { rejectWithValue }) => {
        try {            
            const response = await axios.post(`${API_URL}/service-provider/account/setDates/${id}`, {unavailableDates});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Service creation failed");
        }
    }
);
export const getDates = createAsyncThunk(
    "dashboard/getDates",
    async (id, { rejectWithValue }) => {
        try {            
            const response = await axios.get(`${API_URL}/service-provider/account/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Service creation failed");
        }
    }
);


const serviceSlice = createSlice({
    name: "service",
    initialState: {
        isLoading: false,
        providerServices: [],
        bookings:[],
        unavailableDates:[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.providerServices.push(action.payload);
            })
            .addCase(createService.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getServices.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.isLoading = false;
                
                state.providerServices = action.payload.data || [];
            })
            .addCase(getServices.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(deleteService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteService.fulfilled, (state) => {
                state.isLoading = false;                
            })
            .addCase(deleteService.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(getBookings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.isLoading = false;  
                state.bookings =  action.payload.data;             
            })
            .addCase(getBookings.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(statusChange.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(statusChange.fulfilled, (state, action) => {
                state.isLoading = false;  
                const updatedBooking = action.payload.data;
                state.bookings = state.bookings.map((booking) =>
                    booking._id === updatedBooking._id ? updatedBooking : booking
                );
            })
            .addCase(statusChange.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(setDates.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(setDates.fulfilled,(state,action)=>{
                state.isLoading = false; 
                state.unavailableDates = action.payload.data || [];
            })
            .addCase(setDates.rejected, (state) => {
                state.isLoading = false;
            })


            .addCase(getDates.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDates.fulfilled,(state,action)=>{
                state.isLoading = false; 
                state.unavailableDates = action.payload.data || [];
            })
            .addCase(getDates.rejected, (state) => {
                state.isLoading = false;
            })
    },
});

export default serviceSlice.reducer;

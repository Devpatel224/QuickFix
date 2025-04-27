import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import API_URL from "../../../config"; 

const initialState = {
    isLoading : false,
    dashboardStates : null,
    providers : null,
}

export const getDashboardStats = createAsyncThunk("/dashboard-stats", 
    async(_,{rejectWithValue})=>{
        try{
              const res = await axios.get(`${API_URL}/admin/dashboard-stats`);
                
              return res.data;
        }catch(error){
            return rejectWithValue(
                error.response?.data?.message || "Some Error Occurs"
              );
        }
    }
)
export const getProviders = createAsyncThunk("/providers", 
    async(_,{rejectWithValue})=>{
        try{
              const res = await axios.get(`${API_URL}/admin/providers`);
               
              return res.data;
        }catch(error){
            return rejectWithValue(
                error.response?.data?.message || "Some Error Occurs"
              );
        }
    }
)

export const deleteProvider = createAsyncThunk("/provider/:id", 
    async({id},{rejectWithValue})=>{
        try{
             console.log(id,"from async thunk")
              const res = await axios.delete(`${API_URL}/admin/provider/${id}`);

              return res.data;
        }catch(error){
            return rejectWithValue(
                error.response?.data?.message || "Some Error Occurs"
              );
        }
    }
)

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
         builder
         .addCase(getDashboardStats.pending,(state)=>{
            state.isLoading = true;
         })
         .addCase(getDashboardStats.fulfilled,(state,action)=>{
            state.isLoading = false;
            
            state.dashboardStates = action.payload
         })
         .addCase(getDashboardStats.rejected,(state)=>{
            state.isLoading = false;
         })

         .addCase(getProviders.pending,(state)=>{
            state.isLoading = true;
         })
         .addCase(getProviders.fulfilled,(state,action)=>{
            state.isLoading = false;
           
            state.providers = action.payload
         })
         .addCase(getProviders.rejected,(state)=>{
            state.isLoading = false;
         })

         .addCase(deleteProvider.pending,(state)=>{
            state.isLoading = true;
         })
         .addCase(deleteProvider.fulfilled,(state)=>{
            state.isLoading = false;
         })
         .addCase(deleteProvider.rejected,(state)=>{
            state.isLoading = false;
         })

    }
})

export default adminSlice.reducer
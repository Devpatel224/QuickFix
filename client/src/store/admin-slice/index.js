import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import API_URL from "../../../config"; 

const initialState = {
    isLoading : false,
    dashboardStates : null
}

export const getDashboardStats = createAsyncThunk("/dashboard-stats", 
    async(_,{rejectWithValue})=>{
        try{
              const res = await axios.get(`${API_URL}/admin/dashboard-stats`);
                console.log(res,"from asyncthunk");
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
            console.log(action.payload , "from extrareducer")
            state.dashboardStates = action.payload
         })
         .addCase(getDashboardStats.rejected,(state)=>{
            state.isLoading = false;
         })

    }
})

export default adminSlice.reducer
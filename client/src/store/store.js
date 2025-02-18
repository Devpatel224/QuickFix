import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : true,
    isAuthenticate : false,
    user : null
}

const registerUser = createAsyncThunk("/auth/register",
    async ({formData,isRejectedWithValue})=>{
        try{
        //   const res = await axios.post("")
        }
        catch(error){

        }
    }
)


const authSlice = createSlice({
    name : auth,
    initialState : initialState,
    reducers : {},

})
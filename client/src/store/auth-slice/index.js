import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading : false,
    isAuthenticated : false,
    user : null
}

export const  registerUser = createAsyncThunk("/auth/register",
    async (sendData,{rejectWithValue})=>{
        try{
          const res = await axios.post("http://localhost:3000/auth/register",sendData,{
            withCredentials : true
          })

          
          return res.data;
        }
        catch(error){
            if(error.response && error.response.data){
                return rejectWithValue(error.response.data.message || "Registration Fails")
            }else{
                return rejectWithValue("Some Error Occurs")
            }
        }   
    }
)

export const  loginUser = createAsyncThunk("/auth/login",
    async (sendData,{rejectWithValue})=>{
        try{
          const res = await axios.post("http://localhost:3000/auth/login",sendData,{
            withCredentials : true
          })

          console.log(res.data)
          return res.data;
        }
        catch(error){
            if(error.response && error.response.data){
                return rejectWithValue(error.response.data.message || "Registration Fails")
            }else{
                return rejectWithValue("Some Error Occurs")
            }
        }   
    }
)

 export const  checkAuth = createAsyncThunk("/auth/check-auth",
        async (_,{rejectWithValue})=>{
            try{
                
            const res = await axios.get("http://localhost:3000/auth/check-auth",{
                withCredentials : true,
                headers:{
                    'Cache-Control' : 'no-store,no-cache,must-revalidate,proxy-revalidate'
                },
            })        
            return res.data;
            }
            catch(error){   
                if(error.response && error.response.data){
                    return rejectWithValue(error.response.data.message || "Registration Fails")
                }else{
                    return rejectWithValue("Some Error Occurs")
                }
            }   
        }
    )
 export const  logoutUser = createAsyncThunk("/auth/logout",
        async (_,{rejectWithValue})=>{
            try{
                
            const res = await axios.get("http://localhost:3000/auth/logout",{
                withCredentials : true,
                headers:{
                    'Cache-Control' : 'no-store,no-cache,must-revalidate,proxy-revalidate'
                },
            })        
            return res.data;
            }
            catch(error){   
                if(error.response && error.response.data){
                    return rejectWithValue(error.response.data.message || "Registration Fails")
                }else{
                    return rejectWithValue("Some Error Occurs")
                }
            }   
        }
    )






const authSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading  = false
            state.user = null
            state.isAuthenticated = false
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        })
       
        .addCase(loginUser.pending,(state)=>{
            
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading  = false
            state.user = action.payload.success ? action.payload.user : null
            state.isAuthenticated = action.payload.success
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        })
        
        .addCase(checkAuth.pending,(state)=>{
            state.isLoading = true
        }).addCase(checkAuth.fulfilled,(state,action)=>{
            state.isLoading  = false
            state.user = action.payload.success ? action.payload.user : null
            state.isAuthenticated = action.payload.success
        }).addCase(checkAuth.rejected,(state,action)=>{
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        })
        
        .addCase(logoutUser.fulfilled,(state,action)=>{
            state.isLoading  = false
            state.user =  null
            state.isAuthenticated = false
        })

        
    }
})


export default authSlice.reducer

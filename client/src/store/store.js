import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import serviceReducer from "./provider-slice"
import userViewReducer from "./user-slice"

const store = configureStore({
   reducer : {
    auth : authReducer,
    service : serviceReducer,
    userView : userViewReducer
   }
})

export default store
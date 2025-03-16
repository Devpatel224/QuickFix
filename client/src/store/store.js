import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import serviceReducer from "./provider-slice"

const store = configureStore({
   reducer : {
    auth : authReducer,
    service : serviceReducer
   }
})

export default store
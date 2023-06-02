
//create store
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './slices/loginslice'

export const store=configureStore({
    reducer:{
        login:loginReducer
    }
})
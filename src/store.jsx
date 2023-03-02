import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import navSlice from "./navSlice";


export const store = configureStore({
    reducer:{
        data:dataSlice,
        nav:navSlice,
    }
}) 

 


import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name:"nav",
    initialState:{
        openMenu: false
    },
    reducers:{
        toggleMenu:(state) => {
            state.openMenu = !state.openMenu
        }
    }
})

export const {toggleMenu} = navSlice.actions 
export default navSlice.reducer 
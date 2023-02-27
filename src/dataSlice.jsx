import { createSlice } from "@reduxjs/toolkit";

const dataslice = createSlice({
    name:'data',
    initialState:{
        totalData:[],
        copyData:[],
        cart:[], 
        toggleSidebar:false
    }, 
    reducers:{
        fetchData:(state, action)=> {
            state = state.totalData.splice(0,1,action.payload)
           
        },
        fetchSearchResult:(state, action)=> {
            state = state.copyData.splice(0,1,action.payload)
           
        },
        toggleSidenav:(state, action) => {
            state.toggleSidebar = !state.toggleSidebar
        },
        addToCart:(state, action) => {
            console.log(action.payload) 
            state = state.cart.push(action.payload)
        },
        increaseQuantity:(state, action)=>{
            console.log(action.payload)
            let count = action.payload.qty + 1
            console.log(count)
            state = state.cart.filter(cart=> cart.product.id === action.payload.product.id ? cart.qty = count  : cart.qty)
        },
        increasecartQuantity:(state, action)=>{
            console.log(action.payload)
            let count = action.payload.qty 
            console.log(count)
            state = state.cart.filter(cart=> cart.product.id === action.payload.cart.product.id ? cart.qty = count  : cart.qty)
        },
        decreasecartQuantity:(state, action)=>{
            console.log(action.payload)
            let count = action.payload.qty
            if(count === 0)
            state.cart = state.cart.filter(cart=> cart.product.id !== action.payload.cart.product.id )
            else 
            state = state.cart.filter(cart=> cart.product.id === action.payload.cart.product.id ? cart.qty = count  : cart.qty)
        },
        decreaseQuantity:(state, action)=>{
            console.log(action.payload)
            let count = action.payload.qty - 1
            console.log(count)
            if(count === 0)
            state.cart = state.cart.filter(cart=> cart.product.id !== action.payload.product.id )
            else
            state = state.cart.filter(cart=> cart.product.id === action.payload.product.id ? cart.qty = count  : cart.qty)
        },
    }
})

export const {fetchSearchResult, fetchData,addToCart, toggleSidenav,
     removeFromCart, increaseQuantity, lowTohigh, decreaseQuantity,increasecartQuantity,decreasecartQuantity} = dataslice.actions  
export default dataslice.reducer
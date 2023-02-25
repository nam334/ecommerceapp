import { createSlice } from "@reduxjs/toolkit";

const dataslice = createSlice({
    name:'data',
    initialState:{
        totalData:[],
        copyData:[],
        cart:[], 
    },
    reducers:{
        fetchData:(state, action)=> {
            state = state.totalData.splice(0,1,action.payload)
           
        },
        fetchSearchResult:(state, action)=> {
            state = state.copyData.splice(0,1,action.payload)
           
        },
        addToCart:(state, action) => {
            console.log(action.payload)
            state = state.cart.push(action.payload)
        },
        // removeFromCart:(state, action) => {
          
        //      state.cart = state.cart.filter(product => product.product.id !==  action.payload)
        // },
        increaseQuantity:(state, action)=>{
            console.log(action.payload)
            let count = action.payload.qty + 1
            console.log(count)
            state = state.cart.filter(cart=> cart.product.id === action.payload.product.id ? cart.qty = count  : cart.qty)
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
        // lowTohigh:(state, action) => {
           
        //     let arr = action.payload
        //     state.totalData[0] = arr.sort((a,b) => a.price - b.price)
        //     console.log(state.totalData)
        // }
    }
})

export const {fetchSearchResult, fetchData,addToCart,
     removeFromCart, increaseQuantity, lowTohigh, decreaseQuantity} = dataslice.actions  
export default dataslice.reducer
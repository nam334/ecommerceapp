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
            state = state.totalData.push(action.payload)
           
        },
        fetchSearchResult:(state, action)=> {
            state = state.copyData.splice(0,1,action.payload)
           
        },
        removeFromCart:(state, action) => {
          
             state.cart = state.cart.filter(product => product.product.id !==  action.payload)
        },
        increaseQuantity:(state, action)=>{
            state = state.cart.push({...action.payload})
        },
        lowTohigh:(state, action) => {
           
            let arr = action.payload
            state.totalData[0] = arr.sort((a,b) => a.price - b.price)
            console.log(state.totalData)
        }
    }
})

export const {fetchSearchResult, fetchData, removeFromCart, increaseQuantity, lowTohigh} = dataslice.actions  
export default dataslice.reducer
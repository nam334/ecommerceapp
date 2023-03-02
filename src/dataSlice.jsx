import { createSlice } from "@reduxjs/toolkit";

const dataslice = createSlice({
    name:'data',
    initialState:{
        totalData:[],
        copyData:[],
        cart:[], 
        toggleSidebar:false ,
        totalPrice:0,
        grandTotal:0
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
            state.totalPrice = state.totalPrice + (action.payload.product.price * action.payload.qty)
            state = state.cart.push(action.payload)
            
        },
        increaseQuantity:(state, action)=>{
            console.log(action.payload) 
            let count = action.payload.qty + 1
            console.log(count)
            
            //state.totalPrice +=  action.payload.product.price * count
            state = state.cart.filter(cart=> cart.product.id === action.payload.product.id ? 
                //(
                 cart.qty = count
                 //,cart.length > 1 ? state.totalPrice =  action.payload.product.price * count)
                : cart.qty)
        },
        increaseQty:(state,action)=>{
            console.log(action.payload.product.price, action.payload.qty,state.cart.length)
            if(state.cart.length === 1){
                state.totalPrice =  action.payload.product.price * (action.payload.qty + 1)
            }
            else{
                state.totalPrice =  state.totalPrice + action.payload.product.price 
            }
            
        },
        increasecartQuantity:(state, action)=>{
           console.log(action.payload) 
            let count = action.payload.qty    
            if(state.cart.length === 1){
                state.totalPrice =  action.payload.cart.product.price * (action.payload.qty)
            }
            else{
                state.totalPrice =  state.totalPrice + action.payload.cart.product.price 
            }
            state = state.cart.filter(cart=> cart.product.id === action.payload.cart.product.id ? cart.qty = count  : cart.qty)
        },
        decreasecartQuantity:(state, action)=>{
            console.log(action.payload)
            let count = action.payload.qty
            if(count === 0) 
            {
                state.totalPrice = state.totalPrice - (action.payload.cart.product.price)
                state.cart = state.cart.filter(cart=> cart.product.id !== action.payload.cart.product.id )
            }
            else {
                state.totalPrice = state.totalPrice - (action.payload.cart.product.price)
            state = state.cart.filter(cart=> cart.product.id === action.payload.cart.product.id ? cart.qty = count  : cart.qty)
           
            }
        },
        decreaseQuantity:(state, action)=>{
            console.log(action.payload)
            let count = action.payload.qty - 1
            console.log(count)
            if(count === 0)
            {
                state.totalPrice = state.totalPrice - (action.payload.product.price)
                state.cart = state.cart.filter(cart=> cart.product.id !== action.payload.product.id )
            }
            else
            {
                state.totalPrice = state.totalPrice - (action.payload.product.price)
                state = state.cart.filter(cart=> cart.product.id === action.payload.product.id ? cart.qty = count  : cart.qty)
            }
        },
       
        calcGrandTotal:(state,action) => {
            console.log(action.payload)
            state.grandTotal = action.payload
        }   
    }
})

export const {fetchSearchResult, fetchData,addToCart, toggleSidenav,calcGrandTotal,calcTotalPrice,
    increaseQty,
     removeFromCart, increaseQuantity, lowTohigh, decreaseQuantity,increasecartQuantity,decreasecartQuantity} = dataslice.actions  
export default dataslice.reducer
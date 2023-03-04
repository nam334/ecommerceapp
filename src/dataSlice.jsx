import { createSlice } from "@reduxjs/toolkit";

const dataslice = createSlice({
    name:'data',
    initialState:{
        totalData:[],
        copyData:[],
        filteredData:[],
        cart:[], 
        toggleSidebar:false ,
        totalPrice:0,
        totalDiscount : 0,
        grandTotal:0
    }, 
    reducers:{
        fetchData:(state, action)=> {
            state = state.totalData.splice(0,1,action.payload)
        },
        fetchSearchResult:(state, action)=> {
            state = state.copyData.splice(0,1,action.payload)
        },
        filterByPrice:(state,action) => {
            console.log(action.payload)
        if(action.payload.rating>0) 
        {
            state.filteredData = state.totalData[0]?.filter(cart =>
            (cart.price >= action.payload.minValue  && cart.price < action.payload.maxValue) &&  cart.rating.rate  >= action.payload.rating )
        }
        else
        state.filteredData = state.totalData[0]?.filter(cart => cart.price >= action.payload.minValue  && cart.price < action.payload.maxValue)
        },

        filterByRating:(state,action) => {
            
        // console.log("before", state.filteredData )
        // state.filteredData = state.totalData[0]?.filter(cart => cart.rating.rate  >= action.payload.rating)
        // console.log("after", state.filteredData )
       
       
        
        },
        toggleSidenav:(state, action) => {
            state.toggleSidebar = !state.toggleSidebar
        },
        addToCart:(state, action) => {
            console.log(action.payload) 
            action.payload.product?.discountRate &&  (state.totalDiscount  = state.totalDiscount + action.payload.product?.discountRate)
            state.totalPrice = state.totalPrice + (action.payload.product.price * action.payload.qty)
            state = state.cart.push(action.payload)
        },
        increaseQuantity:(state, action)=>{
            console.log(action.payload) 
            let count = action.payload.qty + 1

            state = state.cart.filter(cart=> cart.product.id === action.payload.product.id ? 
                //(
                 cart.qty = count
                 //,cart.length > 1 ? state.totalPrice =  action.payload.product.price * count)
                : cart.qty)
        },
        increaseQty:(state,action)=>{
            console.log(action.payload.product.price, action.payload.qty,state.cart.length)
            action.payload.product?.discountRate &&  (state.totalDiscount  = state.totalDiscount + action.payload.product?.discountRate)
            if(state.cart.length === 1){
                state.totalPrice =  action.payload.product.price * (action.payload.qty + 1)
            }
            else{
                state.totalPrice =  state.totalPrice + action.payload.product.price 
            }
            
        },
        increasecartQuantity:(state, action)=>{
           console.log(action.payload) 
           action.payload.cart.product?.discountRate &&  (state.totalDiscount  = state.totalDiscount + action.payload.cart.product?.discountRate)
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
            action.payload.cart?.product?.discountRate &&  (state.totalDiscount  = state.totalDiscount - action.payload.cart?.product?.discountRate)
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
            action.payload.product?.discountRate &&  (state.totalDiscount  = state.totalDiscount - action.payload.product?.discountRate)
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
           state.grandTotal = action.payload.totalPrice - action.payload.totalDiscount
        }   
    }
})

export const {fetchSearchResult, fetchData,addToCart, toggleSidenav,calcGrandTotal,calcTotalPrice,
    increaseQty,filterByPrice,filterByRating,
     removeFromCart, increaseQuantity, lowTohigh, decreaseQuantity,increasecartQuantity,decreasecartQuantity} = dataslice.actions  
export default dataslice.reducer
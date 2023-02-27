import React from 'react'
import { useSelector } from 'react-redux'
import {FaRupeeSign} from "react-icons/fa"

const PaymentDetails = () => {
    const cart = useSelector((store) => store.data.cart)
    console.log(cart)
    let sum = 0
    cart.map((cartItem)=> (
        
        sum += (cartItem.quantity ? cartItem.quantity : 1) * cartItem.product.price
       
    ))
  return ( 
    
    
    <div className='p-4'>
        <h1 className='text-lg font-semibold text-slate-600 my-2 px-2 py-6'>PRICE DETAILS</h1>
        <div className='flex flex-col text-sm font-semibold text-slate-600 px-2 text-md'>
            <div className='flex justify-between py-3'>
             <h1>Price (Total items - {cart.length})</h1>
             <h1 className='flex items-center '><FaRupeeSign/> {sum}</h1>
            </div>
            <div className='flex items-center justify-between py-3'>
             <h1>Discount</h1>
             <h1 className='flex items-center '><FaRupeeSign/> 0</h1>
            </div>
            <div className='flex items-center justify-between font-bold py-3 text-lg'>
             <h1>TOTAL PRICE</h1>
             <h1 className='flex items-center '><FaRupeeSign/> {sum > 0 ? sum : 0}</h1>
            </div>
            <button className='bg-cyan-300 text-slate-700 
       font-medium italic rounded text-sm p-2 my-3 mx-3'>PLACE ORDER</button>
        </div>
    </div>
  )
}

export default PaymentDetails
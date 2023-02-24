import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FaRupeeSign} from "react-icons/fa"
import { AiFillStar } from 'react-icons/ai'
import {MdProductionQuantityLimits} from 'react-icons/md'
import Header from './Header'
import { increaseQuantity, removeFromCart } from '../dataSlice'
import PaymentDetails from './PaymentDetails'
const Cart = () => {
  const cart = useSelector((store) => store.data.cart)
  
  const dispatch = useDispatch()
  // const [qty, setQty] = useState('')
 
  console.log(cart)
  return (
    <div>
      <Header/>
      <div className="grid grid-cols-5">
      <div className=" col-span-3 p-4">
      {
        cart && cart.length > 0 ? cart.map(product => (
        
          <>
      
      <div className="flex p-4 items-center" key={product.product.title}>
         <img src={product.product.image} alt="" className='w-32 h-48 mb-2 ' />
         <div className='card  border-y-2 border-slate-200 p-3 flex flex-col 
         rounded  m-4 mx-2
       text-slate-500'>
        <h2 className='text-sm font-semibold text-slate-600 my-2'>{product.product.title}</h2>
        <h4 className='text-sm'>{product.product.description}</h4>
        <div className="my-2">
        <h4 className='text-sm italic mx-auto flex items-center'> <FaRupeeSign/> {product.product.price}</h4>
        <h4 className='text-sm  italic mx-auto flex items-center'> <AiFillStar/> {product.product.rating && product.product.rating.rate} </h4>
        <h4 className='text-sm  italic mx-auto flex items-center'> <MdProductionQuantityLimits/> {product.quantity ? product.quantity : 1} </h4>
        </div>
        <button type='button' className='bg-red-400 rounded-md text-slate-100 p-1 text-sm mx-2 w-fit' onClick={() => {
                         dispatch(removeFromCart(product.product.id))
                    }}>Remove all items from cart?</button>    
        {/* <div>
          <form>
          <input type='number' placeholder = 'Enter product quantity...'
                className="placeholder:italic placeholder:text-slate-400 
                 bg-white border border-cyan-300 
                 rounded-md py-1  text-sm px-2 w-fit shadow-sm focus:outline-none
               focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 sm:text-sm"
                value={qty}
                onChange={(e)=> setQty(e.target.value)} min="0"
                
                />    
                <button type='button' className='bg-green-400 rounded-md text-slate-100 p-1 text-sm mx-2' onClick={(e) => {
                          e.preventDefault()
                          console.log(product.id, Number(qty))
                          let quantity = Number(qty)
                          let p_id = product.id
                          dispatch(increaseQuantity({p_id,quantity}))
                    }}>Submit</button>

<button type='button' className='bg-red-400 rounded-md text-slate-100 p-1 text-sm mx-2' onClick={() => {
                         dispatch(removeFromCart(product.id))
                    }}>Remove Product</button>    
          </form>
        </div> */}
       </div>
      </div>
      </>
        )) : <h1 className='text-slate-700 text-2xl font-semibold flex items-center justify-center py-6 my-6'>NO PRODUCTS ADDED</h1>
      }
       
      </div>
      <div className="col-span-2">
        <PaymentDetails/>
      </div>
      </div>
      </div>
  )
}

export default Cart
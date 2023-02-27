import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FaRupeeSign} from "react-icons/fa"
import {AiFillStar} from "react-icons/ai"
import {  addToCart, increaseQuantity, removeFromCart, decreaseQuantity } from '../dataSlice'
import { useContext } from 'react'
import ThemeContext from './ThemeContext'
import { discountCalculation } from '../functions'

const Product = ({product}) => {
    console.log(product)
    const dispatch = useDispatch()
    const cart =  useSelector(store => store.data?.cart)
    //console.log(cart?.[0]?.product?.id)
    const {theme} = useContext(ThemeContext)
    const [qty, setQty] = useState(1)
    const [count, setCount] = useState(0)
   
  return (
    <div key={product.id} className={`card w-96 
     border-2 border-slate-300 p-3 flex flex-col 
    items-center rounded  m-4 mx-2 justify-between text-slate-500
    ${theme === "light" ? "bg-white" : "bg-cyan-600 text-slate-100"}`}>

    <img src={product.image} alt="" className='w-28 mb-2 ' /> 
    <h2 className='text-sm font-semibold text-slate-600 my-2'>{product.title}</h2>
    <h4 className='text-sm'>{product.description}</h4>
    <div className="flex items-center justify-between  w-full"> 
    <div className="flex items-center">
    <FaRupeeSign/>
    <h4 className='text-sm py-2 italic'>
         {/* {product.price} */}
         {
          product.discountRate ? <><span className='strike'>{product.price}</span> {discountCalculation(product.price,product.discountRate)} </>: product.price
         }
    </h4>
    </div>
    <div className="flex items-center">
    <AiFillStar/>
    
    </div>
    </div> 
   
    <div className='my-2 flex'>
    <button type='button' className="bg-orange-500 mx-1 text-slate-100 rounded-sm p-2 text-sm cursor-pointer" onClick={(e) => {
                          e.preventDefault()
                          // let quantity = Number(qty)
                          // dispatch(increaseQuantity({product,quantity}))
        }}>Buy now</button>
      {
        count === 0 ? <button type='button' className="bg-yellow-500 mx-1 text-slate-100 rounded-sm p-2 text-sm cursor-pointer" onClick={(e) => {
          e.preventDefault()
          dispatch(addToCart({product,qty:1}))
          setCount((prevCount)=> prevCount + 1)
    }}>Add to cart</button> 
    : 
    <div className="bg-yellow-500 text-slate-100">
            <button type='button' className="bg-yellow-500 mx-1 text-slate-100 rounded-sm p-2 text-sm cursor-pointer"
             onClick={(e) => {
                                e.preventDefault()
                                setCount((prevCount)=> prevCount + 1)
                                setQty(qty + 1)
                                dispatch(increaseQuantity({product, qty}))
                            }}>+</button>
                           {count}
                            <button type='button' className="bg-yellow-500 mx-1 text-slate-100 rounded-sm p-2 text-sm cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              setCount((prevCount)=> prevCount - 1)
              setQty(qty - 1)
              dispatch(decreaseQuantity({product, qty}))
          }}>-</button>
              </div>
      } 
       


    </div>
</div>
  )
}

export default Product
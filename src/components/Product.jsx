import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FaRupeeSign} from "react-icons/fa"
import {AiFillStar} from "react-icons/ai"
import {  addToCart, increaseQuantity, removeFromCart, decreaseQuantity, increaseQty } from '../dataSlice'
import { useContext } from 'react'
import ThemeContext from './ThemeContext'
import { discountCalculation } from '../functions'
import ShowMoreText from "react-show-more-text";

const Product = ({product}) => {
   
    const dispatch = useDispatch()
    const cart =  useSelector(store => store.data?.cart)
   
    const {theme} = useContext(ThemeContext)
    const [qty, setQty] = useState(1)
    const [count, setCount] = useState(0)
   
  return (
    <div key={product.id} className={`card w-80
     p-3 flex flex-col 
     hover:bg-cyan-6000 cursor-pointer
    items-center rounded-xl m-4 mx-2 justify-between text-slate-500 fira-sans
    ${theme === "light" ? "bg-cyan-600 " : "bg-cyan-600 text-slate-200"}`}>
    <div className='rounded-md p-4 bg-white'>
    <img src={product.image} alt="" className='w-28 mb-2 h-36 ' /> 
    </div>
    <h2 className='text-sm font-semibold text-slate-600 my-2'>{product.title}</h2>
    
    <ShowMoreText
                /* Default options */
                lines={3}
                more="Show more"
                less="Show less"
                className="content-css text-sm"
                anchorClass="showMoreText cursor-pointer"
                //onClick={this.executeOnClick}
                expanded={false}
                // width={280}
                //truncatedEndingComponent={"... "}
               // className='text-sm'
            >
              <h4 >
      {product.description}</h4>
      </ShowMoreText>
    <div className="flex items-center justify-between  w-full"> 
    <div className="flex items-center">
    <FaRupeeSign/>
    <h4 className='text-sm py-2 text-black-200 font-bold'>
         {/* {product.price} */}
         {
          product.discountRate ? <>
          <span className='strike mr-1'>{product.price}</span> 
          {discountCalculation(product.price,product.discountRate)} </>
          : <span className=''>{product.price}</span>
         }
    </h4>
    </div>
    <div className="flex items-center">
    <AiFillStar/>
    
    </div>
    </div> 
   
    <div className='my-2 flex'>
    <button type='button' className="bg-cyan-800 mx-1 text-slate-200 rounded-md p-2 text-sm cursor-pointer" onClick={(e) => {
                          e.preventDefault()
                          // let quantity = Number(qty)
                          // dispatch(increaseQuantity({product,quantity}))
        }}>Buy now</button>
      {
        count === 0 ? <button type='button' className="bg-yellow-500 mx-1
         text-slate-200 rounded-md p-2 text-sm cursor-pointer" onClick={(e) => {
          e.preventDefault()
          dispatch(addToCart({product,qty:1}))
          setCount((prevCount)=> prevCount + 1)
    }}>Add to cart</button> 
    : 
    <div className="bg-yellow-500 text-slate-200 rounded-md ">
            <button type='button' className="bg-yellow-500 mx-1 text-slate-200
             rounded-md p-2 text-sm cursor-pointer"
             onClick={(e) => {
                                e.preventDefault()
                                setCount((prevCount)=> prevCount + 1)
                                setQty(qty + 1)
                                dispatch(increaseQuantity({product, qty}))
                                dispatch(increaseQty({product,qty}))
                             }}>+</button>
                           {count}
                            <button type='button' className="bg-yellow-500 mx-1 
                            text-slate-200 rounded-md p-2 text-sm cursor-pointer"
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
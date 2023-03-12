import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FaRupeeSign} from "react-icons/fa"
import {AiOutlinePlus} from "react-icons/ai"
import {BsCart4} from "react-icons/bs"
import {AiFillStar} from "react-icons/ai"
import {  addToCart, increaseQuantity, removeFromCart, decreaseQuantity, increaseQty } from '../dataSlice'
import { useContext } from 'react'
import ThemeContext from './ThemeContext'
import { discountCalculation } from '../functions'
import ShowMoreText from "react-show-more-text";
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import {ratingColorCalculation} from '../functions'
import { useNavigate } from 'react-router-dom'
import Star from './Star'

// const Icon = styled(AiFillStar)`
//   overflow: hidden;
//   filter: brightness(${ratingColorCalculation(product?.rating?.rate,5)}%);
//   `;
const Product = ({product}) => {
    const dispatch = useDispatch()
    const cart =  useSelector(store => store.data?.cart)
    
    const {theme} = useContext(ThemeContext) 
    const [qty, setQty] = useState(1)
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    const cardVariants = {
      hover: {
        //scale: 1.5,
        scale: 1.02,
        textShadow: "0px 0px 8px rgb(255,255,255)",
        //boxShadow: "0px 0px 8px rgb(255,255,255)",
        transition: {
          repeatType: "mirror",
          repeat: 1,
        }
      }
    }
   // ${theme === "light" ? "bg-cyan-600 " : "bg-cyan-600 text-slate-200"}` 
  return (
    <motion.div key={product.id} className={`card w-80   
     p-3 flex flex-col 
     hover:bg-slate-200
    items-center  m-4 mx-2 justify-between text-slate-500 fira-sans 
    bg-slate-50 rounded-md
    `
    }  
    variants={cardVariants}
          whileHover="hover"
    >
    <div className=' p-4  cursor-pointer  flex justify-center items-center  
    ' onClick={()=> navigate(`/product/${product.id}`)}>
       <h2 className='text-sm font-semibold text-slate-600 my-2'>{product.title}</h2>
    <img src={product.image} alt="" className='w-28 mb-2 h-36 ' /> 
    </div>
   
    
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
              {/* <h4>{product.description}</h4> */}
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
    <h4 className='text-sm py-2 text-black-200 font-semibold'>{product?.rating?.rate}</h4>
    {/* <AiFillStar className='ratingStar' fill="red" /> */}
    {/* <Icon fill="#FF007F"/> */}
    <Star rating = {product?.rating?.rate} />
    </div>
    </div> 
   
    <div className=' flex items-center'>
    <button type='button' className="bg-slate-500 mx-1 text-slate-50 
    rounded-full p-2 text-sm cursor-pointer font-bold " onClick={(e) => {
                          e.preventDefault()
                          // let quantity = Number(qty)
                          // dispatch(increaseQuantity({product,quantity}))
        }}> <BsCart4 className='font-bold'/></button>
      {
        count === 0 ? <button type='button' className="bg-yellow-500 mx-1
         text-slate-50 font-bold rounded-full w-8 h-8 text-sm  
         cursor-pointer flex justify-center items-center" onClick={(e) => {
          e.preventDefault()
          dispatch(addToCart({product,qty:1}))
          setCount((prevCount)=> prevCount + 1)
    }}><AiOutlinePlus className='font-bold'/></button> 
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
</motion.div>
  )
}

export default Product
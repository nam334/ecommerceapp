import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import {FaRupeeSign} from "react-icons/fa"
import Header from './Header'
import { addToCart, decreaseQuantity, increaseQty, increaseQuantity } from '../dataSlice'
const ProductDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const totalData = useSelector(store => store.data.totalData)
    const product = totalData[0]?.filter(product => product.id === Number(params.id))
    const [qty, setQty] = useState(1)
    const [count, setCount] = useState(0)
    console.log(product)
  return (
    <>
   <Header/>
   <div className='px-4'>
   <div className='text-sm font-semibold text-slate-600 my-2 py-4'>
        <Link className='px-3' to='/'>Home </Link><span className='px-3'>-</span><span className='px-3'>{product[0].title}</span>
    </div>
  <div className="grid grid-cols-4 gap-4">
  <div className='cursor-pointer
   rounded-xl bg-cyan-600
    '>
    <img src={product[0]?.image} alt="product images" className='p-6'/>
  </div>
  <div className="col-span-2 flex flex-col gap-5 px-2">
    <span className='text-sm font-semibold text-slate-600'>Visit the store</span>
    <h1 className='text-3xl font-semibold text-cyan-800 '>{product[0]?.title}</h1>
    <span className='text-sm font-semibold text-slate-500 flex items-center'><AiFillStar/> {product[0]?.rating.rate} Ratings</span>
    <span className='text-sm font-semibold text-slate-600'>Description</span>
    <h3 className='text-sm font-semibold text-slate-500'>{product[0]?.description}</h3>
  </div>
  <div className="flex flex-col shadow-md p-4">
  <span className='text-sm font-semibold text-slate-600'>Place order</span>
  <div className='flex items-center py-2 border-gray-100'>
                <img  src={product[0]?.image} alt="product" className='w-16 h-20 
                border
                 border-gray-200 p-2'/>
                <div className='flex gap-3 flex-col  justify-center '>
                  <h4 className='text-xs p-1'>{product[0]?.title}</h4>
                  <div className='flex justify-between items-end'>
                  <h4 className='text-sm py-2 text-black-200 flex justify-center items-center'>
                  {/* <FaRupeeSign/>{product[0]?.price} */}
                  <h5 className='text-xs p-1'>Category - {product[0]?.category}</h5>
                  </h4>
                  </div>
                </div>
        </div>
        <div className='flex justify-between font-semibold  text-slate-500  text-sm py-2'>
                  <h4 className='text-sm'>MRP</h4>
                  <span  className='flex items-center'>
                   <FaRupeeSign/>{product[0]?.price}
                   </span>
                  </div>
                  <div className='flex justify-between font-semibold  text-slate-500  text-sm py-2'>
                  <h4 className='text-sm'>Total Discount Rate</h4>
                  <span  className='flex items-center '>
                  <FaRupeeSign/> {product[0]?.discountRate ?  product[0]?.discountRate : 0}
                   </span>
                  </div>
                  <div className='flex justify-between font-semibold text-slate-500 py-2'>
                  <h4 className='text-sm'>Total price</h4>
                  <span  className='flex items-center text-cyan-800 text-lg'>
                   <FaRupeeSign/>{product[0]?.discountRate ?  product[0]?.price - product[0]?.discountRate : product[0]?.price }
                   </span>
                  </div>
                  <div className='flex flex-col gap-2 my-6'>
                  <button type='button' className="bg-cyan-800 mx-1 text-slate-200 rounded-md 
                  p-2 text-sm cursor-pointer" onClick={(e) => {
                          e.preventDefault()
                    }}>Buy now</button>
                      {
        count === 0 ? <button type='button' className="bg-yellow-500 mx-1
         text-slate-200 rounded-md p-2 text-sm cursor-pointer" onClick={(e) => {
          e.preventDefault()
          let productData = product[0]
          dispatch(addToCart({product:productData,qty:1}))
          setCount((prevCount)=> prevCount + 1)
    }}>Add to cart</button> 
    : 
    <div className="bg-yellow-500 text-slate-200 rounded-md flex justify-evenly items-center">
            <button type='button' className="bg-yellow-500 mx-1 text-slate-200
             rounded-md p-2 text-sm cursor-pointer" 
             onClick={(e) => {
                                e.preventDefault()
                                setCount((prevCount)=> prevCount + 1)
                                setQty(qty + 1)
                                let productData = product[0]
                                dispatch(increaseQuantity({product:productData, qty}))
                                dispatch(increaseQty({product:productData,qty}))
                             }}>+</button>
                           {count}
                            <button type='button' className="bg-yellow-500 mx-1 
                            text-slate-200 rounded-md p-2 text-sm cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              setCount((prevCount)=> prevCount - 1)
              setQty(qty - 1)
              let productData = product[0]
              dispatch(decreaseQuantity({product:productData, qty}))
          }}>-</button>
              </div>
      } 
                  </div>
  </div> 
    </div>
   </div>
    </>
  )
} 

export default ProductDetails 
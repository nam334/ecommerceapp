import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FaRupeeSign} from "react-icons/fa"
import {AiFillStar} from "react-icons/ai"
import {  increaseQuantity, removeFromCart } from '../dataSlice'
import { useContext } from 'react'
import ThemeContext from './ThemeContext'

const Product = ({product}) => {
    console.log(product)
    const dispatch = useDispatch()
    const {theme} = useContext(ThemeContext)
   
    
    
   
    const [qty, setQty] = useState('')
   
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
    <h4 className='text-sm py-2 italic'>{product.price}</h4>
    </div>
    <div className="flex items-center">
    <AiFillStar/>
    {/* <h4 className='text-sm py-2 italic'>{product.rating.rate}</h4> */}
    </div>
    </div>
   
    <div className='my-2'>
    <button type='button' className="bg-green-400 mx-1 text-slate-100 rounded-md p-2 text-sm cursor-pointer" onClick={(e) => {
                          e.preventDefault()
                          // console.log(product.id, Number(qty))
                            let quantity = Number(qty)
                          // let p_id = product.id
                          dispatch(increaseQuantity({product,quantity}))
                    }}>Add to cart</button>
    </div>
</div>
  )
}

export default Product
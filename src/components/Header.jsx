import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AiOutlineShoppingCart,AiOutlineClose } from "react-icons/ai";
import {BiRupee} from "react-icons/bi"
import {FaRupeeSign} from "react-icons/fa"
import {  useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { calcGrandTotal, decreasecartQuantity, increasecartQuantity, increaseQuantity } from '../dataSlice';
import { toggleMenu } from '../navSlice';
import UserContext from '../UserContext';
import Bill from './Bill';
import Search from './Search';
import ThemeContext from './ThemeContext';

const Header = () => {
  const cart = useSelector((store) => store.data?.cart)
 
  const {theme, setTheme} = useContext(ThemeContext)
  const toggleSidebar = useSelector(store => store.nav.openMenu)
  const [count, setCount] = useState(0)
  const [price, setPrice] = useState(0)
  const [qty, setQty] = useState(0)
  // console.log(cart && cart.qty)
  const dispatch = useDispatch()
  const grandTotal = useSelector(store => store.data.grandTotal)
  const  totalPrice = useSelector(store => store.data.totalPrice)
  const totalDiscount = useSelector(store => store.data.totalDiscount)
  useEffect(()=>{
    let counter = 0
    cart.map(cart => (
      counter +=cart.qty
    ))
    setCount(counter)
  },[count, cart])

  // useEffect(()=>{
  //   let price = 0
  //   cart.map(cart => (
  //     price += (cart.qty * cart.product.price)
  //   ))
  //   setPrice(price.toFixed(2))
  // },[price, cart])
  useEffect(()=>{
    dispatch(calcGrandTotal({totalPrice, totalDiscount}))
  },[totalPrice, totalDiscount, dispatch])
  return (
     <>
     
     <div className='bg-cyan-600 py-2 flex justify-around items-center '>
        <div className="font-mono text-slate-100 text-lg  font-bold cursor-pointer poppins"><Link to='/'>Shopping Cart</Link></div>
        <div>
            <Search/>
        </div>
        <div>
        <div className='flex gap-3 items-center text-slate-200 font-medium cursor-pointer'>
       <button className='flex gap-4 items-center bg-cyan-800 px-3 py-0 border-2 rounded-md' 
       onClick={()=> dispatch(toggleMenu())} >
        <AiOutlineShoppingCart className='text-lg'/>
        <div className='flex flex-col items-start text-sm'>
        <span>{count} items</span>
        <span className='flex justify-center items-center'><BiRupee className='text-xl' />
         {grandTotal.toFixed(2)}
         </span>
        </div>
        </button>
        </div>
      </div>
    </div> 
    {
      toggleSidebar && 
    <nav className="flex w-72 h-screen bg-white shadow-2xl rightsidebar flex-col">
      <div className="w-11/12 flex mx-auto p-2 flex-col">
        <div className="w-full h-full items-center justify-center
         text-gray-900 text-xl  border-gray-900 border-dashed">
          <div className='flex'> 
          <AiOutlineClose  className='closeIcon cursor-pointer'   onClick={()=> dispatch(toggleMenu())} />
          <h2 className='font-bold my-1'>My Cart</h2>
          <hr/>
          </div> 
          
          {
              cart.length ?   cart.map(cart => (
             
             <>
             {console.log(cart.product[0])}
             <div className='flex items-center  border-t-2 my-4 py-2 border-gray-200'>
                <img  src={cart.product.image} alt="product" className='w-16 h-16 border border-gray-200 p-2'/>
                <div className='flex gap-3 flex-col p-3 justify-center '>
                  <h4 className='text-xs'>{cart.product.title}</h4>
                  <div className='flex justify-between items-end'>
                  <h4 className='text-sm font-bold py-2 text-black-200 flex justify-center items-center'>
                  <FaRupeeSign/>{cart.product.price}
                  </h4>
                  <div className="bg-yellow-500 text-slate-100 rounded-md">
            <button type='button' className="bg-yellow-500 mx-1 text-slate-200 rounded-md p-2 text-sm cursor-pointer"
             onClick={(e) => {
                                e.preventDefault()
                                let qty = cart.qty + 1
                                dispatch(increasecartQuantity({cart, qty}))
                                
                            }}>+</button>
                           <span className='text-slate-200'>{cart.qty}</span>
                            <button type='button' className="bg-yellow-500 mx-1 text-slate-200 
                            rounded-md p-2 text-sm cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              let qty = cart.qty - 1
              dispatch(decreasecartQuantity({cart, qty}))
          }}>-</button> 
              </div> 
                  </div>
                </div>
              </div>
             
              </>
              
            )): <div className='flex h-full items-center justify-center'><h1 className=''>Cart is empty</h1></div>
          }
           
         </div>
        
      </div>
      <Bill/>
    </nav>
    }  
     </>
  )
}

export default Header
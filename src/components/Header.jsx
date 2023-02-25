import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import {BiRupee} from "react-icons/bi"
import {  useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toggleMenu } from '../navSlice';
import UserContext from '../UserContext';
import Search from './Search';
import ThemeContext from './ThemeContext';
const Header = () => {
  const cart = useSelector((store) => store.data?.cart)
  const {theme, setTheme} = useContext(ThemeContext)
  const [count, setCount] = useState(0)
  const [price, setPrice] = useState(0)
  const dispatch = useDispatch()
  // const toggleHandler = () => {
  //   dispatch(toggleMenu())
  // }
  
  useEffect(()=>{
    let counter = 0
    cart.map(cart => (
      counter +=cart.qty
    ))
    setCount(counter)
  },[count, cart])

  useEffect(()=>{
    let price = 0
    cart.map(cart => (
      price += (cart.qty * cart.product.price)
    ))
    setPrice(price)
  },[price, cart])
  return (
     <>
     
     <div className='bg-cyan-600 py-4 flex justify-around items-center'>
        <div className="font-normal text-slate-100 text-lg cursor-pointer"><Link to='/'>Shopping Cart</Link></div>
        <div>
            <Search/>
        </div>
        <div>
        <div className='flex gap-3 items-center text-slate-200 font-medium cursor-pointer'>
       <button className='flex gap-4 items-center bg-cyan-800 px-3 py-0 border-2 rounded-md'>
        <AiOutlineShoppingCart className='text-xl'/>
        <div className='flex flex-col items-start'>
        <span>{count} items</span>
        <span className='flex justify-center items-center'><BiRupee className='text-xl' /> {price}</span>
        </div>
        </button>
        </div>
      </div>
    </div>
     </>
  )
}

export default Header
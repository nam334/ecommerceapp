import React from 'react'
import { useContext } from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi"
import {  useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toggleMenu } from '../navSlice';
import UserContext from '../UserContext';
import Search from './Search';
import ThemeContext from './ThemeContext';
const Header = () => {
  const count = useSelector((store) => store.data.cart)
  const {theme, setTheme} = useContext(ThemeContext)
  const dispatch = useDispatch()
  // const toggleHandler = () => {
  //   dispatch(toggleMenu())
  // }
  return (
    <div className='bg-cyan-600 py-4 flex justify-around items-center'>
      
        <div className="font-normal text-slate-100 text-lg cursor-pointer"><Link to='/'>Shopping Cart</Link></div>
        <div>
            <Search/>
        </div>
       
        <div>
        
        <div className='flex items-center text-slate-200 font-medium cursor-pointer'>
         
       <AiOutlineShoppingCart className='text-lg'/>(
          {
           count && count.length
          }
        )  
        <Link to='/cart'>
        <button type='button' className='hover:text-slate-100 mr-2'></button></Link>
        <button onClick={()=> setTheme(theme === "dark" ? "light" : "dark")}>Theme :</button>{theme}

       
        </div>
       
      </div>
      
    </div>
  )
}

export default Header
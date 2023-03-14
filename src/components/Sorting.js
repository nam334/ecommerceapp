import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortByRatingHighToLow,sortByRatingLowToHigh,sortByPriceHighToLow,sortByPriceLowToHigh } from '../dataSlice'
import SkeletonVideo from './SkeletonVideo'

const Sorting = ({loader, setLoader}) => {
const [toggle, setToggle] = useState(false)
//const [loader, setLoader] = useState(false)
const dispatch = useDispatch()
const toggleHandler = () => {
    setToggle(prevState => !prevState)
}
const hightolowratingHandler = () => {
  setLoader(true)
  setTimeout(() => {
    dispatch(sortByRatingHighToLow())
    setLoader(false)
  }, 1000);
}
const lowtohighratingHandler = () => {
  setLoader(true)
  setTimeout(() => {
    dispatch(sortByRatingLowToHigh())
    setLoader(false)
  }, 1000);
}
const hightolowpriceHandler = () => {
  setLoader(true)
  setTimeout(() => {
    dispatch(sortByPriceHighToLow()) 
    setLoader(false)
  }, 1000);

   
}
const lowtohighpriceHandler = () => {
  setLoader(true)
  setTimeout(() => {
    dispatch(sortByPriceLowToHigh())
    setLoader(false)
  }, 1000);


   
}
  return (
   <>
    <div className="relative inline-block text-left">
  <div>
    <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md
     bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset
      ring-gray-300 hover:bg-gray-50" onClick={toggleHandler}
      id="menu-button" aria-expanded="true" aria-haspopup="true">
      Sorting
      <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
      </svg>
    </button>
  </div>
{
    toggle &&   <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div className="py-1" role="none">
      <span className="text-gray-700 block px-4 py-2 text-sm cursor-pointer" role="menuitem" 
      tabindex="-1" id="menu-item-0" onClick={hightolowratingHandler}>Customer Rating (high to low)</span>
      <span className="text-gray-700 block px-4 py-2 text-sm cursor-pointer" role="menuitem" 
      tabindex="-1" id="menu-item-0" onClick={lowtohighratingHandler}>Customer Rating (low to high)</span>
      <span href="#" className="text-gray-700 block px-4 py-2 text-sm cursor-pointer" role="menuitem" 
      tabindex="-1" id="menu-item-1" onClick={hightolowpriceHandler}>Price high to low</span>
      <span href="#" className="text-gray-700 block px-4 py-2 text-sm cursor-pointer" role="menuitem" 
      tabindex="-1" id="menu-item-1" onClick={lowtohighpriceHandler}>Price low to high</span>
    </div>
   
  </div>
}
</div>

   </>
  )
}

export default Sorting
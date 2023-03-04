import React, { useEffect, useState } from 'react' 
import {FaRupeeSign} from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { filterByPrice } from '../dataSlice'
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

const Sidenav = () => { 
  const [range, setRange] = useState(0) 
  const [minValue, setMinValue] = useState(0);
	const [maxValue, setMaxValue] = useState(1000);

  
  const dispatch  = useDispatch()
  const changeHandler = (selectedRange) => {
    setRange(selectedRange) 
    
  }
  // useEffect(()=>{
  //  setRange(maxValue-minValue)
  //  dispatch(filterByPrice(range))
  // },[])
  return (
  <div className='shadow-2xl p-6 h-full w-full'>
    <span className='font-bold font-mono text-slate-100 text-xl  cursor-pointer poppins py-2'>FILTERS</span>
   <label htmlFor="default-range" 
   className="block mb-2 text-md font-medium text-slate-100 dark:text-white py-2">Price range</label>
   <div className='text-slate-100 flex items-center'> 
   <FaRupeeSign className='text-xs text-slate-100'/>{0} - <FaRupeeSign className='text-slate-100 text-xs'/>{1000}</div>
  
   {/* <input id="default-range" type="range" min={0} value={range} 
   onChange={(e)=>changeHandler(e.target.value)}
   max={1000}
   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/> */}
   <MultiRangeSlider
					min={0}
					max={1000}
					step={5}
					minValue={minValue}
					maxValue={maxValue}
					onChange={(e) => {
						setMinValue(e.minValue);
						setMaxValue(e.maxValue);
            dispatch(filterByPrice({maxValue,minValue}))
           
					}}
				></MultiRangeSlider>
        <h4 className="block mb-2 text-sm font-medium text-slate-100 dark:text-white mt-2">Selected Range</h4>
				<div className='flex gap-2' >
					<div className='flex items-center text-slate-100 text-sm' > <FaRupeeSign className='text-xs text-slate-100'/>{minValue} -</div>
					<div className='flex items-center text-slate-100 text-sm' ><FaRupeeSign className='text-xs text-slate-100'/>{maxValue}</div>
				</div>
    <h4 className='text-md font-medium text-slate-100 mt-4'>Customer Ratings</h4>
    <div class="flex flex-col">
    <div className='flex items-end'>
    <input type="checkbox"  />
    <h4 className="block px-2  text-sm font-medium text-slate-100 dark:text-white mt-2">4 * & above</h4>
    </div>
    <div className='flex items-end'>
    <input type="checkbox"  />
    <h4 className="block px-2 text-sm font-medium text-slate-100 dark:text-white mt-2">3 * & above</h4>
    </div>
  </div>
</div>
  )
}

export default Sidenav
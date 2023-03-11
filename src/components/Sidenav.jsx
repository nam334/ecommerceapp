import React, { useEffect, useState } from 'react' 
import {FaRupeeSign} from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { filterByPrice, filterByRating } from '../dataSlice'
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

const Sidenav = ({productsData}) => { 
  const [checked, setChecked] = useState(false) 
  const [checkedRating, setCheckedRating] = useState(false) 
  const [minValue, setMinValue] = useState(0);
	const [maxValue, setMaxValue] = useState(1000);

  const [rating, setRating] = useState(0)
  const [starrating, setStarRating] = useState(0)

  const dispatch  = useDispatch()
  const ratingChangeHandler = (check) => {
     setChecked(check => !check) 
     console.log(!checked)
      //dispatch(filterByRating({checked,rating}))
      !checked && setRating(4)
      !!checked && setRating(0)
      !checked && dispatch(filterByPrice({maxValue,minValue,rating}))
  }
  const starRatingChangeHandler = (checked) => {
    setCheckedRating(checked => !checked)
    !checkedRating && setRating(3)
    
   
    !!checkedRating && setRating(0)
    // console.log(checkedRating,starrating)
     !checkedRating && dispatch( filterByPrice({maxValue,minValue,rating}))
 }
  return (
  <div className='p-6 h-full w-full bg-slate-50 mt-5 ml-5 rounded-lg'>
    <span className='font-bold font-mono text-slate-100 text-xl  cursor-pointer poppins py-2'>FILTERS</span>
   <label htmlFor="default-range" 
   className="block mb-2 text-md font-medium text-slate-100 dark:text-white py-2">Price range</label>
   <div className='text-slate-100 flex items-center'> 
   <FaRupeeSign className='text-xs text-slate-100'/>{0} - <FaRupeeSign className='text-slate-100 text-xs'/>{1000}</div>
   <MultiRangeSlider
					min={0}
					max={1000}
					//step={5}
					minValue={minValue}
					maxValue={maxValue}
					onChange={(e) => {
						setMinValue(e.minValue);
						setMaxValue(e.maxValue);
            dispatch(filterByPrice({maxValue,minValue,rating}))
           
					}}
				/>
        <h4 className="block mb-2 text-sm font-medium text-slate-100 dark:text-white mt-2">Selected Range</h4>
				<div className='flex gap-2' >
					<div className='flex items-center text-slate-100 text-sm' > <FaRupeeSign className='text-xs text-slate-100'/>{minValue} -</div>
					<div className='flex items-center text-slate-100 text-sm' ><FaRupeeSign className='text-xs text-slate-100'/>{maxValue}</div>
				</div>
    <h4 className='text-md font-medium text-slate-100 mt-4'>Customer Ratings</h4>
    <div className="flex flex-col">
    <div className='flex items-end'>
    <input type="checkbox"  checked={checked}
        onChange={(e)=>ratingChangeHandler(e.target.checked)}
        value={checked}  />
    <h4 className="block px-2  text-sm font-medium text-slate-100 dark:text-white mt-2">4 * & above</h4>
    </div>
    <div className='flex items-end'>
    <input type="checkbox" checked={checkedRating}
        onChange={(e)=>starRatingChangeHandler(e.target.checked)}
        value={checkedRating} />
    <h4 className="block px-2 text-sm font-medium text-slate-100 dark:text-white mt-2">3 * & above</h4>
    </div>
  </div>
</div>
  )
}

export default Sidenav
import React, { useState } from 'react'
import Rating from './Rating'

const Sidebar = () => {
  const [rating , setRating] = useState(3) 
  return (
    <div className='bg-cyan-600 h-full'>
        <h1 className='font-normal text-slate-100 mx-4 text-lg italic py-5
        '>Filter Products</h1>
        <form className="italic text-slate-100 block
                  w-full 
                 py-1 px-2 text-md shadow-sm 
                 sm:text-sm">
            <div className='flex my-4' >
            <input className='mx-2'  type="radio" id='ascending' name="incdec" 
            value="Ascending" />
            <label htmlFor="ascending">Ascending</label>
            </div>
            <div className='flex my-4' >
            <input className='mx-2' type="radio" id='descending' name="incdec" value="Descending" />
            <label htmlFor="descending">Descending</label>
            </div>
            <div className='flex my-4' >
            <input className='mx-2' type="checkbox" id="outOfStock" name="outOfStock" value="Include Out of Stock"/>
            <label htmlFor="outOfStock">Include Out of Stock</label>
            </div>
            <div className='flex my-4' >
            <input className='mx-2' type="checkbox" id="fastDeliveryOnly" name="fastDeliveryOnly" value="Fast Delivery Only"/>
            <label htmlFor="fastDeliveryOnly">Fast Delivery Only</label>
            </div>
            <div className='flex my-4 items-center' >
            <label className='mx-2'>Rating</label>
            <Rating rating={rating} 
            onClick={(i) => setRating(i + 1)}
            />
            </div>
            <button className='bg-cyan-300  text-slate-700 
            italic p-2 rounded-md text-sm'
            
            >Clear Filters</button>
        </form>
    </div>
  )
}

export default Sidebar
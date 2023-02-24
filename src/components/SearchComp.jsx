import React from 'react'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchResult } from '../dataSlice';

const SearchComp = ({suggestion, suggestionHandler}) => { 
  const dispatch = useDispatch()
  return (
    <div className='cursor-pointer hover:bg-slate-200 rounded-lg' 
    >
    <div className='mydiv flex items-center p-2 '  
    onClick={()=> {
      suggestionHandler(suggestion.title)
      dispatch(fetchSearchResult(suggestion))
    }}  
     
     >
       <img src={suggestion.image} alt="" className='w-10 h-10 rounded-sm' />
       <h1 className='text-slate-500 text-sm mx-2'
        
        >
          {suggestion.title}
       </h1>
    </div>
   
  </div> 
  )
}

export default SearchComp
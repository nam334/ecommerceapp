import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchResult } from '../dataSlice'
import SearchComp from './SearchComp'
import Star from './Star'

const Search = () => {
  const [text, setText] = useState('') 
  const [suggestion, setSuggestions] = useState([])
  const searchData = useSelector((store) => store.data?.totalData)
  const dispatch = useDispatch()
  const [placeholder, setPlaceholder] = useState([])
  const searchHandler = (text) => {
    setSuggestions(searchData[0] && searchData[0].filter((searchItem) => searchItem.title.toLowerCase().trim().match(text.toLowerCase().trim())))
    //dispatch(fetchSearchResult([]))
    setText(text)
  }
  //console.log(placeholder.length && placeholder)
   
   useEffect(()=>{
    let val = []
    searchData.length && searchData[0].map(search => val.push(search.category ))
    setPlaceholder(val.filter((item,index) => val.indexOf(item) === index))
   },[searchData]) 
  const suggestionHandler = (textIn) => {
        setText(textIn)
        setSuggestions([])
       
  } 
  // useEffect(()=>{
  //   removeDuplicates(placeholder)

  //   function removeDuplicates(arr) {
  //     return 
  //  }
    
  // },[])
  
  
  return (
    <>
        <form>
        <input type='text' placeholder = {placeholder}
            className="placeholder:italic placeholder:text-slate-400 block
          bg-white w-96 border border-cyan-300 
            rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none
          focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 sm:text-sm"
          value={text}  
          onChange={(e)=> searchHandler(e.target.value)}
          // onBlur={()=> {
          //   setTimeout(()=> {
          //       setSuggestions([])
          //   },100)
          // }} 
            />
             <div className='test rounded-lg shadow-2xl bg-slate-50'>
            {
            suggestion && suggestion.map((suggestion,i)=>
            <SearchComp suggestion={suggestion} suggestionHandler={suggestionHandler}  />
           
            )} 
           
           </div>
          
          
        </form>
          
    </>
  )
}

export default Search
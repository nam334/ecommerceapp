import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchResult } from '../dataSlice'
import SearchComp from './SearchComp'
import { motion } from "framer-motion"
import Star from './Star'

const containerVariants = {
  hidden: { 
    opacity: 0, 
    y: '-50vh' 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring', delay: 0.3
      //yoyo:10
    }
  },
};

const Search = () => {
  const [text, setText] = useState('') 
  const [counter, setCounter] = useState(0)
  const [suggestion, setSuggestions] = useState([])
  const searchData = useSelector((store) => store.data?.totalData)
  const dispatch = useDispatch()
  const [placeholder, setPlaceholder] = useState([])
  const inputRef = useRef();
  //console.log(inputRef)
  
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

   useEffect(()=>{
    //inputRef.current.setAttribute('placeholder','hi');
    function ChangePlaceholder(){
      
      if(counter>= placeholder.length){
       setCounter(0)
      }
     
     inputRef.current.setAttribute('placeholder',placeholder[counter]);
    
      setCounter((prevCounter)=> prevCounter+1)
    }
  
    setInterval(ChangePlaceholder,2000);
   // return(()=> res())
  },[counter, placeholder, inputRef])

  const suggestionHandler = (textIn) => {
        setText(textIn)
        setSuggestions([])   
  } 
  return (
    <>
        <form>
          <div className='input-group '>
        <input type='text'  placeholder="Search for..."
            className="placeholder:italic placeholder:text-slate-400 block
          bg-white w-96 border border-cyan-300 
            rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none
          focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 sm:text-sm 
          icon-placeholder"
          value={text}  
          ref={inputRef} 
          onChange={(e)=> searchHandler(e.target.value)}
          data-test-id="my-btn"
          // onBlur={()=> {
          //   setTimeout(()=> {
          //       setSuggestions([])
          //   },100)
          // }} 
            />
            {/* {
              placeholder.map(placeholder => (
                <motion.span className='py-2 pl-9 pr-3 mb-2 text-slate-400 mx-3' 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                >
               {placeholder}
             </motion.span>
              ))
            } */}
          </div>
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
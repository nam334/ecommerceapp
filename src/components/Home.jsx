import React, { useEffect, useState } from 'react'
import { API_ENDPOINT } from '../config'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchData, lowTohigh } from '../dataSlice'
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import Product from './Product'
import Header from './Header'
import Sidebar from './Sidebar'

const Home = () => { 
  const [arr, setArr] = useState([])
  const [desarr, setDesArr] = useState([])
  const [page, setPage] = useState(1)
 useEffect(()=>{
    fetchProducts()
    
 },[])
  const dispatch = useDispatch()
 const productsData = useSelector((store) => store.data.copyData && store.data.copyData.length ? store.data.copyData[0] : store.data.totalData[0])
 console.log(productsData)
 const openMenu  = useSelector((store)=> store.nav.openMenu)
  const fetchProducts = async() => {
        const data = await fetch(API_ENDPOINT)
        const result = await data.json()
        //console.log(result)
        dispatch(fetchData(result)) 
  }
  
  const ascendingHandler = () => {
    //dispatch(lowTohigh(productsData))
   
    let ascendingArray = productsData[0].slice().sort((a, b) => a.price - b.price)
    setArr(ascendingArray)
    console.log(ascendingArray)
    setDesArr([])
  }
  const descendingHandler = () => {
   
    let descendingArray = productsData[0].slice().sort((a, b) => b.price - a.price)
    setDesArr(descendingArray)
    console.log(descendingArray)
    setArr([])
  }

  const pageChangeHandler = (currentPage) => {

    setPage(currentPage)
  }
  return (
    <>
    <Header/>
     <div className="">
   
    <div className=" col-span-10">
    {/* <div className='flex justify-end'>
       {productsData &&  <button type='button' onClick={ascendingHandler} className="bg-cyan-300 text-slate-700 
       font-medium italic rounded text-sm p-2 my-3 mx-3">Sort by price (low to high) </button>}

        {productsData &&  <button type='button' onClick={descendingHandler} className="bg-cyan-300 text-slate-700 
       font-medium italic rounded text-sm p-2 my-3 mx-3">Sort by price (high to low) </button>}
    </div> */}
    <div className='flex flex-wrap '>
    {
      productsData ? productsData.length > 1 ? 
     productsData.slice((page * 5) - 5, page * 5).map((product)=> (
        <Product product={product} key={product.id}/> 
     )) 
      :  <Product product={productsData} key={productsData.id}/>  : <h1>LOADING.......</h1>
    }
    </div> 
    </div>



    {/* <div className='m-4 flex justify-center'>
    {
      productsData && productsData.length > 0 && <div className='pagination'>
        { page && page > 1 && <span className='text-slate-50 text-sm bg-indigo-400 rounded py-2 px-3
         hover:bg-indigo-600 cursor-pointer font-semibold 
        border-2 border-indigo-600' onClick={()=> pageChangeHandler(page - 1)}>Left</span>}
        <span>
          {
           

            [...Array(productsData.length / 5)].map((_,i) => (
              <span className = {`
               text-sm cursor-pointer py-1 px-2 text-slate-50
              ${page === i+1 ? 'bg-indigo-700 ': 'bg-indigo-400'}
              border-2 mx-1 rounded border-indigo-600 
              `}
              onClick={()=> pageChangeHandler(i+1)}>{i + 1}</span>
            ))
          }
        </span>
       {
        page && page !== productsData.length / 5 &&  <span className='text-slate-50 text-sm bg-indigo-400 rounded py-2 px-3
         hover:bg-indigo-600 cursor-pointer font-semibold
        border-2 border-indigo-600' onClick={()=> pageChangeHandler(page + 1)}>Right</span>
       }
       
      </div>
    }
    </div> */}
    </div>
    </>
   
  )
}

export default Home
import React, { useEffect, useState } from 'react'
import { API_ENDPOINT } from '../config'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchData, lowTohigh } from '../dataSlice'
import {productsWithDiscounts} from '../productsWithDiscounts'
import { mergeArrays } from '../functions'
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import Product from './Product'
import Header from './Header'
import Sidebar from './Sidebar' 
import Sidenav from './Sidenav'
import Sorting from './Sorting'

const Home = () => { 
  const [arr, setArr] = useState([])
  const [desarr, setDesArr] = useState([])
  const [page, setPage] = useState(1) 
 
 useEffect(()=>{
    fetchProducts()
    
 },[])
 
 
  const dispatch = useDispatch()
//  const productsData = useSelector((store) => store.data.filteredData && store.data.filteredData.length ? store.data.filteredData : store.data.totalData[0])
 const productsData = useSelector((store) => store.data?.filteredData?.length ? store.data.filteredData : store.data.totalData[0] )
 const openMenu  = useSelector((store)=> store.nav.openMenu)
  const fetchProducts = async() => {
        const data = await fetch(API_ENDPOINT)
        const result = await data.json()
      

        // let totalProducts = [...[result, productsWithDiscounts].reduce((m, a) => (a.forEach(o => m.has(o.ObjId) && Object.assign(m.get(o.ObjId), o) || m.set(o.ObjId, o)), m), new Map()).values()];
        // console.log(totalProducts)
        let totalProducts = mergeArrays(result, productsWithDiscounts)
        console.log(totalProducts)
        dispatch(fetchData(totalProducts)) 
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
    <div className="grid 

     grid-flow-col gap-4">
    <div className="row-span-3 shadow-2xl w-56">
      <Sidenav productsData={productsData}/>
      </div>
    <div className="col-span-2">
    <div className="row">
    <div className="col-span-12">
    {/* <div className='flex justify-end'>
       {productsData &&  <button type='button' onClick={ascendingHandler} className="bg-cyan-300 text-slate-700 
       font-medium italic rounded text-sm p-2 my-3 mx-3">Sort by price (low to high) </button>}

        {productsData &&  <button type='button' onClick={descendingHandler} className="bg-cyan-300 text-slate-700 
       font-medium italic rounded text-sm p-2 my-3 mx-3">Sort by price (high to low) </button>}
    </div> */}
     <div className='flex justify-end p-4'>
      <Sorting/>
    </div>
    <div className='flex flex-wrap justify-center'>
   
    {
      productsData ? productsData.length > 1 ? 
    //  productsData.slice((page * 5) - 5, page * 5).map((product)=> (
      productsData.map((product)=> (
        <Product product={product} key={product.id}/> 
     ))  
      :  <Product product={productsData} key={productsData.id}/>  : <h1>LOADING.......</h1>
    }
    </div> 
    </div>
    </div>
  </div>
  
</div>
    
    </>
   
  )
}

export default Home
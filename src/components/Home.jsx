import React, { useEffect, useState } from 'react'
import { API_ENDPOINT } from '../config'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchData, lowTohigh } from '../dataSlice'
import {productsWithDiscounts} from '../productsWithDiscounts'
import { mergeArrays } from '../functions'
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import { MagnifyingGlass} from 'react-loader-spinner'
import Product from './Product'
import Header from './Header'
import Sidebar from './Sidebar' 
import Sidenav from './Sidenav'
import Sorting from './Sorting'
//import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonVideo from './SkeletonVideo'

const Home = () => { 
  const [arr, setArr] = useState([])
  const [desarr, setDesArr] = useState([])
  const [page, setPage] = useState(1) 
  const [loader, setLoader] = useState(false)
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
       // console.log(totalProducts)
        dispatch(fetchData(totalProducts)) 
  }
  
  const ascendingHandler = () => {
    //dispatch(lowTohigh(productsData))
   
    let ascendingArray = productsData[0].slice().sort((a, b) => a.price - b.price)
    setArr(ascendingArray)
  //  console.log(ascendingArray)
    setDesArr([])
  }
  const descendingHandler = () => {
   
    let descendingArray = productsData[0].slice().sort((a, b) => b.price - a.price)
    setDesArr(descendingArray)
    //console.log(descendingArray)
    setArr([])
  }

  const pageChangeHandler = (currentPage) => {

    setPage(currentPage)
  }
  return (
    <>
    <Header/> 
    <div className="grid grid-flow-row-dense  grid-cols-5">
       <div className="col-span-1   bg-slate-100">
        <Sidenav productsData={productsData}/>
       </div>
  <div className="col-span-4 ">
     <div className='flex justify-end p-4'>
      <Sorting loader={loader} setLoader={setLoader}/>
    </div> 
    {
      loader ?  <MagnifyingGlass
      visible={true}
      height="200"
      width="200"
     
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{margin:"auto"}}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor = '#c0efff'
      color = '#e15b64'
      className="flex justify-center"
    /> :  <div className='flex flex-wrap justify-center'>
    {
      productsData ? productsData.length > 1 ? 
      productsData.map((product)=> (
        <Product product={product} key={product.id}/> 
     ))  
      :  <Product product={productsData} key={productsData.id}/>  :
       new Array(20).fill().map(() => <SkeletonVideo  />)
    }
  
       </div>  
    }
   
   </div>  
</div>
    </> 
  ) 
}

export default Home
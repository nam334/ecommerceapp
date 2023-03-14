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
      loader ?  <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  </svg> :  <div className='flex flex-wrap justify-center'>
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
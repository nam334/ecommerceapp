import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calcGrandTotal } from '../dataSlice'
import { discountCalculation } from '../functions'
const Bill = () => {
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  const [deliveryCharge, setDeliveryCharge] = useState(10)
  const cart = useSelector(store => store.data.cart) 
  const dispatch = useDispatch()
  const  totalPrice = useSelector(store => store.data.totalPrice)
  const totalDiscount = useSelector(store => store.data.totalDiscount)
  const grandTotal = useSelector(store => store.data.grandTotal)
  useEffect(()=> {
    let price = 0, discountedPrice = 0
    cart?.map((cart)=> {
      setPrice(price += ((cart?.product?.price) * (cart?.qty)) )
       cart?.product?.discountRate && setDiscount(discountedPrice += ((cart?.product?.discountRate)))
       discount > 0 && setTotal((discountCalculation(price, discount) - deliveryCharge))
       
    })
  },[cart, discount, deliveryCharge])
 
  useEffect(()=>{
    dispatch(calcGrandTotal({totalPrice, totalDiscount}))
  },[totalPrice, totalDiscount, dispatch])
  // useEffect(()=> {
  //   let discountedPrice = 0
  //   cart?.map((cart)=> (
  //      setPrice(discountedPrice += ((cart?.product?.discountRate)) )
  //   ))
  // },[cart])
 
  return (
   <>
   {
    cart.length ? <>
      <div className='p-2 text-sm font-sans text-slate-600'>
      <div className='flex justify-between py-1'>
      <h4>MRP</h4>
      <h4>{totalPrice.toFixed(2)} /-</h4>
      </div>
      <div className='flex justify-between py-1'>
      <h4>Total Discount Rate</h4> 
      <h4>{totalDiscount} </h4>
      </div>
      {/* <div className='flex justify-between py-1'>
      <h4>Delivery charge</h4>
      <h4>{deliveryCharge} /-</h4>
      </div> */}
      <div className='flex justify-between py-1 font-bold'>
      <h4>Grand Total</h4>
      <h4>{grandTotal.toFixed(2)} /-</h4>
      {/* <h4>{total > 0 ? total.toFixed(2) : price.toFixed(2)} /-</h4> */}
      </div>
      </div>
    </> : null
   }
   </>
  )
}

export default Bill 
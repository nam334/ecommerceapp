import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { discountCalculation } from '../functions'
const Bill = () => {
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  const [deliveryCharge, setDeliveryCharge] = useState(10)
  const cart = useSelector(store => store.data.cart) 
  useEffect(()=> {
    let price = 0, discountedPrice = 0
    cart?.map((cart)=> {
      setPrice(price += ((cart?.product?.price) * (cart?.qty)) )
       cart?.product?.discountRate && setDiscount(discountedPrice += ((cart?.product?.discountRate)))
       discount > 0 && setTotal((discountCalculation(price, discount) - deliveryCharge))
    })
  },[cart, discount, deliveryCharge])
 
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
      <h4>{price.toFixed(2)} /-</h4>
      </div>
      <div className='flex justify-between py-1'>
      <h4>Total Discount Percent</h4>
      <h4>{discount} %</h4>
      </div>
      <div className='flex justify-between py-1'>
      <h4>Delivery charge</h4>
      <h4>{deliveryCharge} /-</h4>
      </div>
      <div className='flex justify-between py-1 font-bold'>
      <h4>Grand Total</h4>
      <h4>{total > 0 ? total.toFixed(2) : price.toFixed(2)} /-</h4>
      </div>
      </div>
    </> : null
   }
   </>
  )
}

export default Bill 
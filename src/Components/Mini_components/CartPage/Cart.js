import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../../../Context/CartContext'
import { useGlobleContext } from '../../../Context/Globle_Context'
import { currency } from '../../../Context/Mini_fuctions/PriceFormater'
import CartItem from './CartItem'
import { useAuthContext } from '../../../Context/AuthContext'
import { message } from 'antd'

const Cart = () => {
  const navigate=useNavigate()
  const {user}=useAuthContext()
    const {cart,setCheckoutItem}=useCartContext()
    const {enabled}=useGlobleContext()
    const {cartItems,totalQty,totalPrice}=cart
    const [ready_to_checkout,setReady_to_checkout]=useState(false)

  // this below function will reverse the cartItems array to get latest updated products  
const reverseArr=(cartItems)=>{
 let ReversedCartItemsArr=[]
  for (let i = cartItems.length-1; i >=0 ; i--) {
    ReversedCartItemsArr.push(cartItems[i])
  }
  return ReversedCartItemsArr
}


const buynow = () => {
  if(ready_to_checkout){
    user ? navigate("/checkout") : navigate("/login");
  setCheckoutItem({
    totalQty: totalQty,
    totalPrice,
    orderItems: [...reverseArr(cartItems)],
  });
  }else{
    message.error(`Items are not ready (Please Refresh this page)`)
  }
};


  return (
    <>
     <Wrapper className={`flex ${window.innerWidth<821&&'flex-col'} justify-around items-center md:items-center lg:items-start`}>
        <div>
        <table>
           <thead className={`${enabled?'text-white':'text-black'}`}><tr><th>Items</th><th>Qty</th><th>Price</th></tr></thead>
           <tbody>
           {cartItems && reverseArr(cartItems).map((item,i)=>{
                 return <tr key={i} className={` ${
                    enabled ? "even:bg-zinc-700 odd:bg-zinc-800 text-white" : "even:bg-slate-300 odd:bg-white text-black"
                  }`}> 
                       <td><CartItem setReady_to_checkout={setReady_to_checkout} itemData={item}/></td>
                       <td>{item.itemQty}</td>
                       <td>{currency(item.itemsPrice)}</td>
                 </tr>
            })}
           </tbody>
        </table>
        </div>
        <div className={`lg:sticky lg:top-0 lg:py-5 flex lg:flex-col justify-around items-center ${window.innerWidth<821 && 'w-[100%]'} mt-4 `}>
            <div>
            <table  className={`${window.innerWidth>630&&'getpad'} font-semibold ${enabled?'text-white':'text-black'}`}>
                <tbody>
                    <tr><td>Total Quantity</td><td>{totalQty}</td></tr>
                    <tr><td>Total Price</td><td>{currency(totalPrice)}</td></tr>
                </tbody>
            </table>
            </div>
            <div className='lg:my-1'>
              <button onClick={buynow} className="bg-yellow-500 text-blue-50 px-5  py-2">Checkout</button>
            </div>
            
        </div>

        </Wrapper> 
    </>
  )
}

const Wrapper=styled.div`
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 2px;
  }

  .getpad td{
    padding-left:20px;
    padding-right:20px;
  }

`

export default Cart

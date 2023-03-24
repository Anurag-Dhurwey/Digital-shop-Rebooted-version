import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../../../Context/CartContext'
import { useGlobleContext } from '../../../Context/Globle_Context'
import { currency } from '../../../Context/Mini_fuctions/PriceFormater'
import CartItem from './CartItem'

const Cart = () => {
    const {cart}=useCartContext()
    const {enabled}=useGlobleContext()
    const {cartItems,totalQty,totalPrice}=cart
console.log(cartItems)
console.log(cartItems.reverse())
  return (
    <>
     <Wrapper className={`flex ${window.innerWidth<821&&'flex-col'} justify-around items-center md:items-center lg:items-start`}>
        <div>
        <table>
           <thead className={`${enabled?'text-white':'text-black'}`}><tr><th>Items</th><th>Qty</th><th>Price</th></tr></thead>
           <tbody>
           {cartItems&& cartItems.reverse().map((item,i)=>{
                 return <tr key={i} className={` ${
                    enabled ? "even:bg-zinc-700 odd:bg-zinc-800 text-white" : "even:bg-slate-300 odd:bg-white text-black"
                  }`}> 
                       <td><CartItem itemData={item}/></td>
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
              <button className="bg-yellow-500 text-blue-50 px-5  py-2">Checkout</button>
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

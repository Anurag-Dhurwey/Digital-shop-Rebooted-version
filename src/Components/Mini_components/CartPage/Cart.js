import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../../../Context/CartContext'
import { useGlobleContext } from '../../../Context/Globle_Context'
import CartItem from './CartItem'

const Cart = () => {
    const {cart}=useCartContext()
    const {enabled}=useGlobleContext()
    const {cartItems,totalQty,totalPrice}=cart

  return (
    <>
     <Wrapper className='flex justify-around items-center'>
        <table>
           <thead><tr><th>Items</th><th>Quantity</th><th>Price</th></tr></thead>
           <tbody>
           {cartItems?.map((item,i)=>{
                 return <tr key={i} className={` ${
                    enabled ? "even:bg-zinc-700 odd:bg-zinc-800 text-white" : "even:bg-slate-300 odd:bg-white text-black"
                  }`}> 
                       <td><CartItem itemData={item}/></td>
                       <td>{item.itemQty}</td>
                       <td>{item.itemsPrice}</td>
                 </tr>
            })}
           </tbody>
        </table>
        <div>
            <table className='text-white'>
                <tbody>
                    <tr><td>Total Quantity</td><td>{totalQty}</td></tr>
                    <tr><td>Total Price</td><td>{totalPrice}</td></tr>
                </tbody>
            </table>
            
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
`

export default Cart

import React from 'react'
import { useCartContext } from '../../Context/CartContext'
import Cart from '../Mini_components/CartPage/Cart'
import EmptyCart from '../Mini_components/CartPage/EmptyCart'

const CartPage = () => {
    const {cart}=useCartContext()
    console.log(cart)
  return (
    <>
     <div className='mb-auto py-3'>
    {cart.cartItems.length?<><Cart/></>:<><EmptyCart/></>}
     </div>
    </>
  )
}

export default CartPage

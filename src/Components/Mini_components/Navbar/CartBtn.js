import React from 'react'
import {Link} from 'react-router-dom'
import { BsMinecartLoaded } from 'react-icons/bs';
import { useGlobleContext } from '../../../Context/Globle_Context';
const CartBtn = ({navigat}) => {
  const {enabled}=useGlobleContext()
  const {setNavigation,navigation}=navigat
  return (
    <>
     <Link to={`${'/cart'}`} onClick={()=>{setNavigation({type:"offNavEffect",payload:navigation})}}>
     <button
                  type="button"
                  className={`rounded-full ${enabled?'bg-gray-800 text-gray-400 hover:text-white':'bg-slate-300 text-gray-500 hover:text-black'} sm:p-1 lg:p-8  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                >
                  <span className="sr-only">View notifications</span>
                  <BsMinecartLoaded className='h-6 w-6' aria-hidden="true"/>
                </button> 
     </Link>
    </>
  )
}

export default CartBtn

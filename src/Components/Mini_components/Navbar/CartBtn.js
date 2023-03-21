import React from 'react'
// eslint-disable-next-line
import {  BellIcon} from '@heroicons/react/24/outline'
import {Link} from 'react-router-dom'
import { BsMinecartLoaded } from 'react-icons/bs';
import { useGlobleContext } from '../../../Context/Globle_Context';
import { useAuthContext } from '../../../Context/AuthContext';
const CartBtn = () => {
  const {enabled}=useGlobleContext()
  const {user}=useAuthContext()
  return (
    <>
     <Link to={`${user?'/cart':'/login'}`}>
     <button
                  type="button"
                  className={`rounded-full ${enabled?'bg-gray-800 text-gray-400 hover:text-white':'bg-slate-300 text-gray-500 hover:text-black'} sm:p-1 lg:p-8  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                >
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                  <BsMinecartLoaded className='h-6 w-6' aria-hidden="true"/>
                </button> 
     </Link>
    </>
  )
}

export default CartBtn

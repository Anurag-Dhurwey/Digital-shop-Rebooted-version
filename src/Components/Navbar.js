
import { Disclosure} from '@headlessui/react'
import CartBtn from './Mini_components/Navbar/CartBtn'
import logo from '../digitl_shop.png'
import DisclosurePanel from './Mini_components/Navbar/DisclosurePanel'
import DropDownMenu from './Mini_components/Navbar/DropDownMenu'
import LgDisclouserPanel from './Mini_components/Navbar/LgDisclouserPanel'
import MobileMenuBtn from './Mini_components/Navbar/MobileMenuBtn'
import {Link} from 'react-router-dom'
import DarkModeBtn from './Mini_components/Navbar/DarkModeBtn'
import { useGlobleContext } from '../Context/Globle_Context'
import { useReducer} from 'react'
import { navReducer } from '../Reducer/navReducer'
const navTitle = [
  { name: 'Products', href: '/products', current: false ,auth:false},
  { name: 'Categories', href: '/categories', current: false ,auth:false},
  { name: 'Wishlist', href: '/wishlist', current: false,auth:true },
  { name: 'Orders', href: '/orders', current: false ,auth:true},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Navbar=()=> {
  const [navigation,setNavigation]=useReducer(navReducer,navTitle)
  const {enabled}=useGlobleContext()
  return (
    <Disclosure as="nav" className={`${enabled?'bg-gray-800':'bg-slate-300'}`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <MobileMenuBtn open={open}/>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className='block md:hidden lg:hidden absolute left-[40px]'>
                <DarkModeBtn/>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Link to='/'  onClick={()=>{setNavigation({type:"offNavEffect",payload:navigation})}} >
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src={logo}
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src={logo}
                    alt="Your Company"
                  />
                  </Link>
                </div>
                    {/* navigation menu for large devices */}
                    <LgDisclouserPanel class={{classNames,navigation,setNavigation}} />
              </div> 

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* cart icon */}
                <CartBtn />

                {/* Profile dropdown */}
                <DropDownMenu classNames={classNames} />
                <div className='hidden md:block lg:block md:pl-3 lg:pl-8'>
                <DarkModeBtn/>
                </div>
              </div>
            </div>
          </div>
                    {/* navigation menu for Mobile devices */}                 
          <DisclosurePanel class={{classNames,navigation,setNavigation}}/>
        </>
      )}
    </Disclosure>
  )
}

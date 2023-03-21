import React from 'react'
import { Disclosure} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useGlobleContext } from '../../../Context/Globle_Context'

const MobileMenuBtn = ({open}) => {
  const {enabled}=useGlobleContext()
  return (
    <>
     <Disclosure.Button className={`inline-flex items-center justify-center rounded-md p-2 text-white-900 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}>
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className={`block h-6 w-6 ${enabled?'text-yellow-900':'text-gray-900'}`} aria-hidden="true" />
                  ) : (
                    <Bars3Icon className={`block h-6 w-6 ${enabled?'text-yellow-900':'text-gray-900'}`} aria-hidden="true" />
                  )}
                </Disclosure.Button> 
    </>
  )
}

export default MobileMenuBtn
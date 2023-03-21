import React from 'react'
import {Link} from 'react-router-dom'
import { useAuthContext } from '../../../Context/AuthContext'
import { useGlobleContext } from '../../../Context/Globle_Context'
const LgDisclouserPanel = (props) => {
  const {enabled}=useGlobleContext()
  const {user}=useAuthContext()
    const {classNames,navigation,setNavigation}=props.class
  return (
    <>
     <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={!item.auth?item.href:user?item.href:'/login'}
                        onClick={()=>{setNavigation({type:"setCurrent",payload:item})}}
                        className={classNames(
                          item.current ? enabled?'bg-pink-700 text-white':'bg-gray-900 text-white' : enabled?'text-white hover:bg-pink-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium':'text-black hover:bg-pink-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
    </>
  )
}

export default LgDisclouserPanel

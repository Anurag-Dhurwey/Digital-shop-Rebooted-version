import React from 'react'
import {Link} from 'react-router-dom'
import { useGlobleContext } from '../../../Context/Globle_Context'
const LgDisclouserPanel = (props) => {
  const {enabled}=useGlobleContext()
    const {classNames,navigation,setNavigation}=props.class

    const Animate_nav=(item)=>{
      if(item.auth){
          setNavigation({type:"setCurrent",payload:item})
      }else{
        setNavigation({type:"setCurrent",payload:item})
      }
  }

  return (
    <>
     <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={(e)=>{Animate_nav(item,e)}}
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

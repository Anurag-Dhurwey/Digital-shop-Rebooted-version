import React from 'react'
import { useGlobleContext } from '../../Context/Globle_Context'
import { FaSadTear } from 'react-icons/fa'

const Categories = () => {
    const {enabled}=useGlobleContext()
  return (
    <div className='mb-auto'>
      <div className={`px-2 text-center flex flex-col justify-center items-center  ${enabled?'text-white':'text-black'}`}>
            <FaSadTear className='text-4xl'/>
           <h2 className={`font-semibold text-lg`}>Categories not found</h2>
           <p className='text-xs'>products are limited in our stock that's why products are not categorized</p>
      </div>
    </div>
  )
}

export default Categories

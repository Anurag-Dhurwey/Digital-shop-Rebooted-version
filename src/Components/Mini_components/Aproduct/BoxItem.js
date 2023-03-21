import React from 'react'
import { useGlobleContext } from '../../../Context/Globle_Context'

const BoxItem = ({items}) => {
    const {enabled}=useGlobleContext()
  return (
    <>
      <div className={`my-3 ${enabled?'text-white':'text-black'}`}>
    <p>
    <span className='font-bold'>{items.length?'What is in the box :':''}</span> {items?.map((item,i)=>{
            return <span key={i}>{item}</span>
        })}
    </p>
      </div>
    </>
  )
}

export default BoxItem

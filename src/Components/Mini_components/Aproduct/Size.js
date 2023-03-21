import React from 'react'
import { useGlobleContext } from '../../../Context/Globle_Context'

const Size = ({size}) => {
    const {enabled}=useGlobleContext()
  return (
    <>
      <div className={`my-3 ${enabled?'text-white':'text-black'}`}>
        <span>{size.length?'Size : ':''}</span>{size?.map((item,i)=>{
                return <button key={i} value={item} className='p-2 mx-3 cursor-pointer '/>
            })}
      </div>
    </>
  )
}

export default Size

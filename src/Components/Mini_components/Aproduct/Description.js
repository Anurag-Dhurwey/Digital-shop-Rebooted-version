import React from 'react'
import { useGlobleContext } from '../../../Context/Globle_Context'

const Description = ({description}) => {
    const {enabled}=useGlobleContext()
  return (
    <>
     <div className='my-3'>
     <ul className={`${enabled?'text-white':'text-black'}`}>
     {description.desc.map((item,i)=>{
                return <li key={i}>{item}.</li>
              })}
     </ul>
     </div>
    </>
  )
}

export default Description

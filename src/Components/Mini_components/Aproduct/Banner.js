import React from 'react'
import { useGlobleContext } from '../../../Context/Globle_Context'

const Banner = ({banner}) => {
    const {enabled}=useGlobleContext()
  return (
    <>
      <div className={`my-5 w-[100%]   ${enabled?'text-white':'text-black'}`}>
        {banner.map((item,i)=>{
            return (
                <div key={i} className='my-3 py-2'>
                    <figure className='w-[100%] flex justify-center align-middle'>
                    <img src={item.img} alt="Banner_IMG"/>
                </figure>
                {item.desc?.map((item,i)=>{
                    return <p key={i}>{item.key?item.key:item}{item.value?item.value:'.'}</p>
                })}
                </div>
            )
        })}
      </div>
    </>
  )
}

export default Banner

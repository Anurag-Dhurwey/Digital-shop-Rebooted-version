import React from 'react'
import { useGlobleContext } from '../../../../Context/Globle_Context'

const Todays = () => {
    const {state}=useGlobleContext()
    const {products}=state
    console.log(products)
  return (
    <>
      <div>
        <div></div>
        <div className=''>

        </div>
      </div>
    </>
  )
}

export default Todays

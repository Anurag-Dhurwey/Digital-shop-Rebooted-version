import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useGlobleContext } from '../../Context/Globle_Context';
import InternalError from '../InternalError';
import MapOneProduct  from '../Mini_components/Aproduct/MapOneProduct'
const Aproduct = () => {
    const {state,get_A_product}=useGlobleContext()
    const {id}=useParams()
    const {aProduct,getOneError}=state
    
useEffect(()=>{
       get_A_product(id)
       // eslint-disable-next-line
},[id])

  return (
    <div className='container mx-auto mb-auto'>
      {getOneError?<><InternalError/></>:aProduct?<><MapOneProduct aProduct={aProduct}/></>:<><h3>Loading</h3></>}
    </div>
  )
}

export default Aproduct

import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useGlobleContext } from '../../Context/Globle_Context';
// import InternalError from '../InternalError';
import MapOneProduct  from '../Mini_components/Aproduct/MapOneProduct'
const Aproduct = () => {
  // eslint-disable-next-line
    const {state,get_A_product}=useGlobleContext()
    const {id}=useParams()
    const [aProduct,setAproduct]=useState()

// the below line is for when we fetch data from database 
    // const {aProduct,getOneError}=state

    const {products}=state
    console.log(products)
    console.log(id)
    const get_A_product_by_filter=()=>{
          const filteredProduct=products.filter((item)=>{
            return  parseInt(id)===parseInt(item.id)
          })
          setAproduct([...filteredProduct])
          console.log(filteredProduct)
          console.log(aProduct)
    }
useEffect(()=>{

  get_A_product_by_filter()

  // below function will fetch data of single product from database 
      //  get_A_product(id)
       // eslint-disable-next-line
},[id])

  return (
    <div className='container mx-auto mb-auto'>
      {/* the below line is for when a product come from database  */}
      {/* {getOneError?<><InternalError/></>:aProduct?<><MapOneProduct aProduct={aProduct}/></>:<><h3>Loading</h3></>} */}

      {/* the below line is for when a product come from filter method */}
      {aProduct &&<><MapOneProduct aProduct={aProduct}/></>}
    </div>
  )
}

export default Aproduct

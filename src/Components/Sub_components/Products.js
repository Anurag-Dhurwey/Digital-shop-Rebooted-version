import React from 'react'
import { useFilterContext } from '../../Context/FilterContext';
import { useGlobleContext } from '../../Context/Globle_Context'
import InternalError from '../InternalError';
import MapAllProducts from '../Mini_components/Products/MapAllProducts';
import FilterProduct from './FilterProduct';

const Products = () => {
    const {state}=useGlobleContext();
    const {isError}=state
    const {Fstate}=useFilterContext();
    const {filteredProducts}=Fstate
   //  console.log(products)
  return (
    <>
     <div className='container mx-auto mb-auto'>
        <div className='px-2 lg:px-0 md:px-0'>
         {isError?<InternalError/>:<><FilterProduct/><MapAllProducts products={filteredProducts}/></>}
        </div>
        </div> 
    </>
  )
}

export default Products

import React from 'react'
import { useFilterContext } from '../../Context/FilterContext'
import Search from '../Mini_components/FilterProducts/Search'
import SortProducts from '../Mini_components/FilterProducts/SortProducts'

const FilterProduct = () => {
    const {filterMethod,sortMethod}=useFilterContext()
  return (
    <>
     <div className='flex justify-center align-middle'>
        <Search search={filterMethod}/> 
        <SortProducts sort={sortMethod}/>
        </div> 
    </>
  )
}

export default FilterProduct

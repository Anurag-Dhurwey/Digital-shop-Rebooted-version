import React from 'react'
import { useFilterContext } from '../../Context/FilterContext'
import Search from '../Mini_components/FilterProducts/Search'
import SortProducts from '../Mini_components/FilterProducts/SortProducts'

const FilterProduct = () => {
    const {filterMethod,sortMethod}=useFilterContext()
  return (
    <>
     <div className={`flex justify-around align-middle mr-[2px] ${window.innerWidth<321 && 'text-xs'}`}>
        <Search search={filterMethod}/> 
        <SortProducts sort={sortMethod}/>
        </div> 
    </>
  )
}

export default FilterProduct

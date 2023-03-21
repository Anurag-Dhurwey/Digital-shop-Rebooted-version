import React from 'react'
import { useGlobleContext } from '../../../Context/Globle_Context'

const SortProducts = (props) => {
    const {sort}=props
    const {enabled}=useGlobleContext()
  return (
    <>
      <div > 
          <form action="#">
            <label htmlFor="sort" className={`px-2 ${enabled?'text-white':'text-black'}`} >Sort by</label>
            <select name="sort" id="sort" onChange={sort} className={`${enabled?'bg-zinc-900 text-slate-50 border-l-pink-50 ':'bg-slate-50 text-zinc-900 border-1-black'}`} >
              <option value="featured">Select</option>
              <option value="higest">High to Low</option>
              <option value="lowest"> Low to High </option>
              <option value="a_z">A to Z</option>
              <option value="z_a">Z to A</option>
            </select>
          </form>
         </div>
    </>
  )
}

export default SortProducts
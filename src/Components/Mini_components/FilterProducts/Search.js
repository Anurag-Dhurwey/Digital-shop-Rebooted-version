import React from 'react'
import { useGlobleContext } from '../../../Context/Globle_Context'

const Search = (props) => {
    const {search}=props
    const {enabled}=useGlobleContext()
  return (
    <>
     <form onSubmit={(e)=>{e.preventDefault()}}>
        <label htmlFor="search" className={`px-2 ${enabled?'text-white':'text-black'}`} > Search</label>
        <input type="name" id='search' name='search' onChange={(e)=>{search(e)}} className={`${enabled?'bg-zinc-900 text-slate-50 border-l-pink-50 ':'bg-slate-50 text-zinc-900 border-1-black'}`} />
      </form> 
    </>
  )
}

export default Search

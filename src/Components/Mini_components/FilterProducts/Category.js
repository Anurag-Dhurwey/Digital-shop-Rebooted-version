import React from 'react'

const Category = (props) => {
    const {category,sort}=props
  return (
    <>
      <div > 
          <form action="#">
            <label htmlFor="category">Category</label>
            <select name="category" id="category" onChange={(e)=>{sort(e)}}>
              {category.map((item,i)=>{
                return (
                    <option key={i}  value={item} >{item}</option>
                )
              })}
            </select>
          </form>
         </div>
    </>
  )
}

export default Category

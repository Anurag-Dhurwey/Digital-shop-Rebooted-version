import React from 'react'

const Highlights = ({required_meta}) => {
  let meta_length=window.innerWidth >630?5:3
  return (
    <>
      <ul className={`${window.innerWidth<321?'text-[0.75rem]':window.innerWidth>630?'text-base':'text-xs'}`}>
                {required_meta.meta.slice(0,meta_length).map((item, i) => {
                  const { key, value } = item;
                  return (
                    <li key={i}>
                      {key} : {value}
                    </li>
                  );
                })}
              </ul>
    </>
  )
}

export default Highlights

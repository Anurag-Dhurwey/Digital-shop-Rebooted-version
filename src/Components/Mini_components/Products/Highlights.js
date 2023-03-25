import React from 'react'

const Highlights = ({required_meta}) => {
  let meta_length=window.innerWidth >630?5:3
  return (
    <>
      <ul className="text-xs lg:text-base">
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

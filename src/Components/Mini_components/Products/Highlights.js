import React from 'react'

const Highlights = ({required_meta}) => {
  return (
    <>
      <ul className="text-xs lg:text-base">
                {required_meta.meta.map((item, i) => {
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

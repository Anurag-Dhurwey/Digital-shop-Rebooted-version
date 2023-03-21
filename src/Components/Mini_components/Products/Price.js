import React from 'react'

const Price = ({priceData}) => {
    const {price,local_price,enabled,flex}=priceData
  return (
    <>
          <div className={`${flex?'flex ':''}`}>
              <h2 className={`pr-3 font-extrabold marker: ${enabled?'text-white':'text-black'}`}>&#x20B9;{price}</h2>
              <p className={`text-sm  ${flex?'pt-[3px] pl-3':''}`}>
                <span className={`line-through ${enabled?'text-white':'text-black'}`}>&#x20B9;{local_price}</span>{" "}
                <span
                  className={`font-semibold ${
                    enabled ? "text-[#00ff7f]" : "text-green-900"
                  }`}
                >
                  {Math.ceil(100 - (price * 100) / local_price)}% Off{" "}
                </span>
              </p>
            </div>
    </>
  )
}

export default Price

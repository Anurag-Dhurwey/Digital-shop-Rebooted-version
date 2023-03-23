import React from 'react'
import { currency } from '../../../Context/Mini_fuctions/PriceFormater'

const Price = ({priceData}) => {
    const {price,local_price,enabled,flex}=priceData
  return (
    <>
          <div className={`${flex?'flex ':''}`}>
              <h2 className={`pr-3 font-extrabold marker: ${enabled?'text-white':'text-black'}`}>{currency(price)}</h2>
              <p className={`text-sm  ${flex?'pt-[3px] pl-3':''}`}>
                <span className={`line-through ${enabled?'text-white':'text-black'}`}>{currency(local_price)}</span>{" "}
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

import React from 'react'
import { currency } from '../../../Context/Mini_fuctions/PriceFormater'

const Price = ({priceData}) => {
    const {price,local_price,enabled,flex}=priceData
  return (
    <>
          <div className={`${flex?'flex ':''}`}>
              <h2 className={`pr-3 ${window.innerWidth<321?' text-xs font-medium':'font-bold'} marker: ${enabled?'text-white':'text-black'}`}>{currency(price)}</h2>
              <p className={`${window.innerWidth<321?' text-xs':' text-sm '} ${flex?'pt-[3px] pl-3':''}`}>
                <span className={`line-through ${enabled?'text-white':'text-black'}`}>{currency(local_price)}</span>{" "}
                <span
                  className={` ${window.innerWidth<321?' text-xs font-medium':'font-bold'} ${
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

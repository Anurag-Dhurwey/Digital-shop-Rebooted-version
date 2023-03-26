import React from "react";
import { Link } from "react-router-dom";
import { useGlobleContext } from "../../../../Context/Globle_Context";
import { currency } from "../../../../Context/Mini_fuctions/PriceFormater";
const ProductsTemplate = ({products}) => {
  const { enabled } = useGlobleContext();
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-1 md:gap-3 lg:gap-4">
        {products.map((item, i) => {
          const { title, price, local_price, image } = item.attributes;
          // eslint-disable-next-line
          const { head_img, banner_img } = image;
          return (
            <div key={i} className="">
              <div className="w-[auto]  md:w-[auto] lg:w-[auto] h-[120px] md:h-[175px] lg:h-[230px] overflow-hidden">
                <figure className="flex justify-center align-middle ">
                  <Link to={`/product/${item.id}`}>
                    <img className="" src={head_img[0]} alt="product" />
                  </Link>
                </figure>
              </div>
              <div className={`${enabled ? "bg-black" : "bg-white"}`}>
                <div className="flex justify-around align-middle py-2">
                  <div>
                    <h3 className="font-bold text-[0.60rem] lg:text-base md:text-base pt-[6px] md:pt-[0px] lg:pt-[0px]">
                     {currency(price)}
                    </h3>
                  </div>
                  <div>
                    <h3 className="">
                      <span className="line-through text-[0.55rem] lg:text-base md:text-base">
                       {currency(local_price)}
                      </span>{" "}
                      <span
                        className={` ${
                          enabled ? "text-[#00ff7f]" : "text-green-900"
                        } text-[0.55rem] lg:text-base md:text-base`}
                      >
                        {Math.ceil(100 - (price * 100) / local_price)}% Off{" "}
                      </span>
                    </h3>
                  </div>
                </div>
                <p className=" text-xs lg:text-base md:text-base">
                  <Link to={`/product/${item.id}`}>
                    {window.innerWidth>320 && title.slice(0, 25)}
                    {window.innerWidth<321 && title.slice(0, 20)}....
                  </Link>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductsTemplate;

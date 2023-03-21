import React from "react";
import { Link } from "react-router-dom";
import { useGlobleContext } from "../../../../Context/Globle_Context";
const ProductsTemplate = () => {
  const { state, enabled } = useGlobleContext();
  let { featuredProducts } = state;
  featuredProducts =
    window.innerWidth > 640
      ? window.innerWidth > 768
        ? featuredProducts
        : featuredProducts.slice(0, 4)
      : featuredProducts.slice(0, 3);
  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-1 md:gap-3 lg:gap-4">
        {featuredProducts.map((item, i) => {
          const { title, price, local_price, image } = item.attributes;
          // eslint-disable-next-line
          const { head_img, banner_img } = image;
          return (
            <div key={i} className="">
              <div className="w-[auto]  md:w-[auto] md:h-[150px] lg:w-[auto] lg:h-[200px] overflow-hidden">
                <figure className="flex justify-center align-middle ">
                  <Link to={`/product/${item.id}`}>
                    <img className="" src={head_img[0]} alt="product" />
                  </Link>
                </figure>
              </div>
              <div className={`${enabled ? "bg-black" : "bg-white"}`}>
                <div className="flex justify-around align-middle py-2">
                  <div>
                    <h3 className="font-bold text-[0.70rem] lg:text-base md:text-base pt-[6px] md:pt-[0px] lg:pt-[0px]">
                      &#x20B9;{price}
                    </h3>
                  </div>
                  <div>
                    <h3 className="">
                      <span className="line-through text-[0.70rem] lg:text-base md:text-base">
                        &#x20B9;{local_price}
                      </span>{" "}
                      <span
                        className={` ${
                          enabled ? "text-[#00ff7f]" : "text-green-900"
                        } text-[0.70rem] lg:text-base md:text-base`}
                      >
                        {Math.ceil(100 - (price * 100) / local_price)}% Off{" "}
                      </span>
                    </h3>
                  </div>
                </div>
                <p className=" text-xs lg:text-base md:text-base">
                  <Link to={`/product/${item.id}`}>
                    {title.slice(0, 25)}....
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

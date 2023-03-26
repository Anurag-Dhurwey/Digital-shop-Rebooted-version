import React from "react";
import { useGlobleContext } from "../../../../Context/Globle_Context";
import Carousel from "../Carousel";

const Featured = ({ ProductsTemplate, title }) => {
  const { state, enabled } = useGlobleContext();
  let { featuredProducts } = state;
  return (
    <>
      {featuredProducts && <div className={`${enabled ? " text-white" : " text-black"}`}>
        <div className="text-start relative z-[2]">
          <h2 className="py-1 md:py-3 lg:py-3 font-bold pl-2 md:pl-10 lg:pl-10 md:text-xl lg:text-xl">
            {title}
          </h2>
        </div>
        <Carousel>
          <ProductsTemplate
            products={
              window.innerWidth > 640
                ? window.innerWidth > 820
                  ? featuredProducts.slice(0, 4)
                  : featuredProducts.slice(0, 3)
                : featuredProducts.slice(0, 2)
            }
          />
          <ProductsTemplate
            products={
              window.innerWidth > 640
                ? window.innerWidth > 820
                  ? featuredProducts.slice(4, 8)
                  : featuredProducts.slice(3, 6)
                : featuredProducts.slice(2, 4)
            }
          />
          <ProductsTemplate
            products={
              window.innerWidth > 640
                ? window.innerWidth > 820
                  ? featuredProducts.slice(8, 12)
                  : featuredProducts.slice(6, 9)
                : featuredProducts.slice(4, 6)
            }
          />
          <ProductsTemplate
            products={
              window.innerWidth > 640
                ? window.innerWidth > 820
                  ? featuredProducts.slice(12, 16)
                  : featuredProducts.slice(9, 12)
                : featuredProducts.slice(6, 8)
            }
          />
        </Carousel>
      </div>}
    </>
  );
};

export default Featured;

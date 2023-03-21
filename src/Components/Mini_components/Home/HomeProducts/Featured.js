import React from "react";
import { useGlobleContext } from "../../../../Context/Globle_Context";
import Carousel from "../Carousel";

const Featured = ({ ProductsTemplate, title }) => {
  const { enabled } = useGlobleContext();
  return (
    <>
      <div className={`${enabled ? " text-white" : " text-black"}`}>
        <div className="text-start">
          <h2 className="py-1 md:py-3 lg:py-3 font-bold pl-2 md:pl-10 lg:pl-10 md:text-xl lg:text-xl">
            {title}
          </h2>
        </div>
        <Carousel>
          <ProductsTemplate />
          <ProductsTemplate />
          <ProductsTemplate />
          <ProductsTemplate />
        </Carousel>
      </div>
    </>
  );
};

export default Featured;

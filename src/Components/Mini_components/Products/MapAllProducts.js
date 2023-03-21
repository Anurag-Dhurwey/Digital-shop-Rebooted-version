import React from "react";
import { Link } from "react-router-dom";
import { useGlobleContext } from "../../../Context/Globle_Context";
import Highlights from "./Highlights";
import Price from "./Price";
import RatingReview from "./RatingReview";

const MapAllProducts = (props) => {
  const { enabled } = useGlobleContext();
  const { products } = props;
  return (
    <>
      {products?.map((item, i) => {
       
        const {
          title,
          price,
          local_price,
         //  slug,
         //  qty,
         //  description,
         //  category,
         //  size,
         //  colour,
          required_metadata,
         //  metadata,
          rating,
          image,
         //  hero_image,
         //  box_item,
         //  publishedAt,
        } = item.attributes;
        // eslint-disable-next-line
        const { head_img, banner_img } = image;
        return (
          <div
            className={`flex justify-center lg:gap-5  gap-1  my-3 ${
              enabled ? "text-white" : ""
            } `}
            key={item.id}
          >
            <div>
              <figure className="lg:h-[300px] lg:w-[300px] md:h-[300px] md:w-[300px] w-[145px]  overflow-hidden">
                <Link to={`/product/${item.id}`} >
                  <img src={head_img[1]} alt="product_Img" onMouseEnter={console.log("this")} />
                </Link>
              </figure>
            </div>
            <div>
              <h2 className="font-bold  text-xs lg:text-base  lg:w-[600px] md:text-base  ">
                {" "}
                <Link to={`/product/${item.id}`}>
                  {window.innerWidth > 640 ? title : title.slice(0, 50)}....
                </Link>
              </h2>
              <RatingReview rating={rating}/>
              <Highlights required_meta={required_metadata}/>
            </div>
            <Price priceData={{price,local_price,enabled}}/>
          </div>
        );
      })}
    </>
  );
};

export default MapAllProducts;

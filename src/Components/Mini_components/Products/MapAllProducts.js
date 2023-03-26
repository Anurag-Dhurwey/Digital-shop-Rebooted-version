import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../Context/AuthContext";
import { useGlobleContext } from "../../../Context/Globle_Context";
import { useWishlistContext } from "../../../Context/WishlistContext";
import Highlights from "./Highlights";
import Price from "./Price";
import RatingReview from "./RatingReview";

const MapAllProducts = (props) => {
  const { enabled } = useGlobleContext();
  const { user } = useAuthContext();
  const { Wishlist, postWishlist, DELETEWishlist } = useWishlistContext();
  const { products } = props;

  return (
    <>
      {products?.map((item, i) => {
        const { id, attributes } = item;
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
        } = attributes;
        // eslint-disable-next-line
        const { head_img, banner_img } = image;

        const wishlised_Or_Not = Wishlist?.filter((item) => {
          return item.attributes.wishlist.id === id;
        });

        return (
          <div
            className={`flex justify-around lg:gap-5  gap-1  my-3 ${
              enabled ? "text-white" : ""
            } `}
            key={item.id}
          >
            <div>
              <figure className="  lg:h-[300px] lg:w-[300px] md:h-[300px] md:w-[300px] w-[100px]  overflow-hidden relative">
                {user && (
                  <AiFillHeart
                    onClick={() => {
                      wishlised_Or_Not.length
                        ? DELETEWishlist(wishlised_Or_Not[0].id)
                        : postWishlist(item);
                    }}
                    className={`rounded-full bg-gray-600  text-2xl absolute left-[80%]  cursor-pointer ${
                      Wishlist
                        ? wishlised_Or_Not.length
                          ? "hover:text-white text-red-600"
                          : "hover:text-red-600 text-white"
                        : "hover:text-red-600 text-white"
                    }`}
                  />
                )}
                <Link to={`/product/${item.id}`}>
                  <img src={head_img[1]} alt="product_Img" />
                </Link>
              </figure>
            </div>
            <div className="max-w-[600px]">
              <h2 className="font-bold  text-xs lg:text-base  lg:w-[600px] md:text-base  ">
                {" "}
                <Link to={`/product/${item.id}`}>
                  {title && window.innerWidth > 640 && title}
                  {title && window.innerWidth < 640 &&window.innerWidth > 320 && title.substring(0, 50)+'...'}
                  {title && window.innerWidth < 321 && title.substring(0, 15)+'...'}
                </Link>
              </h2>
              <RatingReview rating={rating} />
              <Highlights required_meta={required_metadata} />
            </div>
            <Price priceData={{ price, local_price, enabled }} />
          </div>
        );
      })}
    </>
  );
};

export default MapAllProducts;

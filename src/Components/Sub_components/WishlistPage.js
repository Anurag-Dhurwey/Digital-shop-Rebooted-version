import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { useGlobleContext } from "../../Context/Globle_Context";
import { useWishlistContext } from "../../Context/WishlistContext";
import WishHighlights from "../Mini_components/WishlistPage/WishHighlights";
import Price from "../Mini_components/Products/Price";
import RatingReview from "../Mini_components/Products/RatingReview";

const MapAllProducts = () => {
  const { enabled } = useGlobleContext();
  const { user } = useAuthContext();
  const { Wishlist, postWishlist, DELETEWishlist } = useWishlistContext();

  return (
    <>
      {Wishlist?.map((item, i) => {
        const { id, attributes } = item.attributes.wishlist;

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
            className={`flex justify-around lg:gap-5 md:gap-2 gap-1  ${
              enabled ? "text-white" : ""
            } mt-1 border-solid border-2 border-pink-700 `}
            key={item.id}
          >
            <div>
              <figure className="w-[100px] md:w-[150px] lg:w-[200px] h-[100px] md:h-[150px] lg:h-[200px] overflow-hidden relative">
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
              <h2 className="font-bold  text-xs lg:text-base  lg:w-[600px] md:text-base ">
                {" "}
                <Link to={`/product/${item.id}`}>
                  {title && window.innerWidth > 640 && title}
                  {title && window.innerWidth < 640 && title.substring(0, 50)}
                </Link>
              </h2>
              <RatingReview rating={rating} />
              <WishHighlights required_meta={required_metadata} />
            </div>
            <Price priceData={{ price, local_price, enabled }} />
          </div>
        );
      })}
    </>
  );
};

export default MapAllProducts;
import React from "react";
import { useGlobleContext } from "../../../Context/Globle_Context";
import AproductImages from "./AproductImages";
import AddToCartBtn from "./AddToCartBtn";
import RequiredMeta from "./RequiredMeta";
import Price from "../Products/Price";
import RatingReview from "../Products/RatingReview";
import Description from "./Description";
import Banner from "./Banner";
import Featured from "../Home/HomeProducts/Featured";
import ProductsTemplate from "../Home/HomeProducts/ProductsTemplate";
import BoxItem from "./BoxItem";
import Size from "./Size";
const MapOneProduct = ({ aProduct }) => {
  const { enabled } = useGlobleContext();
  return (
    <>
      {aProduct?.map((item, i) => {
        // eslint-disable-next-line
        const {
          title,
          price,
          local_price,
          // slug,
          qty,
          description,
          // category,
          size,
          // colour,
          required_metadata,
          // metadata,
          rating,
          image,
          box_items,
        } = item.attributes;
        return (
          <div key={item.id}>
            <div  className="flex-col justify-center items-center md:grid md:grid-cols-2 md:gap-2 lg:grid lg:grid-cols-2 lg:gap-2">
            <AproductImages image={image} />
            <div className="details">
              <h3 className={`${enabled?'text-white':'text-black'}`}>{title}</h3>
              <RatingReview rating={rating}/>
             
              <Price priceData={{price,local_price,enabled,flex:true}}/>
              
              <AddToCartBtn stock={qty} product={item}  />
              <Size size={size?size.size:[]}/>
              <RequiredMeta metaData={required_metadata}/>
              <Description description={description}/>
              
            </div>
          </div>
          <BoxItem items={box_items?box_items.items:[]}/>
          
          <div className="recomended products">
               <Featured ProductsTemplate={ProductsTemplate} title={'Recomended Products'}/>
          </div>
          <Banner banner={image.banner_img}/>
          <div className="Featured products">
               <Featured ProductsTemplate={ProductsTemplate} title={'Featured Products'}/>
          </div>
          <div className="You may also like">
               <Featured ProductsTemplate={ProductsTemplate} title={'You may also like'}/>
          </div>
          </div>
        );
      })}
    </>
  );
};

export default MapOneProduct;

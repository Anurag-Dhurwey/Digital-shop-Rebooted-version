import React, { useEffect, useState } from "react";
import { getOneProductApi } from "../../../Context/Mini_fuctions/GetProductApi";
import { Link } from "react-router-dom";
const CartItem = ({ itemData }) => {
  const { attributes, id } = itemData;
  const { title, price, image } = attributes;
  const [Avilable_stock, setStock] = useState("");

  const currentItem = async () => {
    const res = await getOneProductApi(id);
    setStock(res.data.attributes.qty);
  };
  useEffect(() => {
    currentItem();
    // eslint-disable-next-line 
  }, [id]);
  return (
    <>
      <div className=" grid grid-cols-2 gap-2">
        <div className="flex justify-center items-center">
          <figure className="w-[50px] h-[50px] overflow-hidden">
            <Link to={`/product/${id}`}>
              <img src={image.head_img[0]} alt="product_Img" />
            </Link>
          </figure>
        </div>
        <div>
          <p>{title.slice(0, 30)}...</p>
          <p>Available in stock {Avilable_stock}</p>
          <p>{price}</p>
        </div>
      </div>
    </>
  );
};

export default CartItem;

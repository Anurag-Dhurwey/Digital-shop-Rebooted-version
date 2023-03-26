import React, { useEffect, useState } from "react";
import { getOneProductApi } from "../../../Context/Mini_fuctions/GetProductApi";
import { Link } from "react-router-dom";
import { currency } from "../../../Context/Mini_fuctions/PriceFormater";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { useCartContext } from "../../../Context/CartContext";
import { message } from "antd";
const CartItem = ({ itemData, setReady_to_checkout }) => {
  // eslint-disable-next-line
  const { cart, addToCart } = useCartContext();
  const { attributes, id, itemQty } = itemData;
  const { title, price, image } = attributes;
  const [Avilable_stock, setStock] = useState("");
  const [Qty, setQty] = useState();

  // fuctions for increasing and deacreasing items Qty
  const incQty = () => {
    Avilable_stock && Avilable_stock > Qty
      ? setQty(Qty + 1)
      : setQty(Avilable_stock);
    if (Avilable_stock > Qty) {
      addToCart(itemData, undefined, {
        ref: "CALL_FROM_CART",
        plush_Or_Minus: 1,
      });
    } else
      message.warning(`Only ${Avilable_stock} Items are available in stock`);
  };
  const decQty = () => {
    Qty > 1 ? setQty(Qty - 1) : setQty(1);
    if (Qty > 1) {
      addToCart(itemData, undefined, {
        ref: "CALL_FROM_CART",
        plush_Or_Minus: 0,
      });
    } else {
      // here a fuction will render to remove the item from cart

      message.warning(`Product is removed from the cart`);
    }
  };

  const currentItem = async () => {
    const res = await getOneProductApi(id);
    if (res) {
      const { error } = res;
      if (!error) {
        setStock(res.data.attributes.qty);
        setQty(itemQty);
        setReady_to_checkout(true);
      } else {
        console.log("can not get data of one Product api in cartPage");
      }
    } else {
      console.log("can not get data of one Product api in cartPage");
    }
  };

  useEffect(() => {
    // this below fuction will call the latest stock quantity form database
    currentItem();
    // eslint-disable-next-line
  }, [id, itemQty]);
  return (
    <>
      <div className=" grid grid-cols-2 gap-2">
        <div className="flex justify-center items-center">
          <figure className="w-[100px] h-[100px] overflow-hidden">
            <Link to={`/product/${id}`}>
              <img src={image.head_img[0]} alt="product_Img" />
            </Link>
          </figure>
        </div>
        <div className="text-xs lg:text-base md:text-base">
          <p>{title.slice(0, 30)}...</p>
          <p
            className={`px-1 w-fit ${
              Avilable_stock ? "bg-green-700" : "bg-yellow-700"
            }`}
          >
            {Avilable_stock ? "Available" : "Out of stock"}{" "}
            {Avilable_stock ? (
              Avilable_stock < 5 ? (
                <>: only {Avilable_stock}</>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </p>
          <p>{currency(price)}</p>
          <h4 className="my-1 flex justify-start items-center lg:gap-x-5 md:gap-x-5 gap-x-3 ">
            <button className="text-lg md:text-xl lg:text-xl" onClick={decQty}>
              <AiFillMinusCircle />
            </button>
            <span>{Qty}</span>
            <button className="text-lg md:text-xl lg:text-xl" onClick={incQty}>
              <AiFillPlusCircle />
            </button>
          </h4>
        </div>
      </div>
    </>
  );
};

export default CartItem;

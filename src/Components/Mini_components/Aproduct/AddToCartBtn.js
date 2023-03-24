import React from "react";
import { useState } from "react";
import { useAuthContext } from "../../../Context/AuthContext";
import { useCartContext } from "../../../Context/CartContext";
import { useGlobleContext } from "../../../Context/Globle_Context";
import { useNavigate } from "react-router-dom";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
const AddToCartBtn = ({ stock, product }) => {
  const { enabled } = useGlobleContext();
  // eslint-disable-next-line
  const { addToCart, CheckoutItem, setCheckoutItem } = useCartContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const DecQty = () => {
    qty > 1 ? setQty(qty - 1) : setQty(1);
  };
  const IncQty = () => {
    stock && stock > qty ? setQty(qty + 1) : setQty(stock);
  };

  const totalPrice = product.attributes.price * qty;

  const buynow = () => {
    user ? navigate("/checkout") : navigate("/login");
    setCheckoutItem({
      totalQty: qty,
      totalPrice,
      orderItems: [{ ...product, itemQty: qty, itemPrice: totalPrice }],
    });
  };

  return (
    <div>
      <div className="quantity">
        <h3
          className={`pl-2 my-2 flex justify-start items-center gap-x-4 ${
            enabled ? "text-white" : "text-black"
          }`}
        >
          <span className={` cursor-pointer text-xl `} onClick={DecQty}>
            <AiFillMinusCircle />
          </span>
          <span className={`px-2 `}>{qty}</span>
          <span className={` cursor-pointer text-xl`} onClick={IncQty}>
            <AiFillPlusCircle />
          </span>
        </h3>
      </div>
      <div className={`my-3`}>
        <button
          className="bg-yellow-500 text-blue-50 px-5 mx-1 py-2"
          onClick={() => {
            user ? addToCart(product, qty) : navigate("/login");
          }}
        >
          {" "}
          Add to cart
        </button>
        <button
          className="bg-yellow-500 text-blue-50 px-5 mx-1 py-2"
          onClick={buynow}
        >
          {" "}
          Buy now
        </button>
      </div>
    </div>
  );
};

export default AddToCartBtn;

import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { useCartContext } from "../../Context/CartContext";
import { useGlobleContext } from "../../Context/Globle_Context";
import Cart from "../Mini_components/CartPage/Cart";
import EmptyCart from "../Mini_components/CartPage/EmptyCart";

const CartPage = () => {
  const { cart } = useCartContext();
  const { enabled } = useGlobleContext();
  const { user } = useAuthContext();
  return (
    <>
      <div className="mb-auto py-3">
        {!user && (
          <div
            className={`mt-5 flex flex-col justify-center items-center h-min ${
              enabled ? "text-white" : "text-black"
            }`}
          >
            <div className="font-medium">Not found</div>
            <div className="mt-4">
              <Link to={"/login"} className="px-3 py-1 bg-yellow-700">
                Login
              </Link>
            </div>
          </div>
        )}
        {user && (
          <div>
            {cart && cart.cartItems.length ? (
              <>
                <Cart />
              </>
            ) : (
              <>
                <EmptyCart />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;

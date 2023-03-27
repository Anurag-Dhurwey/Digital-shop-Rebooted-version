import React from "react";
import { useAuthContext } from "../../../Context/AuthContext";
import { GrStatusGood } from "react-icons/gr";
import { useGlobleContext } from "../../../Context/Globle_Context";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const { user } = useAuthContext();
  const { enabled } = useGlobleContext();
  return (
    <>
     <div className="mb-auto w-[100%] h-[100%] bg-green-600 text-white">
     {user && (
        <div
          className={`mt-5 flex flex-col justify-center items-center `}
        >
          <div className="text-4xl">
            <GrStatusGood />
          </div>
          <h2 className="font-medium mt-2">Order placed successfully</h2>
          <Link
            to={"/orders"}
            className="font-medium mt-5 px-3 py-2 bg-yellow-700"
          >
            View Orders
          </Link>
        </div>
      )}
      {!user && (
        <div
          className={`mt-5 flex flex-col justify-center items-center h-min ${
            enabled ? "text-white" : "text-black"
          }`}
        >
          <div className="font-medium">Wishlist not found</div>
          <div className="mt-4">
            <Link to={"/login"} className="px-3 py-1 bg-yellow-700">
              Login
            </Link>
          </div>
        </div>
      )}
     </div>
    </>
  );
};

export default OrderSuccess;

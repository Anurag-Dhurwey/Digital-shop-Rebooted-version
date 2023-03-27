import React from "react";
import { BsCart4 } from "react-icons/bs";
import { useGlobleContext } from "../../../Context/Globle_Context";

const EmptyCart = () => {
  const { enabled } = useGlobleContext();
  return (
    <>
      <div className="mb-auto">
        <div
          className={`text-center font-medium ${
            enabled ? "text-white" : "text-black"
          } flex flex-col justify-center items-center`}
        >
         <div className=" text-4xl"> <BsCart4/></div>
          <h3>Empty cart</h3>
        </div>
      </div>
    </>
  );
};

export default EmptyCart;

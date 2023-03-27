import React from "react";
import { useGlobleContext } from "../../../Context/Globle_Context";

const EmptyCart = () => {
  const { enabled } = useGlobleContext();
  return (
    <>
      <div className="mb-auto">
        <div
          className={`text-center font-medium ${
            enabled ? "text-white" : "text-black"
          }`}
        >
          <h3>Empty cart</h3>
        </div>
      </div>
    </>
  );
};

export default EmptyCart;

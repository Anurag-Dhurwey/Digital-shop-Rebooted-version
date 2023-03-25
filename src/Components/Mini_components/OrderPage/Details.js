import React from "react";
import { useGlobleContext } from "../../../Context/Globle_Context";

const Details = ({ detail }) => {
  const {enabled}=useGlobleContext()
  const { updatedAt, order_Id, transaction_id } = detail;
  return (
    <>
      <div className={` py-1 ${enabled?'text-white':'text-black'} ${window.innerWidth>630?'text-sm':'text-xs'}` }>
        <p><span className="font-medium">Date :</span>  {updatedAt}</p>
        <p><span className="font-medium">Order Id :</span> {order_Id}</p>
        <p><span className="font-medium">Transaction Id :</span> {transaction_id}</p>
      </div>
    </>
  );
};

export default Details;

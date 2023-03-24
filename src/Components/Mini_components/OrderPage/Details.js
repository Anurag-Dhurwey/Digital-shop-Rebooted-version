import React from "react";

const Details = ({ detail }) => {
  const { updatedAt, order_Id, transaction_id } = detail;
  return (
    <>
      <div className="text-sm py-1 ">
        <p>Date : {updatedAt}</p>
        <p>Order Id : {order_Id}</p>
        <p>Transaction Id : {transaction_id}</p>
      </div>
    </>
  );
};

export default Details;

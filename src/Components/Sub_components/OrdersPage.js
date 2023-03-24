import React, { useState } from "react";
import { currency } from "../../Context/Mini_fuctions/PriceFormater";
import { useOrederContext } from "../../Context/OrderContext";
import { Link } from "react-router-dom";
import Details from "../Mini_components/OrderPage/Details";
import { useGlobleContext } from "../../Context/Globle_Context";
const OrdersPage = () => {
  const {enabled}=useGlobleContext()
  const { OrdersData } = useOrederContext();
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <div className="mb-auto">
      {  window.innerWidth < 640 && (
          <div className="sticky top-0">
            <button
              className="text-xs bg-green-800 px-1 py-1 rounded-[15px]"
              onClick={() => {
                setShowDetails(showDetails ? false : true);
              }}
            >
              Open details
            </button>
          </div>
        )}
        {OrdersData &&
          OrdersData.map((item, i) => {
            const { order_Id, transaction_id, products, updatedAt, status } =
              item.attributes;
            const { orderItems, totalPrice, totalQty } = products;
            return (
              <div
                className="my-1 border-solid border-2 border-pink-700"
                key={i}
              >
                <div>
                  {orderItems &&
                    orderItems.map((item, i) => {
                      const { image, title, price } = item.attributes;
                      const { head_img } = image;
                      return (
                        <div
                          className="flex  justify-around  lg:gap-5 md:gap-2 gap-1 "
                          key={i}
                        >
                          <div>
                            <figure className="w-[100px] md:w-[150px] lg:w-[200px] h-[100px] md:h-[150px] lg:h-[200px] overflow-hidden">
                              <Link to={`/product/${item.id}`}>
                                <img src={head_img[0]} alt="product_Img" />
                              </Link>
                            </figure>
                          </div>
                          <div className={`lg:max-w-[600px] md:max-w-[500px] max-w-[200px] ${enabled?'text-white':'text-black'}`}>
                            <h2 className="font-bold  text-xs lg:text-base  lg:w-[600px] md:text-base  ">
                              <Link to={`/product/${item.id}`}>
                                {window.innerWidth > 640
                                  ? title
                                  : title.slice(0, 30)+"...."}
                              </Link>
                            </h2>
                            <h6 className="text-xs">{currency(price)}</h6>
                            {window.innerWidth > 640 && (
                              <Details
                                detail={{ updatedAt, order_Id, transaction_id }}
                              />
                            )}
                          </div>
                          <div className={`${enabled?'text-white':'text-black'}`}>
                            <h2 className="text-xs lg:text-base md:text-base font-medium lg:font-extrabold md:font-extrabold">
                              Total quantity : {totalQty}
                            </h2>
                            <h2 className="text-xs lg:text-base md:text-base font-medium lg:font-extrabold md:font-extrabold">
                              Total amount : {currency(totalPrice)}
                            </h2>
                            <h2
                              className={`py-1 px-1 text-xs w-fit ${
                                status ? "bg-green-800" : "bg-red-700"
                              }`}
                            >
                              {status ? status : "Payment Failed"}
                            </h2>
                          </div>
                        </div>
                      );
                    })}
                </div>
                {window.innerWidth < 640 && showDetails && (
                  <Details detail={{ updatedAt, order_Id, transaction_id }} />
                )}
              </div>
            );
          })}
        
      </div>
    </>
  );
};

export default OrdersPage;

import React, { useState } from "react";
import {MdDoNotDisturb} from 'react-icons/md'
import { currency } from "../../Context/Mini_fuctions/PriceFormater";
import { useOrederContext } from "../../Context/OrderContext";
import { Link } from "react-router-dom";
import Details from "../Mini_components/OrderPage/Details";
import { useGlobleContext } from "../../Context/Globle_Context";
import { useAuthContext } from "../../Context/AuthContext";
const OrdersPage = () => {
  const { enabled } = useGlobleContext();
  const {user}=useAuthContext()
  const { OrdersData } = useOrederContext();
  const [showDetails, setShowDetails] = useState(false);
  console.log(OrdersData)
  return (
    <>
      <div className="mb-auto">
        {!user && <div className={`mt-5 flex flex-col justify-center items-center h-min ${enabled?'text-white':'text-black'}`}>
               <div className="font-medium">Orders not found</div>
               <div className="mt-4"><Link to={'/login'} className="px-3 py-1 bg-yellow-700">Login</Link></div>
          </div>}
        {user && <div>
          
          {OrdersData.length<1 && <div>

            <div
                className={`mt-5 flex flex-col justify-center items-center  ${
                  enabled ? "text-white" : "text-black"
                }`}
              >
                <div className="text-4xl">
                  <MdDoNotDisturb />
                </div>
                <div className="font-medium">You have not ordered yet.</div>
              </div>

          </div>}



{/* Below logic will run when Ordered Items are available  */}
          <div>
          {OrdersData&& OrdersData.length && window.innerWidth < 640 && (
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
                className="my-[1px] border-solid border-[2px] border-pink-700"
                key={i}
              >
                <div>
                  {orderItems &&
                    orderItems.map((item, i) => {
                      const { image, title, price } = item.attributes;
                      const { head_img } = image;
                      return (
                        <div
                          className={`flex mt-1 justify-around  lg:gap-x-5 md:gap-x-2 gap-x-1 ${i!==orderItems.length-1 ?'h-[50px] md:h-[80px] lg:h-[100px] overflow-hidden':''}`}
                          key={i}
                        >
                          <div>
                            <figure className="w-[50px] md:w-[80px] lg:w-[100px] h-[50px] md:h-[80px] lg:h-[100px] overflow-hidden">
                              <Link to={`/product/${item.id}`}>
                                <img src={head_img[0]} alt="product_Img" />
                              </Link>
                            </figure>
                          </div>
                          <div
                            className={`lg:max-w-[600px] md:max-w-[500px] max-w-[200px] ${
                              enabled ? "text-white" : "text-black"
                            }`}
                          >
                            <h2 className="font-bold  text-xs lg:text-sm  lg:w-[600px] md:text-sm  ">
                              <Link to={`/product/${item.id}`}>
                                {window.innerWidth > 640
                                  ? title
                                  : title.slice(0, 30) + "...."}
                              </Link>
                            </h2>
                            <h6 className="text-xs">Price : <span>{currency(price)}</span> Qty : <span>{item.itemQty}</span></h6>
                            {window.innerWidth > 640 && (
                              <div className={`${i !== orderItems.length-1 ? "invisible" : ""}`}>
                                <Details
                                  detail={{
                                    updatedAt,
                                    order_Id,
                                    transaction_id,
                                  }}
                                />
                              </div>
                            )}
                          </div>
                          {
                            <div
                              className={`${
                                enabled ? "text-white" : "text-black"
                              } ${i !== orderItems.length-1 ? "invisible" : ""}`}
                            >
                              <h2 className="text-xs lg:text-base md:text-base font-medium lg:font-extrabold md:font-extrabold">
                                Net quantity : {totalQty}
                              </h2>
                              <h2 className="text-xs lg:text-base md:text-base font-medium lg:font-extrabold md:font-extrabold">
                              Net amount : {currency(totalPrice)}
                              </h2>
                              <h2
                                className={`py-1 px-1 text-xs w-fit ${
                                  status ? "bg-green-800" : "bg-red-700"
                                }`}
                              >
                                {status ? "Order placed" : "Payment Failed"}
                              </h2>
                            </div>
                          }
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

          </div>}
      </div>
    </>
  );
};

export default OrdersPage;

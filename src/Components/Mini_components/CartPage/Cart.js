import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../../Context/CartContext";
import { useGlobleContext } from "../../../Context/Globle_Context";
import { currency } from "../../../Context/Mini_fuctions/PriceFormater";
import CartItem from "./CartItem";
import { useAuthContext } from "../../../Context/AuthContext";
import { message } from "antd";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { cart, CheckoutItem, setCheckoutItem ,selected_items_to_order, setSelected_items_to_order} = useCartContext();
  const { enabled } = useGlobleContext();
  const { cartItems, totalQty, totalPrice } = cart;
  const [ready_to_checkout, setReady_to_checkout] = useState(false);

  const [calculatedTotalQty, setCalculatedTotalQty] = useState(totalQty);
  const [calculatedTotalPrice, setCalculatedTotalPrice] = useState(totalPrice);

  // this below function will reverse the cartItems array to get latest updated products
  const reverseArr = (cartItems) => {
    let ReversedCartItemsArr = [];
    for (let i = cartItems.length - 1; i >= 0; i--) {
      ReversedCartItemsArr.push(cartItems[i]);
    }
    return ReversedCartItemsArr;
  };

  const buynow = () => {
    if (ready_to_checkout) {
      if(selected_items_to_order.length>0){
        setCheckoutItem({
          totalQty: calculatedTotalQty,
          totalPrice: calculatedTotalPrice,
          orderItems: [...selected_items_to_order],
        });
        if (CheckoutItem) {
          user ? navigate("/checkout") : navigate("/login");
        }
      }else{
        message.error(`No selected items to Checkout`)
      }
    } else {
      message.error(`Items are not ready (Please Refresh this page)`);
    }
  };

  // the below function is logic of checked or unchecked items 
  const checkedItems = (item) => {
    console.log(selected_items_to_order);
    const isExist = selected_items_to_order.filter((ele) => {
      return item.id === ele.id;
    });

    let P;
    let Q;

    if (isExist.length > 0) {
      const newSelectedItemsToOrder = selected_items_to_order.filter((ele) => {
        if (item.id === ele.id) {
          Q = item.itemQty;
          P = item.itemsPrice;
        }
        return item.id !== ele.id;
      });
      setSelected_items_to_order([...newSelectedItemsToOrder]);
      setCalculatedTotalPrice(calculatedTotalPrice - P);
      setCalculatedTotalQty(calculatedTotalQty - Q);
      console.log(newSelectedItemsToOrder);
      console.log("removed");
    } else {
      Q = item.itemQty;
      P = item.itemsPrice;
      setSelected_items_to_order([...selected_items_to_order, { ...item }]);
      setCalculatedTotalPrice(calculatedTotalPrice + P);
      setCalculatedTotalQty(calculatedTotalQty + Q);
      console.log("added");
    }
  };

  useEffect(() => {
    if (cartItems) {
      if (selected_items_to_order.length < 1) {
        setSelected_items_to_order([...cartItems]);
        console.log([...cartItems]);
      }
    }
    // eslint-disable-next-line
  }, [cartItems]);

  useEffect(() => {
    console.log(selected_items_to_order);
  }, [selected_items_to_order]);

  return (
    <>
      <Wrapper
        className={`flex ${
          window.innerWidth < 821 && "flex-col"
        } justify-around items-center md:items-center lg:items-start`}
      >
        <div>
          <table>
            <thead className={`${enabled ? "text-white" : "text-black"}`}>
              <tr>
                <th>Items</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems &&
                reverseArr(cartItems).map((item, i) => {
                  return (
                    <tr
                      key={i}
                      className={` ${
                        enabled
                          ? "even:bg-zinc-700 odd:bg-zinc-800 text-white"
                          : "even:bg-slate-300 odd:bg-white text-black"
                      }`}
                    >
                      <td>
                        <CartItem
                          setReady_to_checkout={setReady_to_checkout}
                          itemData={item}
                          calculation={{
                            setCalculatedTotalQty,
                            setCalculatedTotalPrice,
                          }}
                        />
                      </td>
                      <td>{item.itemQty}</td>
                      <td>
                        <div className="flex justify-center ">
                          <input
                            className="cursor-pointer my-1"
                            type="checkbox"
                            name="#"
                            id="#"
                            defaultChecked
                            onChange={() => checkedItems(item)}
                          />
                        </div>
                        <div className="flex justify-center">
                          {currency(item.itemsPrice)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div
          className={`lg:sticky lg:top-0 lg:py-5 flex lg:flex-col justify-around items-center ${
            window.innerWidth < 821 && "w-[100%]"
          } mt-4 `}
        >
          <div>
            <table
              className={`${
                window.innerWidth > 630 && "getpad"
              } font-semibold ${enabled ? "text-white" : "text-black"}`}
            >
              <tbody>
                <tr>
                  <td>Total Quantity</td>
                  <td>{calculatedTotalQty}</td>
                </tr>
                <tr>
                  <td>Total Price</td>
                  <td>{currency(calculatedTotalPrice)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="lg:my-1">
            <button
              onClick={buynow}
              className="bg-yellow-500 text-blue-50 px-5  py-2"
            >
              Checkout
            </button>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 2px;
  }

  .getpad td {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export default Cart;

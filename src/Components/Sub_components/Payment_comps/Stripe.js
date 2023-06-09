import React, { useEffect, useState } from "react";
import { ImWarning } from "react-icons/im";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import styled from "styled-components";
import Address from "../Auth_components/Address";
import { useAuthContext } from "../../../Context/AuthContext";
import { message } from "antd";
import { useCartContext } from "../../../Context/CartContext";
import { CreateOrders } from "../../../Context/Mini_fuctions/Create&UpdateOrders";
import { useOrederContext } from "../../../Context/OrderContext";
import ConnectingToServer from "../ConnectingToServer";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function StripeComp() {
  const { setGeneratedId } = useOrederContext();
  // eslint-disable-next-line
  const { user, userAddress, setUserAddress } = useAuthContext();
  const { cart, CheckoutItem, setSelected_items_to_order } = useCartContext();
  const { cartItems } = cart;
  const [isElement, setIsElement] = useState(1);
  const [addressIndex, setAddressIndex] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [selectedAddress, setSelectedAddress] = useState();
  const [loadingElements, setLoadingElements] = useState(true);
  const fetchClientSecret = async (userAddress) => {
    const { fullname, mobile, house, city, zip, area, landmark, state } =
      userAddress;
    try {
      const res = await fetch(
        process.env.REACT_APP_STRIPE_CHECKOUT_BACKEND_API_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: parseInt(CheckoutItem.totalPrice + "00"),
            receipt_email: user.email,
            description: `Payment for ${CheckoutItem.orderItems[0].attributes.title}`,
            metadata: {
              fullname,
              mobile,
              house,
              city,
              zip,
              area,
              landmark,
              state,
            },
          }),
        }
      );

      const jsondata = await res.json();
      if (jsondata) {
        setClientSecret(jsondata.payment.client_secret);
        // this function will add order details into database
        const createdOredr = await CreateOrders(
          user,
          jsondata,
          CheckoutItem,
          userAddress
        );
        const { error, data } = createdOredr;
        // console.log(createdOredr)
        if (data) {
          console.log(data);
          console.log(data.id);
          setGeneratedId(data.id);
        }
        if (error) {
          message.error(`Order Creation is failed`);
          console.log(error.message);
          setIsElement(1);
        }
      }
    } catch (error) {
      console.log(error);
      if(CheckoutItem.orderItems){

        message.error(`Server is not responding try again after some time`);
      }else{
        message.error(`No selected items to checkout`)
      }
      // navigate("/");
      setIsElement(1);
    }
  };

  const nextStep = () => {
    if (selectedAddress >= 0) {
      // this function will register payment information
      fetchClientSecret(userAddress[addressIndex]);
      setIsElement(2);
    } else {
      console.log(selectedAddress);
      message.error(` Please click on above address`);
      console.log(` Please click on above address`);
    }
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    setSelected_items_to_order([...cartItems]);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isElement === 1 && (
        <div>
          {!userAddress.length && (
            <Address method={true} api={{ fetchClientSecret, setIsElement }} />
          )}
          {userAddress.length && (
            <div className="flex flex-col justify-center items-center">
              {userAddress?.map((item, i) => {
                return (
                  <div
                    className={`px-5 py-2 text-center cursor-pointer ${
                      i === selectedAddress
                        ? "border-double border-4 border-sky-500"
                        : ""
                    }`}
                    onClick={() => {
                      setAddressIndex(i);
                      setSelectedAddress(i);
                    }}
                    key={i}
                  >
                    <h5>
                      {item.fullname},{item.mobile}
                    </h5>
                    <h5>
                      {item.house},{item.zip},{item.city},{item.area},
                      {item.landmark}
                    </h5>
                    <h5>{item.state}</h5>
                  </div>
                );
              })}
              <button
                // disabled={selectedAddress===undefined}
                className="px-4 py-2 my-3 bg-orange-700"
                onClick={nextStep}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {isElement === 2 && (
        <Wrapper className="App flex flex-col justify-center items-center ">


          {/*before Mounting of PaymentForm  */}
          {loadingElements && (
            <div className="flex flex-col justify-center items-center">
              <ConnectingToServer message={"Initializing Payment"}/>
            </div>
          )}

          {clientSecret && (
            <div>
              <div className="warning p-2 text-center text-yellow-500 flex flex-col justify-center items-center ">
                <ImWarning className="text-2xl " />
                <h2>
                  {" "}
                  <span className="text-sm font-medium">
                    Dont enter your own card details
                  </span>
                </h2>
                {/* <p className="text-xs ">This ecommerce platform is only for testing purpose</p> */}
                <div>
                  <h2 className="text-sm text-start font-medium mt-5">
                    Enter details which are given below :{" "}
                  </h2>
                  <h2 className="text-sm text-white flex flex-col justify-start items-start">
                    <span className="font-medium">
                      <span>Email :</span> your registered email
                    </span>
                    <span className="font-medium">
                      <span>Card number :</span> 4242 4242 4242 4242
                    </span>
                    <span className="font-medium">
                      <span>Expiry :</span> 12/34
                    </span>
                    <span className="font-medium">
                      <span>CVC :</span> 465
                    </span>
                  </h2>
                </div>
              </div>
              <Elements options={options} stripe={stripePromise}>
                <PaymentForm setLoadingElements={setLoadingElements} />
              </Elements>
            </div>
          )}
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  .warning {
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    background-color: green;
  }
  form {
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 20px;
    background-color: aqua;
  }

  #payment-message {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    padding-top: 12px;
    text-align: center;
  }

  #payment-element {
    margin-bottom: 24px;
  }

  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }

  button:hover {
    filter: contrast(115%);
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }

  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }

  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }

  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
      min-width: initial;
    }
  }
`;

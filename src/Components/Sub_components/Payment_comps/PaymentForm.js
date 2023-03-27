import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { CompleteOrders } from "../../../Context/Mini_fuctions/Create&UpdateOrders";
import { useOrederContext } from "../../../Context/OrderContext";
import { useAuthContext } from "../../../Context/AuthContext";

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const stripe = useStripe();
  const elements = useElements();
  // eslint-disable-next-line
  const [email, setEmail] = useState("");
  const [isMessage, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { generatedId, setGeneratedId } = useOrederContext();

  useEffect(() => {
    if (!stripe) {
      console.log("stripe not found");
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      console.log("clientSecret not found");
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.log("stripe || element not found");
      return;
    }

    setIsLoading(true);
    setMessage("Confirming Payment");
    const confirmation = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: process.env.REACT_APP_STRIPE_CONFIRM_PARAMS_RETURN_URL,
      },
    });
    const { error, paymentIntent } = confirmation;

    if (paymentIntent) {
      const { status } = paymentIntent;
      if (status === "canceled") {
        message.error("Payment confirmation is canceled");
        navigate("/");
        console.error("Payment confirmation is canceled");
      }
      if (status === "succeeded") {
        setMessage("Payment Confirmed");
        message.success(`Payment Successfull`);
        // this fuction Updates the order in backend
        const isCompleted = await CompleteOrders(generatedId, paymentIntent);
        const { error, data } = isCompleted;
        console.log(isCompleted);
        if (data) {
          // here  a logic will define to delete ordered items from Array of CartItems 
          
          

          setGeneratedId(undefined);
          message.success(`Order Successfull`);
          navigate("/order-placed-successfully");
        }
        if (error) {
          // if there is error then payment is done but order is not saved in database this is serious condition
          message.error(`Payment Is successfull but Order Creation is failed`);
          console.log(error.message);
          navigate("/");
        }
      }
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      setMessage(error.message);
      console.log(error.message);
      message.error(error.message);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };


  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target ? e.target.value : user.email)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {isMessage && (
        <div id="payment-message" className="font-medium">
          {isMessage}
        </div>
      )}
    </form>
  );
}

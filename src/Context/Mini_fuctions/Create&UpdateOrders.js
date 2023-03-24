import { getToken } from "./AuthToken";

const authToken = getToken();

// this fuction will Confirem the final status of order

export const CompleteOrders = async (id, paymentIntent) => {
  const { client_secret } = paymentIntent;
  console.log(paymentIntent);
  console.log(id);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_UPDATE_ORDERS}/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${authToken}`,
        },
        body: JSON.stringify({
          data: {
            status: "Payment Confirmed",
            transaction_id: client_secret,
            payment_info: { payment_info: "payment" },
          },
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// this fuction will register order information is database but after this fuction response Order confirmation will require
export const CreateOrders = async (user, jsondata, CheckoutItem, address) => {
  const { message } = jsondata;
  // eslint-disable-next-line
  const { amount, client_secret, id, receipt_email, status } = jsondata.payment;

  // eslint-disable-next-line
  const { totalQty, totalPrice, orderItems } = CheckoutItem;
  // eslint-disable-next-line
  const { email, username } = user;
  console.log(address);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_UPDATE_ORDERS}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${authToken}`,
        },
        body: JSON.stringify({
          data: {
            email,
            user: "anu",
            order_Id: id,
            products: { ...CheckoutItem },
            payment_info: { message, status },
            transaction_id: client_secret,
            // below fuction destructure the amount which is comming from stripe response
            amount: parseInt(
              amount.toString().substring(0, amount.toString().length - 2)
            ),
            address,
          },
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllOrders = async (email) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_UPDATE_ORDERS}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${authToken}`,
        },
      }
    );
    let jsonRes = await res.json();
    const { error, data } = jsonRes;
    if (data) {
      jsonRes = jsonRes.data?.filter((item) => {
        return email === item.attributes.email;
      });
      jsonRes = jsonRes.sort((a, b) => b.id - a.id);
      return jsonRes;
    }
    if (error) {
      return;
    }
  } catch (error) {
    console.log(error.message);
    console.log("can not get OrderData");
  }
};

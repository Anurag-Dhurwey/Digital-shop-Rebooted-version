import { getToken } from "./AuthToken";

const authToken = getToken();

export const UpdateAddress = async (id, userAddress, addressData, action) => {
  try {

    let addAddress;

    if (!addressData && action === "delete") {
        addAddress={address:[...userAddress]}
    }

    if (addressData && !action) {
           addAddress={ address: [...userAddress, { ...addressData }] }
    }

    const response = await fetch(
      `${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_UPDATE_ADDRESS}/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `bearer ${authToken}`,
        },
        body: JSON.stringify({
          address:addAddress ,
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

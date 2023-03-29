import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../Context/AuthContext";
import { UpdateAddress } from "../../../Context/Mini_fuctions/UpdateAddress";

const Address = ({ method, api, setAddress, update }) => {
  const { user, userAddress, setUserAddress } = useAuthContext();
  const [addressData, setAddressData] = useState({
    id: userAddress.length,
    fullname: "",
    mobile: "",
    house: "",
    city: "",
    zip: "",
    area: "",
    landmark: "",
    state: "",
  });

  const onchangeHandle = (event) => {
    setAddressData({
      ...addressData,
      [event.target.name]: event.target.value,
    });
  };

  const perform = async (e) => {
    e.preventDefault();
    if (method) {
      const { fetchClientSecret, setIsElement } = api;
      fetchClientSecret(addressData);
      setIsElement(2);
    }
    const res = await UpdateAddress(user.id, userAddress, addressData);
    const { error } = res;

    if (!error) {
      console.log(res);
      setUserAddress([...userAddress, { ...addressData }]);
      if (setAddress) {
        setAddress(false);
      }

      if (!update.toUpdate) {
        message.success(`Address added successfully`);
      } else {
        const { setToUpdate } = update;
        setToUpdate(null);
        message.warning("Updated successfully");
      }
    } else {
      console.log(res);
      message.error(`Something went wrong`);
      if (update.toUpdate) {
        const { setToUpdate } = update;
        setToUpdate(null);
        setUserAddress([...userAddress, { ...update.toUpdate }]);
      }
    }
  };

  useEffect(() => {
    if (update.toUpdate) {
      setAddressData({ ...update.toUpdate });
    }
  }, [update]);

  return (
    <>
      <div className="flex flex-col justify-center items-center p-5 bg-[#e778b9]">
        <h4>Address</h4>
        <form
          onSubmit={(e) => {
            perform(e);
          }}
          className="flex flex-col justify-center items-center"
        >
          <div className="mt-1">
            <p className=" font-medium" htmlFor="fullname">
              Full name (First and Last name)
            </p>{" "}
            <input
              className="w-[300px] md:w-[400px] lg:w-[500px] px-2 py-1"
              type="text"
              name="fullname"
              required
              value={addressData.fullname}
              id="fullname"
              onChange={(e) => {
                onchangeHandle(e);
              }}
            />
          </div>
          <div className="mt-1">
            <p className=" font-medium" htmlFor="mobile">
              Mobile number
            </p>{" "}
            <input
              className="w-[300px] md:w-[400px] lg:w-[500px] px-2 py-1"
              type="text"
              name="mobile"
              required
              value={addressData.mobile}
              id="mobile"
              onChange={(e) => {
                onchangeHandle(e);
              }}
            />
          </div>
          <div className="mt-1">
            <p className=" font-medium" htmlFor="house">
              Flat, House no., Building, Apartment
            </p>{" "}
            <input
              className="w-[300px] md:w-[400px] lg:w-[500px] px-2 py-1"
              type="text"
              name="house"
              required
              value={addressData.house}
              id="house"
              onChange={(e) => {
                onchangeHandle(e);
              }}
            />
          </div>
          <div className="mt-1">
            <p className=" font-medium" htmlFor="zip">
              Pincode
            </p>{" "}
            <input
              className="w-[300px] md:w-[400px] lg:w-[500px] px-2 py-1"
              type="text"
              name="zip"
              required
              value={addressData.zip}
              id="zip"
              onChange={(e) => {
                onchangeHandle(e);
              }}
            />
          </div>
          <div className="mt-1">
            <p className=" font-medium" htmlFor="city">
              Town/City
            </p>{" "}
            <input
              className="w-[300px] md:w-[400px] lg:w-[500px] px-2 py-1"
              type="text"
              name="city"
              required
              value={addressData.city}
              id="city"
              onChange={(e) => {
                onchangeHandle(e);
              }}
            />
          </div>
          <div className="mt-1">
            <p className=" font-medium" htmlFor="area">
              Area, Street, Sector, Village
            </p>{" "}
            <input
              className="w-[300px] md:w-[400px] lg:w-[500px] px-2 py-1"
              type="text"
              name="area"
              required
              value={addressData.area}
              id="area"
              onChange={(e) => {
                onchangeHandle(e);
              }}
            />
          </div>
          <div className="mt-1">
            <p className=" font-medium" htmlFor="landmark">
              Landmark
            </p>{" "}
            <input
              className="w-[300px] md:w-[400px] lg:w-[500px] px-2 py-1"
              type="text"
              name="landmark"
              required
              value={addressData.landmark}
              id="landmark"
              onChange={(e) => {
                onchangeHandle(e);
              }}
            />
          </div>
          <div className="mt-1">
            <p className=" font-medium" htmlFor="state">
              State
            </p>{" "}
            <input
              className="w-[300px] md:w-[400px] lg:w-[500px] px-2 py-1"
              type="text"
              name="state"
              required
              value={addressData.state}
              id="state"
              onChange={(e) => {
                onchangeHandle(e);
              }}
            />
          </div>
          <button className="px-3 py-2 my-3 bg-orange-700" type="submit">
            {method ? "Checkout" : "Add"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Address;

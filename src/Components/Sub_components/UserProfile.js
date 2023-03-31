import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { useGlobleContext } from "../../Context/Globle_Context";
import { Link, useNavigate } from "react-router-dom";
import Address from "./Auth_components/Address";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { UpdateAddress } from "../../Context/Mini_fuctions/UpdateAddress";
import { message } from "antd";
import { getToken } from "../../Context/Mini_fuctions/AuthToken";
const UserProfile = () => {
  // eslint-disable-next-line
  const { userAddress, setUserAddress } = useAuthContext();
  const [addAddress, setAddress] = useState(false);
  const { enabled } = useGlobleContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const token=getToken()
  const [toUpdate, setToUpdate] = useState();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const deleteAddress = async (item) => {
    const newFilterdAddress = userAddress.filter((ele) => {
      return item.id !== ele.id;
    });

    const deletRes = await UpdateAddress(
      user.id,
      newFilterdAddress,
      undefined,
      "delete"
    );
    const { error } = deletRes;
    if (!error) {
      setUserAddress([...newFilterdAddress]);
      message.warning(`Address deleted successfully`);
    } else {
      console.log(error);
      message.error(`failed`);
    }
  };

  const updateAddress = (item) => {
    setAddress(true);
    setToUpdate({ ...item });
    const newFilterdAddress = userAddress.filter((ele) => {
      return item.id !== ele.id;
    });
    setUserAddress([...newFilterdAddress]);
  };

  return (
    <>
      {!addAddress && user && (
        <>
          <div className="w-[100%] h-[100%] flex flex-col justify-center items-center mb-auto">
            <div
              className={`w-[300px] md:w-[400px] lg:w-[500px] mb-auto ${
                enabled ? "text-white" : "text-black"
              } `}
            >
              <div className="image w-[100%] h-5 bg-pink-800"></div>
              <div className="w-[100%] border-solid border-2 border-pink-900 px-1 py-1">
                <h5>
                  User name :<span> {user ? user.username : ""}</span>
                </h5>
                <h5>
                  Email ID :<span> {user ? user.email : ""}</span>
                </h5>
                <h5>Description : </h5>
                <p>NA</p>
              </div>

              <div className="image w-[100%] h-5 bg-pink-800"></div>
              <div>
                <div>
                  {userAddress.length ? (
                    userAddress.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="border-solid border-2 border-pink-900 px-1 py-1"
                        >
                          <h5 className=" flex justify-start gap-x-5 items-center pb-2">
                            Address {i + 1}{" "}
                            <span className="cursor-pointer">
                              <FaRegEdit
                                onClick={() => {
                                  updateAddress(item);
                                }}
                              />
                            </span>{" "}
                            <span className="cursor-pointer">
                              <RiDeleteBin2Line
                                onClick={() => {
                                  deleteAddress(item);
                                }}
                              />
                            </span>
                          </h5>
                          <div className="text-sm lg:ml-[30px] md:ml-[30px]">
                            <h6>
                              {item.fullname},{item.mobile}
                            </h6>
                            <h6>
                              {item.house},{item.zip},{item.city},{item.area},
                              {item.landmark}
                            </h6>
                            <h6>{item.state}</h6>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h5 className=" font-medium">NO ADDRESS FOUND</h5>
                  )}
                </div>
               <div className="flex justify-between items-center">
               <button
                  className="px-3 py-1 my-2 text-sm bg-[#214431]"
                  onClick={() => {
                    setAddress(true);
                  }}
                >
                  Add Address
                </button>
               <Link
                   to={`https://forget-password-return.vercel.app/changepassword?token=${token}`}
                  className="px-3 py-1 my-2 text-sm bg-[#214431]"
                >
                  Change Password
                </Link>
               </div>
              </div>
            </div>
          </div>
        </>
      )}

      {addAddress && (
        <>
          <Address setAddress={setAddress} update={{ toUpdate, setToUpdate }} />
        </>
      )}
    </>
  );
};

export default UserProfile;

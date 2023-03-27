import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { useGlobleContext } from "../../Context/Globle_Context";
import { useNavigate } from "react-router-dom";
import Address from "./Auth_components/Address";
const UserProfile = () => {
  // eslint-disable-next-line
  const { userAddress, setUserAddress } = useAuthContext();
  const [addAddress, setAddress] = useState(false);
  const { enabled } = useGlobleContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!addAddress && user && (
        <>
          <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
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
                        <div key={i} className="border-solid border-2 border-pink-900 px-1 py-1">
                          <h5 className="">Address {i+1}</h5>
                          <div className="text-sm lg:ml-[30px] md:ml-[30px]" >
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
                <button
                  className="px-3 py-1 my-2 text-sm bg-[#214431]"
                  onClick={() => {
                    setAddress(true);
                  }}
                >
                  Add Address
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {addAddress && (
        <>
          <Address setAddress={setAddress} />
        </>
      )}
    </>
  );
};

export default UserProfile;

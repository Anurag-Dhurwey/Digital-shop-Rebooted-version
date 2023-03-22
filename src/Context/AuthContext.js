import { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "./Mini_fuctions/AuthToken";
import { message } from "antd";
const Context = createContext();

export const AuthContext = ({ children }) => {
  const [userData, setUserData] = useState();
  const [userAddress, setUserAddress] = useState([
    {
      fullname: "anurag dhurwey",
      mobile: "7067996494",
      house: "lig 898",
      city: "makroniya",
      zip: "470004",
      area: "dd nagar",
      landmark: "raghu hostal",
      state: "MP",
    }
  ]);
  const [registerersEmail, setRegisterersEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const authToken = getToken();

  const fetchLoggedInUser = async (token) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_USER_API}`,
        {
          headers: {
            Authorization: `${process.env.REACT_APP_BEARER} ${token}`,
          },
        }
      );
      const data = await response.json();

      setUserData(data);
    } catch (error) {
      console.error(error);
      message.error("Error While Getting Logged In User Details");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (user) => {
    setUserData(user);
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  return (
    <Context.Provider
      value={{
        user: userData,
        userAddress,
        setUserAddress,
        setUser: updateUser,
        isLoading,
        registerersEmail,
        setRegisterersEmail,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(Context);
};

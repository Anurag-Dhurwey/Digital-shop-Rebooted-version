import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { getAllOrders } from "./Mini_fuctions/Create&UpdateOrders";

const Context = createContext();

export const OrderContext = ({ children }) => {

    const {user}=useAuthContext()

  const [generatedId, setGeneratedId] = useState();

  

  const getAllOrdersData=async()=>{

    const orderData=await getAllOrders(user.email)
    console.log(orderData)

  }

  useEffect(()=>{

    if(user){
        getAllOrdersData()
    }
// eslint-disable-next-line
  },[user,generatedId])

  return (
    <Context.Provider value={{ generatedId, setGeneratedId }}>
      {children}
    </Context.Provider>
  );
};

export const useOrederContext = () => {
  return useContext(Context);
};

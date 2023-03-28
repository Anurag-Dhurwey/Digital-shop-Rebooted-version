import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { getAllOrders } from "./Mini_fuctions/Create&UpdateOrders";

const Context = createContext();

export const OrderContext = ({ children }) => {

    const {user}=useAuthContext()

  const [generatedId, setGeneratedId] = useState();
  const [OrdersData,setOrdersData]=useState([])
  

  const getAllOrdersData=async()=>{

    const orderData=await getAllOrders(user.email)
    if(orderData){
      const {error}=orderData
    if(!error){
      if(orderData){
           setOrdersData([...orderData])   
      }else{
        console.log("order data not found")
      }
    }else{
      console.log("error while getting orderData from database")
    }
    }else{
      console.log(`Oredr data is undefined`)
    }


  }

  useEffect(()=>{

    if(user){
        getAllOrdersData()
    }
// eslint-disable-next-line
  },[user,generatedId])

  return (
    <Context.Provider value={{ generatedId, setGeneratedId ,OrdersData}}>
      {children}
    </Context.Provider>
  );
};

export const useOrederContext = () => {
  return useContext(Context);
};

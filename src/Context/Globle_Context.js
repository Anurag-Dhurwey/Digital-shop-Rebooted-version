import { useState, createContext, useContext, useEffect, useReducer } from "react";
import { getOneProductApi, getProductApi } from "./Mini_fuctions/GetProductApi";
import {getReducer} from "../Reducer/getReducer"
const Context = createContext()

export const GlobleContext=({children})=> {
  const [enabled, setEnabled] = useState(true)
  const initialState={
    products:[],
    aProduct:[],
    featuredProducts:[],
    isLoading:false,
    isError:false,
    getOneError:false
  }
  const [state,dispatch]=useReducer(getReducer,initialState)

  const get_A_product=async(id)=>{
    try {
      const api= await getOneProductApi(id)
      if(api.message){
        console.log(api)
        dispatch({type:"getOneError"})
      }else{
        dispatch({type:"get_A_product",payload:api.data})
      }
     } catch (error) {
      console.log(error)
      dispatch({type:"getOneError"})
     }
      
  }




  useEffect(()=>{
    
     const getApi=async()=>{
     try {
      const api= await getProductApi()
      if(api.message){
        console.log(api)
        dispatch({type:"error"})
      }else{

        dispatch({type:"getAllProducts",payload:api.data})
      }
     } catch (error) {
      console.log(error)
      dispatch({type:"error"})
     }
    }
    getApi()
  },[])


  return (
    <Context.Provider value={{enabled,setEnabled,state,get_A_product}}>
      {children}
    </Context.Provider>
  );
}

export const useGlobleContext=()=>{
  return useContext(Context)
}


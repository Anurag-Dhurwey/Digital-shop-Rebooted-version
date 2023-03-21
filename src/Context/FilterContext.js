import { createContext, useContext, useReducer,useEffect } from "react";
import { useGlobleContext } from "./Globle_Context";
import { filterReducer } from "../Reducer/filterReducer";
const Context=createContext();

export const FilterContext=({children})=>{

    const {state}=useGlobleContext();
    const {products}=state

    const initialState={
        products:[],
        filteredProducts:[],
        sort_value:''
        ,isError:false
    }
    const [Fstate,setFstate]=useReducer(filterReducer,initialState)
const {filteredProducts}=Fstate
    const filterMethod=(e)=>{
        const keyWord=e.target.value
        const name=e.target.name
        setFstate({type:"filterMethod",payload:{products,keyWord,name}})
    }

    const sortMethod=(e)=>{
       const target= e.target.name
        setFstate({type:"sorting",payload:{filteredProducts,target}})
    }
// get unique filterable key 
    const getCategory=(data,property)=>{
          let categoryArr=data?.map((item,i)=>{
            const {attributes}=item
            return attributes[property].a
          })
         return categoryArr=["All",...new Set(categoryArr)]
      }
    
      const category=getCategory(products,"category")



    useEffect(() => {
        setFstate({ type: "sorted_product", payload: filteredProducts });
        // eslint-disable-next-line
      },[Fstate.sort_value]);
    

    useEffect(() => {
        setFstate({ type: "GET_ALL_PRODUCTS", payload: products });
      }, [products]);

    return(
        <>
        <Context.Provider value={{Fstate,filterMethod,sortMethod,category}}>
       {children}
        </Context.Provider>
        </>
    )
}


export const useFilterContext=()=>{
    return useContext(Context)
}
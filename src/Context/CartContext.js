import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { cartReducer } from "../Reducer/cartReducer";
import { useAuthContext } from "./AuthContext";
import { getCart, postCartItems, putCartItems } from "./Mini_fuctions/CURDCartItems";
const Context = createContext();

export const CartContext = ({ children }) => {
  const initialCart = {
    cartItems: [],
    totalQty: 0,
    totalPrice: 0,
    cartId:''
    
  };
  const [cartRef,refresCartId]=useState(false)
  const [cart, setCart] = useReducer(cartReducer, initialCart);
  const {user}=useAuthContext()

  const addToCart = async(product, qty) => {

    let addToCart 

     if(cart.cartItems.length){
       let isItemExist=cart.cartItems?.filter((item)=>{
        return product.id===item.id
       })
       if(isItemExist.length){
       let cartItems = cart.cartItems.map((item) => {
            if (item.id === product.id) {
              return {
                ...item,
                itemQty: item.itemQty + qty,
                itemsPrice:item.itemsPrice+item.attributes.price*qty
              };
            } else {
              return {
                ...item,
              };
            }
          });
          addToCart={
            ...cart,
            cartItems: [...cartItems],
            totalQty: cart.totalQty + qty,
            totalPrice:cart.totalPrice+product.attributes.price*qty
          };
        //   it will update same item in cartitems 
          const res=await putCartItems(cart.cartId,addToCart)
          if(res.data){
            setCart({ type: "ADD_TO_CART", payload:  addToCart  });
            console.log('same data updated successfully')
         }else{
             console.log('can not be updated same data')
         }
       }else{
            // it will add a new item in cartitem 
            let cartItems = [...cart.cartItems, { ...product, itemQty: qty,itemsPrice:product.attributes.price*qty }];
            addToCart={
                ...cart,
                cartItems: [...cartItems],
                totalQty: cart.totalQty + qty,
                totalPrice:cart.totalPrice+product.attributes.price*qty
              };
              const res=await putCartItems(cart.cartId,addToCart)
              if(res.data){
                setCart({ type: "ADD_TO_CART", payload:  addToCart  });
                console.log('new data added successfully')
             }else{
                 console.log('can not be added new data')
             }
       }
     }else{
        // it will add item for first time in cartItems 
        addToCart = {
            ...cart,
            cartItems: [
              ...cart.cartItems,
              {
                ...product,
                itemQty: qty,
                itemsPrice: product.attributes.price * qty,
              },
            ],
            totalQty: cart.totalQty + qty,
            totalPrice: cart.totalPrice + product.attributes.price * qty,
          };
        const res=await postCartItems(user.email,user.username,addToCart)
        if(res.data){
           setCart({ type: "ADD_TO_CART", payload:  addToCart  });
          refresCartId((val)=>{return val?false:true})
           console.log('data posted successfully for first time')
        }else{
            console.log('can not be posted first data')
        }
     }

  };
  useEffect(() => {
    const getCartItem = async () => {
      if(user){
        const cartRes = await getCart(user.email);
      if (cartRes.message) {
        console.log("cart error");
      } 
      if(cartRes.length) {
        setCart({ type: "GET_CART_ITEMS", payload: cartRes });
      }
      }else{
        console.error('user not found')
      }
    };
    getCartItem();
  }, [user,cartRef]);

  return (
    <Context.Provider value={{ cart,refresCartId, addToCart }}>{children}</Context.Provider>
  );
};

export const useCartContext = () => {
  return useContext(Context);
};

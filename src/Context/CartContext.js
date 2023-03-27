import { message } from "antd";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cartReducer } from "../Reducer/cartReducer";
import { useAuthContext } from "./AuthContext";
import {
  getCart,
  postCartItems,
  putCartItems,
} from "./Mini_fuctions/CURDCartItems";
const Context = createContext();

export const CartContext = ({ children }) => {
  const initialCart = {
    cartItems: [],
    totalQty: 0,
    totalPrice: 0,
    cartId: "",
  };
  const [cartRef, refresCartId] = useState(false);
  const [cart, setCart] = useReducer(cartReducer, initialCart);
  const { user } = useAuthContext();
  const [CheckoutItem, setCheckoutItem] = useState([]);
  const [selected_items_to_order, setSelected_items_to_order] = useState([]);

  const addToCart = async (product, qty,callerOBJ) => {
    let addToCart;

    // Destructuring the callerOBJ's values
    let ref
    let plush_Or_Minus
    if(callerOBJ){
      ref=callerOBJ.ref
      plush_Or_Minus=callerOBJ.plush_Or_Minus
    }
// this operator will check cartItems available or not 
    if (cart.cartItems.length) {
      // this operator will check product already exist in cart or not 
      let isItemExist = cart.cartItems?.filter((item) => {
        return product.id === item.id;
      });
      if (isItemExist.length) {
        // eslint-disable-next-line
        let cartItems = cart.cartItems.map((item) => {
          if (item.id === product.id) {
            // if callerOBJ is  available, then tihs will be perform 
            if(ref==='CALL_FROM_CART'){
              // it will check what action to Do (+ or -)
              if(plush_Or_Minus===1){
                console.log('if(plush_Or_Minus===1){')
                return {
                  ...item,
                  itemQty: item.itemQty + 1,
                  itemsPrice: item.itemsPrice + item.attributes.price * 1,
                };
              }
              if(plush_Or_Minus===0){
                console.log('if(plush_Or_Minus===0)')
                return {
                  ...item,
                  itemQty: item.itemQty - 1,
                  itemsPrice: item.itemsPrice - item.attributes.price * 1,
                };
              }
            }
            if(!callerOBJ){
              return {
                ...item,
                itemQty: item.itemQty + qty,
                itemsPrice: item.itemsPrice + item.attributes.price * qty,
              };
            }
            
          } else {
            return {
              ...item,
            };
          }
        });
        if(ref==='CALL_FROM_CART'){
          // if called from Cart section it will be return 
          if(plush_Or_Minus===1){
            addToCart = {
              ...cart,
              cartItems: [...cartItems],
              totalQty: cart.totalQty + 1,
              totalPrice: cart.totalPrice + product.attributes.price * 1,
            };
            console.log('Increasing')
          }
          if(plush_Or_Minus===0){
            addToCart = {
              ...cart,
              cartItems: [...cartItems],
              totalQty: cart.totalQty - 1,
              totalPrice: cart.totalPrice - product.attributes.price * 1,
            };
            console.log('Deacreasing')
          }
        }
// if callerOBJ is undefined or not available, then tihs will be perform directly  
        if(!callerOBJ){
          addToCart = {
            ...cart,
            cartItems: [...cartItems],
            totalQty: cart.totalQty + qty,
            totalPrice: cart.totalPrice + product.attributes.price * qty,
          };
        }
          // it will update same item in cartitems
        const res = await putCartItems(cart.cartId, addToCart);
        if (res.data) {
          setCart({ type: "ADD_TO_CART", payload: addToCart });
          console.log("same data updated successfully");
          message.success(`Success`)
        } else {
          console.log("can not be updated same data");
          message.error(`Failed`)
        }
      } else {
        // it will add a new item in cartitems
        let cartItems = [
          ...cart.cartItems,
          {
            ...product,
            itemQty: qty,
            itemsPrice: product.attributes.price * qty,
          },
        ];
        addToCart = {
          ...cart,
          cartItems: [...cartItems],
          totalQty: cart.totalQty + qty,
          totalPrice: cart.totalPrice + product.attributes.price * qty,
        };
        const res = await putCartItems(cart.cartId, addToCart);
        if (res.data) {
          setCart({ type: "ADD_TO_CART", payload: addToCart });
          console.log("new data added successfully");
          message.success(`Success`)
        } else {
          console.log("can not be added new data");
          message.error(`Failed`)
        }
      }
    } else {
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
      const res = await postCartItems(user.email, user.username, addToCart);
      if (res.data) {
        setCart({ type: "ADD_TO_CART", payload: addToCart });
        refresCartId((val) => {
          return val ? false : true;
        });
        console.log("data posted successfully for first time");
        message.success(`Success`)
      } else {
        console.log("can not be posted first data");
        message.error(`Failed`)
      }
    }
  };
  console.log(cart)
  useEffect(() => {
    const getCartItem = async () => {
      if (user) {
        const cartRes = await getCart(user.email);
        if (cartRes.message) {
          console.log("cart error");
        }
        if (cartRes.length) {
          setCart({ type: "GET_CART_ITEMS", payload: cartRes });
        }
      } 
    };
    getCartItem();
  }, [user, cartRef]);

  return (
    <Context.Provider
      value={{ cart, refresCartId, addToCart, CheckoutItem, setCheckoutItem,selected_items_to_order, setSelected_items_to_order }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCartContext = () => {
  return useContext(Context);
};

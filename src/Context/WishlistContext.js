import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { getAllWishlist , CreateWishlist,
  DeleteWishlist,} from "./Mini_fuctions/Wishlist_CRUD";
import { message } from "antd";
const Context = createContext();

export const WishlistContext = ({ children }) => {
  const { user } = useAuthContext();
  const [Wishlist, setWishlist] = useState();
  const [generatedWishlist_ID, setGeneratedWishlist_ID] = useState();
  // the below fuction will fetch all the Wishlist data from database 
  const getAllWishlistData = async () => {
    const wishlistData = await getAllWishlist(user.email);
    if (wishlistData) {
      const { error } = wishlistData;
      if (!error) {
        if (wishlistData) {
          setWishlist([...wishlistData]);
        } else {
          console.log("Wishlist data not found");
        }
      } else {
        console.log("error while getting WishlistData from database");
      }
    } else {
      console.log(`Wishlist data is undefined`);
    }
  };


  
// the below fuction will post an item into wishlist 
  const postWishlist = async (item) => {
    console.log("called");
    const wishlistRes = await CreateWishlist(user, item);
    if (wishlistRes) {
      const { error } = wishlistRes;
      if (!error) {
        // setWishlist([...Wishlist,{...wishlistRes.data}])

        // when setGeneratedWishlist_ID will reset data then in WishlistContext's useEffect method will rerun
        // after rerun of useEffect function, Wishlist Arry will get latest data from database
        // it can be done by diffrent methods like one is on top which is commented out
        setGeneratedWishlist_ID(wishlistRes.data.id);
        message.success("Added in Wishlist");
      } else {
        console.log(error);
        message.error("Failed");
      }
    } else {
      message.error("Failed");
    }
  };



    // the below fuction will DELETE an item from wishlist 
    const DELETEWishlist = async (id) => {
      console.log("called");
      const wishlistRes = await DeleteWishlist(id);
      if (wishlistRes) {
        const { error } = wishlistRes;
        if (!error) {
          console.log(wishlistRes);
          setGeneratedWishlist_ID((prev_id)=>{return prev_id===wishlistRes.data.id?wishlistRes.data.id+1:wishlistRes.data.id});
          message.success("Deleted From Wishlist");
        } else {
          console.log(error);
          message.error("Failed");
        }
      } else {
        message.error("Failed");
      }
    };


  useEffect(() => {
    if (user) {
      getAllWishlistData();
    }
    // eslint-disable-next-line
  }, [user, generatedWishlist_ID]);

  return (
    <Context.Provider
      value={{
        Wishlist,
        postWishlist,
        DELETEWishlist,
        setWishlist,
        generatedWishlist_ID,
        setGeneratedWishlist_ID,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useWishlistContext = () => {
  return useContext(Context);
};

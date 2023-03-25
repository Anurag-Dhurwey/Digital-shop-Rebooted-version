import { getToken } from "./AuthToken";

const authToken = getToken();

export const getAllWishlist=async(email)=>{

    try {
        const res = await fetch(
          `${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_UPDATE_WISHLIST}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `bearer ${authToken}`,
            },
          }
        );
        let jsonRes = await res.json();
        const { error, data } = jsonRes;
        if (data) {
          jsonRes = jsonRes.data?.filter((item) => {
            return email === item.attributes.email;
          });
          jsonRes = jsonRes.sort((a, b) => b.id - a.id);
          return jsonRes;
        }
        if (error) {
          return;
        }
      } catch (error) {
        console.log(error.message);
        console.log("can not get Wishlist Data");
      }



}




// this fuction will post wishlist information in database 
export const CreateWishlist = async (user,itemToWishlist) => {
    // eslint-disable-next-line
    const { email, username } = user;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_UPDATE_WISHLIST}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authToken}`,
          },
          body: JSON.stringify({
            data: {
              email,
              user: username,
              wishlist:{...itemToWishlist}
            },
          }),
        }
      );
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  

// this fuction will Delete wishlist information in database 
export const DeleteWishlist = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_UPDATE_WISHLIST}/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${authToken}`,
          },
        }
      );
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  
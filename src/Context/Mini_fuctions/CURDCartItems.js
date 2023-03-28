import { getToken } from "./AuthToken"

const authToken=getToken()

export const getCart=async(email)=>{
  try {
    const res=await fetch(`${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_CART_API}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          `bearer ${authToken}` ,
      },
      })
      let jsonRes=await res.json()
      jsonRes=jsonRes.data?.filter((item)=>{
              return email.toLowerCase() ===item.attributes.email.toLowerCase()
      })
      return jsonRes
  } catch (error) {
    console.log(error.message)
    console.log('can not be saved in cart')
    return error
  }
}


export const postCartItems=async(email,user,addToCart)=>{

    try {
        const res=await fetch(`${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_CART_API}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              `bearer ${authToken}` ,
          },
          
          body: JSON.stringify({
            data:{
              email:email,
              user:user,
              cart:addToCart
            }
          })
          })
          const jsonRes=await res.json()
          return jsonRes
      } catch (error) {
        console.log(error.message)
        console.log('can not be saved in cart')
        return error
      }
}



export const putCartItems=async(cartId,addToCart)=>{
  
    try {
        const res=await fetch(`${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_CART_API}/${cartId}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              `bearer ${authToken}` ,
          },
          
          body: JSON.stringify({
            data:{
              // email:"anurag1@gmail.com",
              // user:"anurag1",
              cart:addToCart
            }
          })
          })
          const jsonRes=await res.json()
          return jsonRes
      } catch (error) {
        console.log(error.message)
        console.log('can not be saved in cart')
        return error
      }
}




export const Update_Items_Qty_In_DB=async(cart,Qty)=>{
  // eslint-disable-next-line
  const {cartId,totalQty, cartItems, totalPrice}=cart
    try {
        const res=await fetch(`${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_CART_API}/${cartId}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              `bearer ${authToken}` ,
          },
          
          body: JSON.stringify({
            data:{
              // email:"anurag1@gmail.com",
              // user:"anurag1",
              cart:cart
            }
          })
          })
          const jsonRes=await res.json()
          return jsonRes
      } catch (error) {
        console.log(error.message)
        console.log('can not be saved in cart')
        return error
      }
}





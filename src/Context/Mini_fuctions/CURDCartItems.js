export const getCart=async(email)=>{
  try {
    const res=await fetch(`${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_CART_API}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          `bearer ${process.env.REACT_APP_API_TOKEN}` ,
      },
      })
      let jsonRes=await res.json()
      jsonRes=jsonRes.data?.filter((item)=>{
              return email ===item.attributes.email
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
              `bearer ${process.env.REACT_APP_API_TOKEN}` ,
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
              `bearer ${process.env.REACT_APP_API_TOKEN}` ,
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



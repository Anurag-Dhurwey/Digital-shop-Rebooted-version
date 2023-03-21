export const getProductApi = async () => {

  try {
    const res = await fetch(`${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_PRODUCT_API}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          `bearer ${process.env.REACT_APP_API_TOKEN}` ,
      },
    });
  
    const jsonRes = await res.json();
  
    return jsonRes;
  } catch (error) {
    console.log(error.message)
    return error
  }
};


export const getOneProductApi=async(id)=>{
  try {
    const res = await fetch(`${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_PRODUCT_API}/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          `bearer ${process.env.REACT_APP_API_TOKEN}` ,
      },
    });
  
    const jsonRes = await res.json();
  
    return jsonRes;
  } catch (error) {
    console.log(error.message)
    return error
  }
}
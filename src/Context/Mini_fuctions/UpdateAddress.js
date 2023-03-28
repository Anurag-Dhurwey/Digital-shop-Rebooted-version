
import { getToken } from "./AuthToken"

const authToken=getToken()


export const UpdateAddress=async(id,userAddress,addressData)=>{


    try {
        const response = await fetch(`${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_UPDATE_ADDRESS}/${id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:
                  `bearer ${authToken}` 
            },
            body: JSON.stringify({address:{address:[...userAddress,{...addressData}]}}),
          });
    
          const data = await response.json();
          console.log(data)
          return data

    } catch (error) {
        console.log(error)
    }
}
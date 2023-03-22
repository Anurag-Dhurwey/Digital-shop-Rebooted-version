import React ,{useState}from 'react'
import { useAuthContext } from '../../../Context/AuthContext';

const Address = ({method,api}) => {
    const {userAddress,setUserAddress}=useAuthContext()
  const [addressData, setAddressData] = useState({
    fullname: "",
    mobile: "",
    house: "",
    city: "",
    zip: "",
    area: "",
    landmark: "",
    state: "",
  });
    const {fetchClientSecret,setIsElement}=api

    const onchangeHandle = (event) => {
        setAddressData({
          ...addressData,
          [event.target.name]: event.target.value,
        });
      };

      const perform=(e)=>{
         e.preventDefault()
         if(method){
            fetchClientSecret(addressData)
            setIsElement(2)
            setUserAddress([
                ...userAddress,{...addressData}
            ])
         }
         
      }


  return (
    <>
           <div className="flex flex-col justify-center items-center p-5 bg-[yellow]">
        <h4>Address</h4>
        <form onSubmit={(e)=>{perform(e)}}>
         <div className='my-2'>
         <label htmlFor="fullname">fullname</label>{" "}
          <input
            type="text"
            name="fullname"
            required
            value={addressData.fullname}
            id="fullname"
            onChange={(e) => {
              onchangeHandle(e);
            }}
          />
         </div>
          <div>
          <label htmlFor="mobile">mobile</label>{" "}
          <input
            type="text"
            name="mobile"
            required
            value={addressData.mobile}
            id="mobile"
            onChange={(e) => {
              onchangeHandle(e);
            }}
          />
          </div>
          <div>
          <label htmlFor="house">house</label>{" "}
          <input
            type="text"
            name="house"
            required
            value={addressData.house}
            id="house"
            onChange={(e) => {
              onchangeHandle(e);
            }}
          />
          </div>
          <div>
          <label htmlFor="zip">zip</label>{" "}
          <input
            type="text"
            name="zip"
            required
            value={addressData.zip}
            id="zip"
            onChange={(e) => {
              onchangeHandle(e);
            }}
          />
          </div>
          <div>
          <label htmlFor="city">city</label>{" "}
          <input
            type="text"
            name="city"
            required
            value={addressData.city}
            id="city"
            onChange={(e) => {
              onchangeHandle(e);
            }}
          />
          </div>
         <div>
         <label htmlFor="area">area</label>{" "}
          <input
            type="text"
            name="area"
            required
            value={addressData.area}
            id="area"
            onChange={(e) => {
              onchangeHandle(e);
            }}
          />
         </div>
         <div>
         <label htmlFor="landmark">landmark</label>{" "}
          <input
            type="text"
            name="landmark"
            required
            value={addressData.landmark}
            id="landmark"
            onChange={(e) => {
              onchangeHandle(e);
            }}
          />
         </div>
         <div>
         <label htmlFor="state">state</label>{" "}
          <input
            type="text"
            name="state"
            required
            value={addressData.state}
            id="state"
            onChange={(e) => {
              onchangeHandle(e);
            }}
          />
         </div>
        <button type="submit">Checkout</button>
        </form>
      </div> 
    </>
  )
}

export default Address

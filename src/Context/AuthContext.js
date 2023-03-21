import { createContext, useContext, useEffect ,useState} from "react";
import { getToken } from "./Mini_fuctions/AuthToken";
import { message } from "antd";
const Context=createContext()

export const AuthContext=({children})=>{
    
    const [userData, setUserData] = useState();
    const [registerersEmail,setRegisterersEmail]=useState()
      const [isLoading, setIsLoading] = useState(false);

      const authToken=getToken()

      const fetchLoggedInUser = async (token) => {
        setIsLoading(true);
        try {
          const response = await fetch(`${process.env.REACT_APP_DATAURL}${process.env.REACT_APP_USER_API}`, {
            headers: { Authorization: `${process.env.REACT_APP_BEARER} ${token}` },
          });
          const data = await response.json();
    
          setUserData(data);
        } catch (error) {
          console.error(error);
          message.error("Error While Getting Logged In User Details");
        } finally {
          setIsLoading(false);
        }
      };
    
      const updateUser = (user) => {
        setUserData(user);
      };


    useEffect(()=>{
        if (authToken) {
            fetchLoggedInUser(authToken);
          }
    },[authToken])

    return <Context.Provider value={{user:userData,setUser:updateUser,isLoading,registerersEmail,setRegisterersEmail}}>
        {children}
    </Context.Provider>
}


export const useAuthContext=()=>{
    return useContext(Context)
}
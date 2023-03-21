  const AUTH_TOKEN= process.env.REACT_APP_AUTH_TOKEN
    
    export const getToken = () => {
      return localStorage.getItem(AUTH_TOKEN);
    };
    
    export const setToken = (token) => {
      if (token) {
        localStorage.setItem(AUTH_TOKEN, token);
      }
    };
    
    export const removeToken = () => {
      localStorage.removeItem(AUTH_TOKEN);
    };
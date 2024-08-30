import { createContext, useState } from "react";


export const LogedInContext = createContext();
const initialValue=false


const IslogedInProvider = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState(initialValue);

  return (
    <LogedInContext.Provider value={{ isLogedIn, setIsLogedIn }}>
      {children}
    </LogedInContext.Provider>
  );
};

export default IslogedInProvider
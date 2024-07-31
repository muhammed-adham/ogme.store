import { createContext, useEffect, useState } from "react";

export const MobileContext = createContext();

const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState();

  const MobileHandler = (e) => {
    setIsMobile(e.matches);
  };

  useEffect(() => {
    window
      .matchMedia("(max-width:430px)")
      .addEventListener("change", MobileHandler);
    setIsMobile(window.matchMedia("(max-width:430px)").matches);
  },[]);

  return (
    <MobileContext.Provider value={{isMobile}}>{children}</MobileContext.Provider>
  );
};

export default MobileProvider;

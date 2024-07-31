import { createContext, useEffect, useState } from "react";

export const TabletContext = createContext();

const TabletProvider = ({ children }) => {
  const [isTablet, setIsTablet] = useState();

  const TabletHandler = (e) => {
    setIsTablet(e.matches);
  };

  useEffect(() => {
    window
      .matchMedia("(max-width:1024px)")
      .addEventListener("change", TabletHandler);
    setIsTablet(window.matchMedia("(max-width:1024px)").matches);
  }, []);

  return (
    <TabletContext.Provider value={{ isTablet }}>
      {children}
    </TabletContext.Provider>
  );
};

export default TabletProvider
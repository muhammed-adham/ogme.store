import { createContext, useState } from "react";


export const WishCountContext = createContext();
const initialValue=0

const WishCountProvider = ({ children }) => {
  const [wishCount, setWishCount] = useState(initialValue);

  return (
    <WishCountContext.Provider value={{ wishCount, setWishCount }}>
      {children}
    </WishCountContext.Provider>
  );
};

export default WishCountProvider
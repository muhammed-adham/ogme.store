import React from "react";
import { BiError } from "react-icons/bi";

const PNF = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <BiError style={{ fontSize: "8rem" }} />
      <h2 >page not found!</h2>
      <h2 style={{fontSize:'12rem'}}>404</h2>
      {/* <p>{errorMessage}</p> */}
    </div>
  );
};

export default PNF;

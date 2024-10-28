import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";

const Ad = () => {
  const handleClose = () => {
    document.querySelector(".ad-container").style.display = "none";
  };
  return (
    <div>
      <div className="ad-container">
        <div className="ad">
          <IoMdCloseCircle
            className="close"
            onClick={() => {
              handleClose();
            }}
          />
          <div className="content-container">
            <h1>be one of our family</h1>
            <p className="slogan">Get exclusive discounts on your order</p>
            <form action="">
              {/* <input type="text" /> */}
              <NavLink
                to={"/register"}
                onClick={() => {
                  handleClose();
                }}
              >
                <input type="submit" value={"subscribe"} onClick={() => {}} />
              </NavLink>
            </form>
            <hr style={{opacity:'.3'}}/>
            <p>Follow us to get the latest promotion</p>
            <div className="icons">
              <Link to={"https://www.facebook.com/ogmeofficial"} target="blank">
                <FaFacebookF />
              </Link>
              <Link to={"https://www.instagram.com/ogmestore/"} target="blank">
                <FaInstagram />
              </Link>
              <Link
                to={"https://www.tiktok.com/@ogmeofficial?_t=8l7YLc0ALQr&_r=1"}
                target="blank"
              >
                <FaTiktok />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ad;

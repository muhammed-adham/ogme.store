import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import DialogLogout from "../common/DialogLogout";
import { LogedInContext } from "../../context/IsLogedIn";

/* 
/** === Account Page ===
 *
 * This component represents the ِccount page.
 *
 */
const Account = () => {
  // const{data:userProfile, isLoading}= useQuery ("userProfile", GetUserProfile)
  const { isLogedIn } = useContext(LogedInContext);
  
  //========================================================================================Variables
  const navigate = useNavigate()

  const [dialog, setDialog] = useState(false);
  const Close = (e) => {
    setDialog((prev) => (prev = e));
  };

  //========================================================================================Handlers
  const logoutHandler = () => {
    setDialog((prev) => !prev);
  };

  //=============================================================Return==============================================================//
  return (
    <>
      {
        isLogedIn ? (
        <>
          <section className="account-page">
            <div className="container">
              <div className="side-bar">
                <div className="profile-picture">
                  <img src="/images/logo-white.jpg" alt="profile picture" />
                </div>
                <div className="side-nav">
                  <div className="nav-group">
                    <NavLink to={"/account/orders"}>
                      <div className="icon">
                        {" "}
                        <BsHandbag />
                      </div>
                      My Orders
                    </NavLink>
                  </div>
                  <div className="nav-group">
                    <NavLink to={"/account/setting"}>
                      <div className="icon">
                        <CiSettings />
                      </div>
                      Account settings
                    </NavLink>
                  </div>
                  <div className="log-out-btn" onClick={logoutHandler}>
                    log out
                  </div>
                </div>
              </div>
              <Outlet />
            </div>
          </section>
          {dialog ? <DialogLogout onDialog={Close} /> : null}
        </>
      ) :isLogedIn==undefined ? (
        <>
          <section className="empty-cart">
            <h2>Something went wrong! Please login again..</h2>
            <div
              className="shop-btn"
              onClick={() => (navigate("/login"), scroll(0, 0) )}
            >
              login
            </div>
          </section>
        </>
      ): <><div style={{height:"20rem"}}></div></>}
    </>
  );
};

export default Account;

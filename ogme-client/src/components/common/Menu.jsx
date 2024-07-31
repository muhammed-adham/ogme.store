import React, { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const Menu = () => {
  //========================================================================================Variables
  // Main Menu Link
  const menuLinks = [
    { path: "/", label: "home" },
    { path: "/shop", label: "shop" },
    { path: "/sale", label: "on sale" },
    { path: "/about", label: "about us" },
    { path: "/policy", label: "policy" },
  ];

  //Sub Menu Links => ShopLink
  const subMenuLinks = [
    { path: "/shop/drive", label: "ogme drive" },
    { path: "/shop/bottles", label: "ogme bottles" },
    { path: "/shop/glassware", label: "ogme glassware" },
    // { path: "/shop/suncatcher", label: "ogme suncatcher" },
    { path: "/ask", label: "Customize" },
  ];

  //========================================================================================UseStates
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(false);

  //========================================================================================Handlers
  const menuBtnHandler=()=>{
    if(activeSubMenu && !activeMenu){
      setActiveSubMenu(false)
    }
    if(!activeSubMenu && activeMenu){
      setActiveMenu(false)
    }
    if(!activeSubMenu && !activeMenu){
      setActiveMenu(true)
    }
  }

  const shopForward = (e) => {
    e.preventDefault();
    setActiveSubMenu(true);
    setActiveMenu(false);
  };
  const shopBackward = (e) => {
    setActiveMenu(true);
    setActiveSubMenu(false);
  };
  //===============================================================Return===============================================================//
  return (
    <>
      <div className="menu-section">
        <div className="container">
          <div className="menu-container">
            {activeMenu ? (
              <div className="menu-overlay">
                {menuLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.path}
                    onClick={link.label == "shop" ? shopForward : ()=>(scroll(0,0),menuBtnHandler())}
                  >
                    {link.label == "shop" ? (
                      <>
                        {link.label} <IoIosArrowForward />
                      </>
                    ) : (
                      link.label
                    )}
                  </Link>
                ))}
              </div>
            ) : null}
            {activeSubMenu ? (
              <div className="menu-overlay">
                <div className="title" onClick={shopBackward}>
                  <IoIosArrowBack />
                  <h2>Shop</h2>
                </div>
                {subMenuLinks.map((link, idx) => (
                  <Link key={idx} to={link.path} onClick={()=>(scroll(0,0),menuBtnHandler())}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
            <div
              className="menu-btn"
              onClick={menuBtnHandler}
            >
              {activeMenu || activeSubMenu ? (
                <IoClose />
              ) : (
                <>
                  <HiMenuAlt1 />
                  Menu
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;

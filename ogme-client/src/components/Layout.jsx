import React, { useContext, useEffect, useState } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { TabletContext } from "../context/TabletContext";
import HeaderMob from "./common/HeaderMob";
import Menu from "./common/Menu";

/** === Layout ===
 *
 * This component represents the Single Page Application.
 */
const Layout = () => {
  const { isTablet } = useContext(TabletContext);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  const loctaion = useLocation();
  const [isAdminPages, setIsAdminPage] = useState();

  useEffect(() => {
    setIsAdminPage(loctaion.pathname.startsWith("/backstage"));
  }, [location.pathname]);
  //=============================================================Return=================================================================//
  return (
    <>
      {isTablet ? (
        <>
          <HeaderMob />
          <Menu />
        </>
      ) : (
        <Header/>
      )}
      <Outlet />
      {!isAdminPages && <Footer />}
    </>
  );
};

export default Layout;

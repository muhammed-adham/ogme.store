import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { GetUserProfile } from "../../utils/axiosConfig";

const Admin = () => {
  const navigate = useNavigate();
  const [isAdminPanelPage, setIsAdminPanelPage] = useState();
  const currentLocation = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  //Check Admin Auth
  const { isLoading, isFetching } = useQuery("GetProfile", GetUserProfile, {
    onSuccess: (res) => {
      setIsAdmin(res?.data?.data?.role === "admin");
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setIsAdminPanelPage(location.pathname.endsWith("/backstage"));
  }, [currentLocation]);

  return isLoading || isFetching ? (
    <section className="admin-panel container">
      <h1>Loading...</h1>
    </section>
  ) : isAdmin ? (
    <>
      <section className="admin-panel container" >
        <div className="nav-links">
          <NavLink to={"banners"}>Banners</NavLink>
          <NavLink to={"products"} onClick={setIsAdminPanelPage}>
            Products
          </NavLink>
          <NavLink to={"orders"}>Orders</NavLink>
          <NavLink to={"users"}>Users</NavLink>
        </div>
        {!isAdminPanelPage ? (
          <Outlet />
        ) : (
          <h1>
            Take charge
            <br />
            <span>Use the filters above for a more targeted view.</span>
          </h1>
        )}
      </section>
    </>
  ) : (
    <section className="admin-panel container">
      <h1>
        Access Denied
        <br />
        <span>Restricted Area, You Need Admin Privileges</span>
        <div
          className="btn save-btn"
          style={{ margin: "auto", marginBlock: "2rem" }}
          onClick={() => navigate("/")}
        >
          Go Home
        </div>
      </h1>
    </section>
  );
};

export default Admin;

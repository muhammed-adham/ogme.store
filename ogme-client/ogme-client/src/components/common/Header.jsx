import React, { useContext, useEffect, useState } from "react";
import Navigation from "./Navigation";
import { BsHandbag } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { WishCountContext } from "../../context/WishCountContext";
import { getCartlistProducts, GetUserProfile } from "../../utils/axiosConfig";
import { useQuery } from "react-query";
import { LogedInContext } from "../../context/IsLogedIn";

/** === Header ===
 * This component represents the header section
 */

const Header = () => {
  //========================================================================================Variables
  const navigate = useNavigate();
  const { wishCount, setWishCount } = useContext(WishCountContext);
  const { isLogedIn, setIsLogedIn } = useContext(LogedInContext);
  const [cartProducts, setCartProducts] = useState(null);
  const [userProfileState, setUserProfileState] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: userProfile,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery(
    "userProfile",
    GetUserProfile,
    {
      onSuccess: (data) => {
        setUserProfileState(data);
      },
    },
    []
  );

  useEffect(() => {
    if (isSuccess) {
      setIsLogedIn(userProfile?.data?.status === 200);
      setCartProducts(userProfileState?.data?.cart?.response?.data);
      setIsAdmin(userProfileState?.data?.data?.role === "admin");
    }
  }, [userProfile, isSuccess]);

  //========================================================================================UseEffect
  //WishCounter
  useEffect(() => {
    refetch();
    //TotalCount DependOn Quantity of EachProduct in the Cart
    const totalQuantity = cartProducts?.reduce((total, product) => {
      const quantity = product.quantity;
      return total + quantity;
    }, 0);

    //Set WishCounter
    if (totalQuantity !== undefined) {
      setWishCount((prev) => totalQuantity);
    }
  }, [wishCount, cartProducts]);

  //===============================================================Return===============================================================//
  return (
    <>
      <header>
        <div className="container">
          <div className="logo" onClick={() => navigate("/")}>
            <img src="/images/logo.png" alt="logo" />
          </div>
          <Navigation admin={isAdmin} />
          <div className="account">
            {isLoading ? null : isLogedIn ? (
              <>
                <div className="cart-icon">
                  <NavLink to={"/cartlist"} className="cart">
                    <BsHandbag />
                  </NavLink>
                  {wishCount > 0 ? <span>{wishCount}</span> : null}
                </div>
                <div
                  className="profile"
                  onClick={() => {
                    navigate("/account/orders");
                  }}
                >
                  <img src="/images/logo-white.jpg" alt="profile picture" />
                </div>
              </>
            ) : (
              <div className="log-regist">
                <NavLink to={"/login"}>login</NavLink>
                <span>/</span>
                <NavLink to={"/register"}>register</NavLink>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

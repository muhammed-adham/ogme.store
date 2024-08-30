import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { WishCountContext } from "../../context/WishCountContext";
import { useQuery } from "react-query";
import { GetUserProfile } from "../../utils/axiosConfig";
import { LogedInContext } from "../../context/IsLogedIn";

const HeaderMob = () => {
  //========================================================================================Variables
  const navigate = useNavigate();
  const { wishCount, setWishCount } = useContext(WishCountContext);
  const { isLogedIn, setIsLogedIn } = useContext(LogedInContext);
  const [cartProducts, setCartProducts] = useState(null);
  const [userProfileState, setUserProfileState]= useState()

  const {
    data: userProfile,
    isLoading,
    isSuccess,
    refetch
  } = useQuery("userProfile", GetUserProfile, {
    onSuccess: (data) => {
      setUserProfileState(data)
    },
  },[]);

  useEffect(() => {
    if (isSuccess) {
      setIsLogedIn(userProfile?.data?.status === 200);
      setCartProducts(userProfileState?.data?.cart?.response?.data);
    }
  }, [userProfile,isSuccess]);

  //========================================================================================UseEffect
  //WishCounter
  useEffect(() => {
    refetch()
    //TotalCount DependOn Quantity of EachProduct in the Cart
    const totalQuantity = cartProducts?.reduce((total, product) => {
      const quantity = product.quantity;
      return total + quantity;
    }, 0);
    
    //Set WishCounter
    if(totalQuantity !== undefined){
      setWishCount((prev) => totalQuantity);
    }
  }, [wishCount, cartProducts]);

  //===============================================================Return===============================================================//
  return (
    <>
      <header className="header-mob">
        <div className="container">
          <div className="account">
            {isLoading ? null : isLogedIn ? (
              <>
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

              </div>
            )}
          </div>
          <div className="logo" onClick={() => navigate("/")}>
            <img src="/images/logo.png" alt="logo" />
          </div>
          <div className="cart-icon">
            <NavLink to={"/cartlist"} className="cart">
              <BsHandbag />
            </NavLink>
            {wishCount > 0 ? <span>{wishCount}</span> : null}
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderMob;

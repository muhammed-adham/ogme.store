import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishCountContext } from "../../context/WishCountContext";
import { axiosLogoutUser } from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import { LogedInContext } from "../../context/IsLogedIn";
import { useMutation } from "react-query";

/** === DialogAddress ===
 *
 * This componeny represent a dialog box used to ask user to provide addess details
 * It displays two options for Logout or Cancel
 *
 * Usage:
 * - Account Page
 *
 */
const DialogLogout = ({ onDialog }) => {
  const { setIsLogedIn } = useContext(LogedInContext);
  //========================================================================================Variables
  const navigate = useNavigate();
  const { setWishCount } = useContext(WishCountContext);

  //========================================================================================Handlers
  //Clear All Data & GoTo HomePage
  const logoutHandler = () => {
    onDialog(false);
    setWishCount(0);
    toast.success("Good Bye!",{icon:"👋"});
    axiosLogoutUser().then(() => {
      navigate("/");
      scroll(0, 0);
      history.replaceState(null, "", "/"), setIsLogedIn(false);
      window.location.reload()
    });
  };

  //==================================================================Return======================================================//
  return (
    <>
      <div className="dialog-container">
        <div className="dialog">
          <div className="message">
            <h2>are you sure you want to log out?</h2>
          </div>
          <div className="options">
            <div className="confirm btn-dialog" onClick={logoutHandler}>
              Log Out
            </div>
            <div className="cancel btn-dialog" onClick={() => onDialog(false)}>
              Cancel
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DialogLogout;

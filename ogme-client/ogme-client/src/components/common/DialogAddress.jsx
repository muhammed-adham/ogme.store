import React from "react";
import { useNavigate } from "react-router-dom";

/** === DialogAddress === 
 * 
 * This componeny represent a dialog box used to ask user to provide addess details
 * It displays two options for GoToSetting or Cancel
 *
 * Usage:
 * - Cart Page
 *
 */
const DialogAddress = ({ onDialog }) => {
  //========================================================================================Variables
  const navigate = useNavigate();

  //========================================================================================Handler
  //GoToSetting Action
  const addressDialogHandler = () => {
    onDialog(false);
    navigate("/account/setting");
    scroll(0,0)
  };

  //==================================================================Return======================================================//
  return (
    <>
      <div className="dialog-address-container">
        <div className="dialog">
          <div className="message">
            <h2>Please provide your Mobile Number!</h2>
          </div>
          <div className="options">
            <div className="confirm btn-dialog" onClick={addressDialogHandler}>
              Go to Settings
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

export default DialogAddress;

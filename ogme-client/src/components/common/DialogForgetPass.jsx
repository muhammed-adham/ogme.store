import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { resetPassword } from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

/** === DialogForget Password ===
 *
 * This component represent a dialog box used to reset user password
 * It displays two options for recover or Cancel
 *
 * Usage:
 * - Login Page
 *
 */
const DialogForgetPass = ({ onDialog }) => {
  const navigate = useNavigate();

  const [emailAddress, setEmailAddress] = useState();

  const { mutate: fetchResetPassword, isLoading } = useMutation(
    (email) => resetPassword(email),
    {
      onSuccess: (res) => {
        toast.success("Password reset email sent");
        navigate("/activate");
        addressDialogHandler();
      },
      onError: (err) => {
        toast.error("Something went wrong!");
      },
    }
  );
  //========================================================================================Variables
  //   const navigate = useNavigate();

  //========================================================================================Handler
  //GoToSetting Action
  const addressDialogHandler = () => {
    onDialog(false);
  };

  //input handler
  const inputHandler = (e) => {
    setEmailAddress({ email: e.target.value });
  };

  //Reset Button
  const resetBtnHandler = () => {
    fetchResetPassword(emailAddress);
  };

  return (
    <>
      <div className="dialog-reset-container">
        <div className="dialog">
          <div className="message">
            <h2>Forget Your Password?</h2>
          </div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email.."
            onInput={inputHandler}
            onChange={inputHandler}
          />
          <div className="options">
            <div className="confirm btn-dialog" onClick={resetBtnHandler}>
              {isLoading ? "Loading.." : "Reset"}
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

export default DialogForgetPass;

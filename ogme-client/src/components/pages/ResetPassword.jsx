import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  axiosLoginUser,
  postNewUser,
  updatePassword,
} from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DialogForgetPass from "../common/DialogForgetPass";
import { LogedInContext } from "../../context/IsLogedIn";
import { useMutation } from "react-query";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state.data;
  // console.log(data);

  const { mutate: updatePasswordApi, isLoading } = useMutation(
    (data) => updatePassword(data),
    {
      onSuccess: (res) => {
        // if (data.data.status === 200) {
        navigate("/login");
        //   history.replaceState(null, "", "/"); // Prevent going back after signup
        toast.success("Password has been updated");
        // } else {
        //   toast.error("email already exists");
        // }
      },
      onError: (error) => {
        console.log(error);
        toast.error("Something went wrong!");
        // toast.error("An error occurred. Please try again.");
      },
    }
  );
  //========================================================================================ShowPassword
  const [showPass, setShowPass] = useState();
  //========================================================================================Handle Submit on press enter
  const enterKeyHandler = (e) => {
    e.key === "Enter" ? submitHandler(e) : null;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    //========================================================================================userVariables
    const userPassword = document.getElementById("password");
    const userConfirmPassword = document.getElementById("confirm-password");

    //========================================================================================Password
    if (userPassword.value == 0) {
      toast.error("please enter a password");
      userPassword.classList.add("required");
    }
    //========================================================================================Confirm Password
    else if (userConfirmPassword.value == 0) {
      toast.error("please confirm password");
      userConfirmPassword.classList.add("required");
    } else if (userConfirmPassword.value !== userPassword.value) {
      toast.error("password doesn't match");
    }
    //========================================================================================If Success
    else if (userPassword.value !== 0 && userConfirmPassword.value !== 0) {
      updatePasswordApi({ ...data, ...userData });
    }
  };
  //========================================================================================Handle input Data
  const [userData, setUserData] = useState({
    password: "",
    "confirm-password": "",
  });

  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  //========================================================================================Handle input Data ForMobile
  const [inputData, setInputData] = useState({
    password: "",
    "confirm-password": "",
  });

  const onInputHandler = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <section className="log-regist-page">
        <div className="container">
          <div className="logo" style={{ width: "24rem" }}>
            <img
              src="/images/logo.png"
              alt="logo"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="title">
            <h2>reset password</h2>
          </div>
          <div className="form-container">
            <form action="" onSubmit={submitHandler}>
              <div className="form-group form-pass">
                <input
                  onInput={onInputHandler}
                  value={inputData.name}
                  onKeyDown={enterKeyHandler}
                  // required
                  autoComplete="off"
                  onChange={onChangeHandler}
                  name="password"
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="password"
                />
                <div
                  className="eye-icon"
                  onClick={() => {
                    setShowPass((prev) => !prev);
                  }}
                >
                  {showPass ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              <div className="form-group form-confirm-pass">
                <input
                  onInput={onInputHandler}
                  value={inputData.name}
                  onKeyDown={enterKeyHandler}
                  // required
                  autoComplete="off"
                  onChange={onChangeHandler}
                  name="confirm-password"
                  id="confirm-password"
                  type={showPass ? "text" : "password"}
                  placeholder="confirm password"
                />
              </div>

              <input
                type="submit"
                value={`${isLoading ? "loading.." : "Confirm"}`}
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default ResetPassword;

// import { GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postNewUser } from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "react-query";
import RegisterLoader from "../common/RegisterLoader";

/** === Register Page ===
 *
 * This component represents the Register page.
 *
 */
const Register = () => {
  const { mutate: createUser, isLoading } = useMutation(
    (userData) => postNewUser(userData),
    {
      onSuccess: (data) => {
        
        if (data.data.status === 200) {
          navigate("/activate", { state: { email: userData.userEmail } });
          history.replaceState(null, "", "/"); // Prevent going back after signUp
          toast.success("Verification email sent");
        } else {
          toast.error("email already exists");
        }
      },
      onError: (error) => {
        toast.error("An error occurred. Please try again.");
      },
    }
  );

  useEffect(() => {
    if (isLoading) {
    }
  }, [isLoading]);
  //========================================================================================ShowPassword
  const [showPass, setShowPass] = useState();
  //========================================================================================Variables
  const navigate = useNavigate();

  //========================================================================================Handle Submit on press enter
  const enterKeyHandler = (e) => {
    e.key === "Enter" ? submitHandler(e) : null;
  };
  //========================================================================================Handle Submit on click
  const submitHandler = (e) => {
    e.preventDefault();

    //========================================================================================userVariables
    const fullName = document.getElementById("fullName");
    const userEmail = document.getElementById("email");
    const userMobile = document.getElementById("mobile");
    const userPassword = document.getElementById("password");
    const userConfirmPassword = document.getElementById("confirm-password");
    //========================================================================================if inputs Empty
    //========================================================================================Name
    if (fullName.value == 0) {
      toast.error("please enter your full name");
      fullName.classList.add("required");
    }
    //========================================================================================Email
    else if (userEmail.value == 0) {
      toast.error("please enter your email");
      userEmail.classList.add("required");
    }
    //========================================================================================mobile
    else if (userMobile.value == 0) {
      toast.error("please enter your mobile number");
      userMobile.classList.add("required");
    }
    //========================================================================================Password
    else if (userPassword.value == 0) {
      toast.error("please enter a password");
      userPassword.classList.add("required");
    } else if (userPassword.value.length <= 5) {
      toast.error("Your password is too short!");
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
    else if (
      fullName.value !== 0 &&
      userEmail.value !== 0 &&
      userMobile.value !== 0 &&
      userPassword.value !== 0 &&
      userConfirmPassword.value !== 0
    ) {
      createUser(userData);
    }
  };

  //========================================================================================Handle input Data
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  //========================================================================================Handle input Data ForMobile
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });
  const onInputHandler = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  //=============================================================Return=================================================================//
  return (
    <>
      {isLoading ? <RegisterLoader /> : null}
        <section className="log-regist-page">
          <div className="container">
            <div className="title">
              <h2>sign up</h2>
              <p>
                Already Have an account?
                <Link to={"/login"}> log in</Link>
              </p>
            </div>
            <div className="form-container">
              <form action="" onSubmit={submitHandler}>
                <div className="form-group">
                  <input
                    onInput={onInputHandler}
                    value={inputData.name}
                    onKeyDown={enterKeyHandler}
                    // required
                    autoComplete="name"
                    onChange={onChangeHandler}
                    name="fullName"
                    id="fullName"
                    type="text"
                    placeholder="full name"
                  />
                </div>
                <div className="form-group">
                  <input
                    onInput={onInputHandler}
                    value={inputData.name}
                    onKeyDown={enterKeyHandler}
                    // required
                    autoComplete="email"
                    onChange={onChangeHandler}
                    name="email"
                    id="email"
                    type="email"
                    placeholder="email adress"
                  />
                </div>
                <div className="form-group">
                  <input
                    onInput={onInputHandler}
                    value={inputData.name}
                    onKeyDown={enterKeyHandler}
                    // required
                    autoComplete="tel"
                    onChange={onChangeHandler}
                    name="mobile"
                    id="mobile"
                    type="tel"
                    placeholder="mobile number"
                  />
                </div>
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
                  onClick={(e) => {
                    isLoading ? e.preventDefault() : null;
                  }}
                  className={isLoading ? "btn-disabled" : null}
                  type="submit"
                  value={`${isLoading ? "loading.." : "sign up"}`}
                />
              </form>
              {/* <p>or</p>
            <div className="outh">
              <GoogleLogin
                width={368}
                useOneTap={true}
                theme="filled_black"
                text="continue_with"
                onSuccess={(res) => {
                  GoogleAuthHandler(res);
                }}
                onError={(err) => {
                  toast.error(err);
                }}
              />
            </div> */}
            </div>
            <div className="you-agree">
              <p>
                By signing up, you agree to our{" "}
                <Link to={"/terms"} onClick={() => scroll(0, 0)}>
                  Terms of Use
                </Link>{" "}
                and acknowledge you've read our{" "}
                <Link to={"/policy"} onClick={() => scroll(0, 0)}>
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </section>
    </>
  );
};

export default Register;

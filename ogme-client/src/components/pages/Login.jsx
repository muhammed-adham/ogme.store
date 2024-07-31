import { GoogleLogin } from "@react-oauth/google";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosLoginUser, postNewUser } from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DialogForgetPass from "../common/DialogForgetPass";
import { LogedInContext } from "../../context/IsLogedIn";
import { useMutation } from "react-query";

/** === Log Page ===
 *
 * This component represents a login page.
 *
 * */
const Login = () => {
  const { mutate: userLogin, isLoading } = useMutation(
    (userData) => axiosLoginUser(userData),
    {
      onSuccess: (data) => {
        if (data.data.status === 200) {
          navigate("/");
          scroll(0,0)
          history.replaceState(null, "", "/"), //prevent go back after signup
            toast.success(data.data.message),
            setIsLogedIn(true);
        } else {
          toast.error(data.data.message);
        }
      },
      onError: (error) => {
        toast.error("An error occurred. Please try again.");
      },
    }
  );

  const { isLogedIn, setIsLogedIn } = useContext(LogedInContext);

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
    // const userName = document.getElementById("name");
    const userEmail = document.getElementById("username");
    // const userPhone = document.getElementById("phone");
    const userPassword = document.getElementById("password");
    //========================================================================================if inputsEmpty

    //========================================================================================Email
    if (userEmail.value == 0) {
      toast.error("please enter your email");
      userEmail.classList.add("required");
    }

    //========================================================================================Password
    else if (userPassword.value == 0) {
      toast.error("please enter a password");
      userPassword.classList.add("required");
    }

    //========================================================================================If Success
    else if (userEmail.value !== 0 && userPassword.value !== 0) {
        userLogin(userData)

    }
  };

  //========================================================================================Handle input Data
  const [userData, setUserData] = useState({
    username: "",
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
    username: "",
    password: "",
  });
  const onInputHandler = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  //========================================================================================Dialog Handler
  const [dialog, setDialog] = useState(false);
  const Close = (e) => {
    setDialog((prev) => (prev = e));
  };

  const logoutHandler = () => {
    setDialog((prev) => !prev);
  };

  //=============================================================Return=================================================================//
  return (
    <>
      <section className="log-regist-page">
        <div className="container">
          <div className="title">
            <h2>log in</h2>
            <p>
              Don't Have an account?
              <Link to={"/register"}> sign up</Link>
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
                  autoComplete="email"
                  onChange={onChangeHandler}
                  name="username"
                  id="username"
                  type="username"
                  placeholder="email adress"
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
              <Link className="forget-password" onClick={() => setDialog(true)}>
                Forget password?
              </Link>
              <input
                onKeyDown={enterKeyHandler}
                type="submit"
                value={`${isLoading ? "loading.." : "log in"}`}
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
                  const decoded = jwtDecode(res?.credential);
                  console.log(decoded)
                }}
                onError={(err) => {
                  console.log(err);
                }}
              />
            </div> */}
          </div>
          <div className="you-agree">
            <Link to={"/terms"} onClick={() => scroll(0, 0)}>
              Terms of Use
            </Link>{" "}
            <Link to={"/policy"} onClick={() => scroll(0, 0)}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>
      {dialog ? <DialogForgetPass onDialog={Close} /> : null}
    </>
  );
};

export default Login;

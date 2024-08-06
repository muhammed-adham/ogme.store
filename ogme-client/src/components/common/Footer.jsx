import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { GetUserProfile, askUsEmail } from "../../utils/axiosConfig";
import toast from "react-hot-toast";
/** === Footer ===
 *
 * This component represents a footer section
 *
 */
const Footer = () => {
  const [userDataState, setUserDataState] = useState();
  useQuery("userProfile", GetUserProfile, {
    onSuccess: (data) => {
      setUserDataState(data?.data?.data);
    },
  });

  //Term Links
  const termLinks = [
    { path: "/policy", label: "Policy" },
    { path: "/terms", label: "Terms of Service" },
    { path: "/fqa", label: "FAQ" },
  ];

  //========================================================================================Handle input Data ForMobile
  const [inputData, setInputData] = useState({
    email: "",
    name: userDataState?.fullName || "New Member",
    phone: userDataState?.mobile || "No Provided",
    message:
      "Sign me up to your art letter for early access to promotion, new drop’s,updates and more",
  });
  const onChaneHandler = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const onInputHandler = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const submitMail = () => {
    if (
      /^[a-zA-z0-9]{3,}@(gmail|yahoo|hotmail|outlook|icloud)\.com$/.test(
        inputData.email
      )
    ) {
      toast.promise(
        askUsEmail(inputData).then(() => {
          toast.success("mail sent successfully");
          document.getElementById("email-sign").value = "";
          scroll({ top: 0, behavior: "smooth" });
        }),
        {
          loading: "sending...",
          success: <b>mail sent successfully</b>,
          error: <b>email is incorrect!</b>,
        }
      );
      

    } 
  };
  //==================================================================Return======================================================//
  return (
    <footer>
      <div className="form-footer">
        <div className="title">
          <h2>never miss a thing</h2>
          <p>
            Sign up to our art letter for early access to promotion, new drop’s,
            updates and more
          </p>
        </div>
        <div className="email-input">
          <input
            id="email-sign"
            type="email"
            name="email"
            placeholder="Enter your email"
            onInput={onInputHandler}
            onChange={onChaneHandler}
          />
          <HiOutlineMail onClick={submitMail} />
        </div>
      </div>
      <div className="widgets">
        <div className="social-icons">
          <Link
            to={"https://www.facebook.com/ogmeofficial"}
            target="blank"
            className="icon-container"
          >
            <FaFacebookF />
          </Link>
          <Link
            to={"https://www.instagram.com/ogmestore/"}
            target="blank"
            className="icon-container"
          >
            <FaInstagram />
          </Link>
          <Link
            to={"https://www.tiktok.com/@ogmeofficial?_t=8l7YLc0ALQr&_r=1"}
            target="blank"
            className="icon-container"
          >
            <FaTiktok />
          </Link>
        </div>
        <div className="terms">
          {termLinks.map((li, idx) => (
            <Link key={idx} to={li.path} onClick={() => scroll(0, 0)}>
              {li.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

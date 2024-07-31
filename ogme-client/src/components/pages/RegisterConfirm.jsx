import React from "react";
import { MdEmail } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";
import { Link } from "react-router-dom";

const RegisterConfirm = () => {
  return (
    <>
      <div className="check-email">
        <div className="logo" >
          <img
            src="/images/logo.png"
            alt="logo"
          />
        </div>
        <div className="title">
          <MdEmail />
          <h1>Check Your Inbox</h1>
        </div>
        <p>Confirm your identity by clicking the link we sent</p>
        <div
          className="button"
          onClick={() =>
            (window.location.href =
              "https://mail.google.com/mail/u/0/#search/from%3A(ogme.store)+in%3Aanywhere")
          }
        >
          <img src="./icons/gmail.svg" alt="" />
          <b>Open Gmail</b>
          <CiShare1 />
        </div>
        <Link to={"/"}>Home Page</Link>
      </div>
    </>
  );
};

export default RegisterConfirm;

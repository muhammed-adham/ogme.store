import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { verifyUserEmail } from "../../utils/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const WelcomeOnBoard = () => {
  console.log('welecome');
  
  const { id, token } = useParams();
  const navigate = useNavigate();
  const { mutate: verifyEmail } = useMutation(
    ({ id, token }) => verifyUserEmail(id, token),
    {
      onSuccess: (data) => {
        if (data?.data?.status === 200) {
          toast.success("Verified Successfully!");
          navigate("/login");
        }else{
          toast.error('something went wrong!')
        }
      },
    }
  );

  useEffect(() => {
    verifyEmail({ id, token });
  }, []);
  return (
    <>
      <div
        className="onboard-welcome"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "70vh",
          gap: "2rem",
        }}
      >
        <div className="logo">
          <img
            src="/images/logo.png"
            alt="logo"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </>
  );
};

export default WelcomeOnBoard;

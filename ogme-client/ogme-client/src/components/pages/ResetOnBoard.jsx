import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { verifyResetToken } from "../../utils/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResetOnBoard = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const { mutate: verifyResetPassword } = useMutation(
    ({ id, token }) => verifyResetToken(id, token),
    {
      onSuccess: (data) => {
        if (data?.data?.status === 412) {
          navigate("/login");
          toast.error("Oops! This link is no longer valid.");
        }
        if (data?.data?.status === 200) {
          navigate(`/reset-password`, { state: { data: data.data } });
        }
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    verifyResetPassword({ id, token });
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

export default ResetOnBoard;

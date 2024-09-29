import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { postUserOrder } from "../../utils/axiosConfig";
import ConfettiExplosion from "react-confetti-explosion";

const Purchase = () => {
  const [isExploding, setIsExploding] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  // state for order data
  const [OrderData, setOrderData] = useState();

  useEffect(() => {
    if (location.state?.data) {
      setOrderData(location.state.data || null);
    } else {
      toast.error("something went wrong! please try again later");
    }
  }, []);

  const inputHandler = (e) => {
    setOrderData({
      ...OrderData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (location.state?.data) {
      setOrderData(location.state.data || null);
    } else {
      toast.error("something went wrong! please try again later");
      return;
    }
    //========================================================================================userVariables
    const clientName = document.getElementById("clientName");
    const mobile = document.getElementById("mobile");
    const address = document.getElementById("address");
    //========================================================================================if inputs Empty
    //========================================================================================Name
    if (clientName.value == 0) {
      toast.error("please enter your full name");
      clientName.classList.add("required");
    }

    //========================================================================================mobile
    else if (mobile.value == 0) {
      toast.error("please enter your mobile number");
      mobile.classList.add("required");
    }
    //========================================================================================address
    else if (address.value == 0) {
      toast.error("please enter your address");
      address.classList.add("required");
    }
    //========================================================================================If Success
    else if (
      clientName.value !== 0 &&
      mobile.value !== 0 &&
      address.value !== 0
    ) {
      setIsExploding(true);

      await fbq("track", "Purchase", {
        content_type: OrderData.category,
        content_name: OrderData.product_name,
        // Assuming each product has a price
        total: OrderData.product_price,
        quantity: OrderData.quantity, // Assuming each product has a quantity
        method: "cash",
      });

        await postUserOrder(OrderData);

      toast.success("your order has been processed"),
        // Delay navigation to allow confetti to show
        setTimeout(() => {
          navigate("/");
        }, 2000); // Adjust the time as necessary
    }
  };

  return (
    <>
      {isExploding && (
        <div
          className="confetti"
          style={{
            width: "1%",
            height: "1%",
            position: "absolute",
            top: "0%",
            left: "50%",
          }}
        >
          <ConfettiExplosion
            width={2500}
            force={0.8}
            duration={3000}
            particleCount={350}
          />
        </div>
      )}
      <section className="ask-us">
        <div className="container">
          <div className="form-container">
            <div className="title">
              <h2>purchase order</h2>
              <p>
                Please provide the following information to ensure your order is
                processed and delivered accurately.
              </p>
            </div>
            <div className="form-group">
              <form action="" onSubmit={submitHandler}>
                <input
                  name="clientName"
                  id="clientName"
                  type="text"
                  placeholder="Enter your name"
                  onChange={inputHandler}
                  onInput={inputHandler}
                  //   value={inputData.name}
                />
                <input
                  name="mobile"
                  id="mobile"
                  type="text"
                  placeholder="Enter your phone number"
                  onChange={inputHandler}
                  onInput={inputHandler}
                  //   value={inputData.name}
                />
                <input
                  name="address"
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  onChange={inputHandler}
                  onInput={inputHandler}
                />
                <div className="submit" onClick={submitHandler}>
                  submit
                </div>
                <b style={{ alignSelf: "center" }}>
                  Pay conveniently with cash when your order arrives.
                </b>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Purchase;

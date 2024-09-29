import React, { useContext, useState } from "react";
import {
  askUsEmail,
  GetUserProfile,
  postUserOrder,
  removeProductCart,
} from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { WishCountContext } from "../../context/WishCountContext";
import { useQuery } from "react-query";
import ConfettiExplosion from "react-confetti-explosion";

/** === Ask Page ===
 *
 * This component represents the "Ask Us" Page.
 *
 */
const InstaPay = () => {
  const [isExploding, setIsExploding] = React.useState(false);

  //========================================================================================Handle input Data ForMobile
  //========================================================================================cartListCounterContext
  const { setWishCount, wishCount } = useContext(WishCountContext);

  //========================================================================================handle data from axios
  const [cartProducts, setCartProducts] = useState();

  useQuery("userProfile", GetUserProfile, {
    onSuccess: (data) => {
      setCartProducts(data?.data?.cart?.response?.data);
    },
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    userName: "",
    email: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
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

  const submitHandler = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Loading...");

    // Handle the image upload and await the response
    const uploadResponse = await handleUpload();

    const { userName, email, phone } = inputData;

    const data = {
      name: userName,
      phone,
      email,
      message: uploadResponse,
    };

    if (!userName || !phone || !email || !uploadResponse) {
      toast.error("please provide valid information");
    } else {
      setIsExploding(true);

      // Track the checkout event with Meta Pixel
      await fbq("track", "Purchase", {
        content_type: cartProducts.map((el) => el.category),
        content_names: cartProducts.map((el) => el.product_name),
        // Assuming each product has a price
        total: cartProducts.reduce(
          (total, el) => total + el.product_price * el.quantity,
          0
        ),
        quantity: cartProducts.reduce((total, el) => total + el.quantity, 0), // Assuming each product has a quantity
        method: "instapay",
      });

      await askUsEmail(data);
      await cartProducts.map((el) => {
        const productWithPayment = {
          ...el,
          payment: "instaPay", // Add the payment key
        };
        removeProductCart(el._id);
        postUserOrder(productWithPayment);
      });
      toast.success("your order has been processed"),
        setCartProducts(null),
        setWishCount(0),
        setTimeout(() => {
          navigate("/account/orders");
        }, 2000); // Adjust the time as necessary
    }
    toast.dismiss(loadingToastId); // Dismiss the loading toast
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  // Handle Upload image
  const [loading, setIsLoading] = useState(false);
  const handleUpload = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "insta-payment"); // Replace with your upload preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dgu9xnvxf/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      // toast.error("Upload failed.");
    }
    setIsLoading(false);
  };

  //=============================================================Return==============================================================//
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
              <h2>Ogme.store@instapay</h2>
              <p>Enter your details and upload your InstaPay screenshot.</p>
            </div>
            <div className="form-group">
              <form action="" onSubmit={submitHandler}>
                <input
                  name="userName"
                  id="userName"
                  type="text"
                  placeholder="Enter your name"
                  onChange={onChangeHandler}
                  onInput={onInputHandler}
                  value={inputData.name}
                />
                <input
                  name="phone"
                  id="phone"
                  type="text"
                  placeholder="Enter your phone number"
                  onChange={onChangeHandler}
                  onInput={onInputHandler}
                  value={inputData.name}
                />
                <input
                  name="email"
                  id="email"
                  type="text"
                  placeholder="Enter your email adress"
                  onChange={onChangeHandler}
                  onInput={onInputHandler}
                  value={inputData.name}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="file-select"
                />

                <div
                  className="submit"
                  onClick={loading ? null : submitHandler}
                >
                  {loading ? "loading.." : "submit Payment"}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstaPay;

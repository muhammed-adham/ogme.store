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

/** === Ask Page ===
 *
 * This component represents the "Ask Us" Page.
 *
 */
const InstaPay = () => {
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
      await askUsEmail(data);
      await cartProducts.map((el) => {
        removeProductCart(el._id);
        postUserOrder(el);
      });
      toast.dismiss(loadingToastId); // Dismiss the loading toast
      toast.success("your order has been processed"),
        setCartProducts(null),
        setWishCount(0),
        navigate("/account/orders");
    }
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
      toast.error("Upload failed.");
    }
    setIsLoading(false);
  };

  //=============================================================Return==============================================================//
  return (
    <>
      <section className="ask-us">
        <div className="container">
          <div className="form-container">
            <div className="title">
              <h2>Pay with InstaPay</h2>
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

import React, { useContext, useState } from "react";
import { askUsEmail, GetUserProfile } from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { WishCountContext } from "../../context/WishCountContext";
import { useQuery } from "react-query";

/** === Ask Page ===
 *
 * This component represents the "Ask Us" Page.
 *
 * Layout:
 * - .ask-us: The main container for the "Ask Us" section.
 *   - .container: The container for the section contents.
 *     - .form-container: The container for the form.
 *       - .title: The container for the section title and description.
 *         - <h2>: The heading element for the section title.
 *         - <p>: The paragraph element for the section description.
 *       - .form-group: The container for the form inputs and submit button.
 *         - <form>: The form element.
 *           - <input>*3: The input element field.
 *           - <textarea>: The textarea element for the message field.
 *           - div.submit: The submit button element.
 */
const InstaPay = () => {
  //========================================================================================Handle input Data ForMobile
  //========================================================================================cartListCounterContext
  const { setWishCount, wishCount } = useContext(WishCountContext);

  //========================================================================================handle data from axios
  const [cartProducts, setCartProducts] = useState();

  const { isLoading } = useQuery("userProfile", GetUserProfile, {
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
    message: "",
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

  const submitHandler = (e) => {
    e.preventDefault();
    const { userName, email, phone, message } = inputData;
    const data = {
      name: userName,
      phone,
      email,
      message,
    };
    if (!name || !phone || !email || !message) {
      toast.error("please provide valid information");
    } else {
      askUsEmail(data).then(() => {
        toast.success("Mail Sent Successfully");
        navigate("/");
      });
      cartProducts.map((el) => {
        removeProductCart(el._id);
        postUserOrder(el);
      });
      toast.success("your order has been processed"),
        setCartProducts(null),
        setWishCount(0),
        navigate("/account/orders");
    }
  };

  const [screenshot, setScreenshot] = useState("");
  const [pasteContent, setPasteContent] = useState('');

  const handlePaste = (event) => {
    event.preventDefault();
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (e) => {
          setScreenshot(e.target.result);
          setPasteContent(''); // Clear the placeholder
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const [isEmpty, setIsEmpty] = useState(true);
  const handleInput = (event) => {
    setPasteContent(event.target.innerText);
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

                <div
                  contentEditable
                  onPaste={handlePaste}
                  onInput={handleInput}
                  className="pasteArea"
                  placeholder="Paste your screenshot here (Ctrl+V)"
                  suppressContentEditableWarning={true}
                >
                  {pasteContent.length === 0 && (
                    <span className="placeholder">
                      Paste your screenshot here.
                    </span>
                  )}
                  {screenshot && (
                    <img
                      src={screenshot}
                      alt="Screenshot"
                      className="imagePreview"
                    />
                  )}
                </div>

                <div className="submit" onClick={submitHandler}>
                  submit Payment
                </div>
                {/* <input
                className="submit"
                // onKeyDown={enterKeyHandler}
                type="submit"
                value={"submit"}
              /> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstaPay;

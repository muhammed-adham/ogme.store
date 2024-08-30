import React, { useState } from "react";
import { askUsEmail } from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
const Ask = () => {
  //========================================================================================Handle input Data ForMobile
  const navigate=useNavigate()
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
    askUsEmail(data).then(() => {
      toast.success("Mail Sent Successfully")
      navigate('/')
    });
  };
  //=============================================================Return==============================================================//
  return (
    <>
      <section className="ask-us">
        <div className="container">
          <div className="form-container">
            <div className="title">
              <h2>ask us</h2>
              <p>we are here to help and answer any question you might have.</p>
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
                <textarea
                  name="message"
                  id="message"
                  type="text"
                  placeholder="Enter your message.."
                  onChange={onChangeHandler}
                  onInput={onInputHandler}
                  value={inputData.name}
                />
                <div className="submit" onClick={submitHandler}>submit</div>
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

export default Ask;
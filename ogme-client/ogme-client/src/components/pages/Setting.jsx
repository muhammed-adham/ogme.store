import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { GetUserProfile, updateUserData } from "../../utils/axiosConfig";
import toast from "react-hot-toast";

/** === Setting Page ===
 *
 * This component represents the Setting page.
 *
 */
const Setting = () => {
  //========================================================================================GetUser Data from Api
  const [UserData, setUsereData] = useState();

  const { data: userProfile, refetch } = useQuery(
    "userProfile",
    GetUserProfile
  );

  useEffect(() => {
    setUsereData(userProfile?.data?.data);
  }, [GetUserProfile]);

  //========================================================================================Handle Form Submit
  const enterKeyHandler = (e) => {
    e.key === "Enter" ? submitHandler(e) : null;
  };

  // const [newUserData,setNewUserData]=useState()
  const onChangeHandler = (e) => {
    setUsereData({
      ...UserData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // updateUserData(UserData);
    toast.promise(updateUserData(UserData), {
      loading: "Saving...",
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    });
    refetch();
  };
  //========================================================================================Handle input Data ForMobile
  const [inputData, setInputData] = useState({
    fullName: "",
    // email: "",
    mobile: "",
    // address: "",
    // city: "",
    // bulding: "",
    // floor: "",
    // apt: "",
  });
  const onInputHandler = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  //==================================================================Return========================================================//
  return (
    <>
      <div className="setting-page">
        <div className="container-setting">
          <div className="profile info-container">
            <div className="title">
              <h2>profile information</h2>
            </div>
            <div className="form-container">
              <form action="">
                <input
                  onInput={onInputHandler}
                  value={UserData?.fullName ? UserData?.fullName : ""}
                  onKeyDown={enterKeyHandler}
                  onChange={onChangeHandler}
                  defaultValue={UserData?.fullName}
                  name="fullName"
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                />
                {/* <input
                  onInput={onInputHandler}
                  value={UserData?.email ? UserData?.email : ""}
                  onKeyDown={enterKeyHandler}
                  onChange={onChangeHandler}
                  defaultValue={UserData?.email}
                  name="email"
                  id="email"
                  type="text"
                  placeholder="E-mail"
                /> */}
                <input
                  onInput={onInputHandler}
                  value={UserData?.mobile ? UserData?.mobile : ""}
                  onKeyDown={enterKeyHandler}
                  onChange={onChangeHandler}
                  defaultValue={UserData?.mobile}
                  name="mobile"
                  id="mobile"
                  type="text"
                  placeholder="mobile Number"
                />
              </form>
            </div>
          </div>
          {/* <div className="address info-container">
            <div className="title">
              <h2>address</h2>
            </div>
            <div className="form-container">
              <form action="">
                <input
                  onInput={onInputHandler}
                  value={UserData ? UserData?.address : inputData.address}
                  onKeyDown={enterKeyHandler}
                  onChange={onChangeHandler}
                  defaultValue={UserData?.address}
                  name="address"
                  id="address"
                  type="text"
                  placeholder="Address"
                />
                <input
                  onInput={onInputHandler}
                  value={UserData ? UserData?.city : inputData.city}
                  onKeyDown={enterKeyHandler}
                  onChange={onChangeHandler}
                  defaultValue={UserData?.city}
                  name="city"
                  id="city"
                  type="text"
                  placeholder="City"
                />
                <input
                  onInput={onInputHandler}
                  value={UserData?UserData?.bulding:inputData.bulding}
                  onKeyDown={enterKeyHandler}
                  onChange={onChangeHandler}
                  defaultValue={UserData?.bulding}
                  name="bulding"
                  id="bulding"
                  type="text"
                  placeholder="Bulding No"
                />
                <input
                  onInput={onInputHandler}
                  value={UserData?UserData?.floor:inputData.floor}
                  onKeyDown={enterKeyHandler}
                  onChange={onChangeHandler}
                  defaultValue={ UserData?.floor}
                  name="floor"
                  id="floor"
                  type="text"
                  placeholder="Floor No"
                />
                <input
                  onInput={onInputHandler}
                  value={UserData?UserData?.apt:inputData.apt}
                  onKeyDown={enterKeyHandler}
                  onChange={onChangeHandler}
                  defaultValue={UserData?.apt}
                  name="apt"
                  id="apt"
                  type="text"
                  placeholder="Apartment No"
                />
              </form>
            </div>
          </div> */}
          <input
            onKeyDown={enterKeyHandler}
            type="submit"
            value={"save all"}
            onClick={submitHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Setting;

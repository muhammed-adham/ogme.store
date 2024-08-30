import React, { useState } from "react";
import { useQuery } from "react-query";
import { getBanner, updateBanner } from "../../utils/axiosConfig";
import toast from "react-hot-toast";

const AdminBanners = () => {
  const [inputState, setInputState] = useState({
    home: { id: "", bannerURL: "" },
    drive: { id: "", bannerURL: "" },
    bottles: { id: "", bannerURL: "" },
    glassware: { id: "", bannerURL: "" },
    sale: { id: "", bannerURL: "" },
    artist: { id: "", bannerURL: "" },
  });
  const [inputValueState, setInputValueState] = useState({
    home: { id: "", bannerURL: "" },
    drive: { id: "", bannerURL: "" },
    bottles: { id: "", bannerURL: "" },
    glassware: { id: "", bannerURL: "" },
    sale: { id: "", bannerURL: "" },
    artist: { id: "", bannerURL: "" },
  });

  //Fetch Data
  useQuery("GetBanner", () => getBanner("Ogme drive"), {
    onSuccess: (data) => {
      const fetchedData = data?.data?.response?.data;
      const newState = fetchedData.reduce((acc, object) => {
        acc[object.title.split(" ")[1]] = {
          id: object._id,
          bannerURL: object.bannerURL,
        }; // Set property with title as key, object as value
        return acc;
      }, {});
      setInputState(newState);
      setInputValueState(newState);
    },
  });

  //Handlers=
  const inputHandler = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: {
        ...inputState[e.target.name],
        bannerURL: e.target.value,
      },
    });

    if (e.target.value === inputValueState[e.target.name]?.bannerURL) {
      e.target.nextElementSibling.classList.add("disabled");
      e.target.nextElementSibling.classList.remove("save-btn");
    } else {
      e.target.nextElementSibling.classList.remove("disabled");
      e.target.nextElementSibling.classList.add("save-btn");
    }
  };

  //Save Handler
  const saveHandler = (e) => {
    const { id, bannerURL } = inputState[e.target.previousElementSibling.name];
    // console.log(id);
    // console.log(inputState[e.target.previousElementSibling.name]);
    updateBanner(id, bannerURL).then((res) => {
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message),
          e.target.classList.add("disabled"),
          e.target.classList.remove("save-btn");
      } else {
        toast.error(res?.data?.message);
      }
    });
    // updateBanner
  };

  return (
    <form className="form-product" action="" method="post">
      <div className="form-group">
        <label htmlFor="home">home banner</label>
        <div className="input-group">
          <input
            onInput={inputHandler}
            value={inputState?.home?.bannerURL}
            type="text"
            id="home"
            name="home"
          />
          <div className="btn disabled" onClick={saveHandler}>
            save
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="main">drive banner</label>
        <div className="input-group">
          <input
            onInput={inputHandler}
            value={inputState?.drive?.bannerURL}
            type="text"
            id="drive"
            name="drive"
          />
          <div className="btn disabled" onClick={saveHandler}>
            save
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="bottles">bottles banner</label>
        <div className="input-group">
          <input
            onInput={inputHandler}
            value={inputState?.bottles?.bannerURL}
            type="text"
            id="bottles"
            name="bottles"
          />
          <div className="btn disabled" onClick={saveHandler}>
            save
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="glassware">glassware banner</label>
        <div className="input-group">
          <input
            onInput={inputHandler}
            value={inputState?.glassware?.bannerURL}
            type="text"
            id="glassware"
            name="glassware"
          />
          <div className="btn disabled" onClick={saveHandler}>
            save
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="sale">sale banner</label>
        <div className="input-group">
          <input
            onInput={inputHandler}
            value={inputState?.sale?.bannerURL}
            type="text"
            id="sale"
            name="sale"
          />
          <div className="btn disabled" onClick={saveHandler}>
            save
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="artist">artist banner</label>
        <div className="input-group">
          <input
            onInput={inputHandler}
            value={inputState?.artist?.bannerURL}
            type="text"
            id="artist"
            name="artist"
          />
          <div className="btn disabled" onClick={saveHandler}>
            save
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminBanners;

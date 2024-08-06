import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getAllOrders,
  getUser,
  updateOrderState,
} from "../../utils/axiosConfig";
import toast from "react-hot-toast";

const AdminOrders = () => {
  //States
  const [ordersState, setOrdersState] = useState([]);
  const [mergedData, setMergedData] = useState();
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [termState, setTermState] = useState("");
  const [ordersStatus, setOrdersStatus] = useState([]);

  //Fetch Orders Data
  const { isLoading, isFetching, isFetched } = useQuery(
    "AllOrders",
    getAllOrders,
    {
      onSuccess: (res) => {
        setOrdersState(res?.data?.response?.data);
      },
      refetchOnWindowFocus: false,
    }
  );

  //Get UserInfo Of The Fetched Orders
  useEffect(() => {
    const fetchData = async () => {
      const mergedArray = [];
      for (const order of ordersState) {
        // Use for...of loop for better async handling
        setUserDataLoading(true);
        try {
          const userData = await getUser(order.user); // Use await for cleaner async handling
          mergedArray.push({
            order,
            user: userData?.data?.response?.data?.[0] || {},
          }); // Set empty object if user data is missing
        } finally {
          setUserDataLoading(false);
        }
      }
      setMergedData(mergedArray);
    };

    fetchData(); // Call fetchData immediately (optional, adjust based on use case)
  }, [ordersState]); // Re-run useEffect only when orders change

  //Enable Save Btn After changing Order State
  const orderStateHandler = (e) => {
    // e.target.style.outlineColor = "red";
    e.target.classList.add("dataChanged");
    e.target.parentNode.nextElementSibling.children[0].classList.remove(
      "disabled-save-btn"
    );
    e.target.parentNode.nextElementSibling.children[0].classList.add(
      "save-btn"
    );
  };

  //Save Btn Handler
  const saveHandler = (e, id) => {
    if (
      e.target.parentNode.previousElementSibling.children[0].classList.contains(
        "dataChanged"
      )
    ) {
      e.target.classList.add("disabled-save-btn");
      e.target.classList.remove("save-btn");
      e.target.parentNode.previousElementSibling.children[0].classList.remove(
        "dataChanged"
      );
      const state =
        e.target.parentNode.previousElementSibling.children[0].value;
      updateOrderState(id, state).then((res) => {
        if (res?.data?.status === 200) {
          toast.success("Order Updated Successfully");
        } else {
          toast.error("Something went wrond");
        }
      });
    } else {
      e.preventDefault();
    }
  };

  //Search Handler
  const searchHandler = (e) => {
    setTermState(e.target.value);
  };

  //Order State Handler
  const searchByOrderStateHandler = (e) => {
    setOrdersStatus(e.target.value);
  };

  return (
    <>
      <section className="admin-panel">
        <h1 className="header">Orders</h1>
        <div className="search-section">
          <div className="form-group" style={{ width: "100%" }}>
            <select
              defaultValue={""}
              name="category-search"
              id="category-search"
              onInput={searchByOrderStateHandler}
            >
              <option value="" disabled>
                Search by Order State...
              </option>
              <option value="all">All</option>
              <option value="Pending">pending</option>
              <option value="ready">ready</option>
              <option value="out">out</option>
              <option value="delivered">delivered</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search by Phone number..."
            onInput={searchHandler}
            style={{marginBottom:"2rem"}}
          />
        </div>
        {isLoading || isFetching || userDataLoading ? (
          <h1>Loading...</h1>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>client info</th>
                <th>product name</th>
                <th>price</th>
                <th>amount</th>
                <th>date</th>
                <th>status</th>
                <th>save</th>
              </tr>
            </thead>
            <tbody>
              {mergedData?.toReversed()?.map((data, idx) => {
                const {
                  order: {
                    _id,
                    product_name: prdName,
                    product_price: price,
                    quantity,
                    state,
                    created_at: date,
                  },
                  user: { fullName: userName, email, mobile },
                } = data;

                if (
                  mobile?.includes(termState) &&
                  (ordersStatus == "all" ||
                    state === ordersStatus ||
                    ordersStatus == "")
                ) {
                  return (
                    <tr key={idx}>
                      <td>{mergedData?.length - idx}</td>
                      <td
                        style={{ wordBreak: "break-word", userSelect: "text" }}
                      >
                        {userName.split(" ").slice(0, 2).join(" ")} <hr />
                        {mobile}
                        <hr />
                        {email}
                      </td>
                      <td>{prdName}</td>
                      <td>{price}</td>
                      <td>{quantity}</td>
                      <td>{new Date(date).toDateString()}</td>
                      <td>
                        <select
                          defaultValue={state}
                          name="orderState"
                          id="state"
                          onInput={orderStateHandler}
                        >
                          <option value="Pending">pending</option>
                          <option value="ready">ready</option>
                          <option value="out">out</option>
                          <option value="delivered">delivered</option>
                        </select>
                      </td>
                      <td>
                        <div
                          className=" btn btn-update disabled-save-btn"
                          onClick={(e) => saveHandler(e, _id)}
                        >
                          Save
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default AdminOrders;

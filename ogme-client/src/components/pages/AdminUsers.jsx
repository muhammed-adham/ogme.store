import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  deleteOrder,
  getAllUser,
  getUser,
  updateOrderState,
} from "../../utils/axiosConfig";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const AdminUsers = () => {
  //States
  const [allUsers, setAllUsers] = useState([]);
  //   const [ordersState, setOrdersState] = useState([]);
  //   const [mergedData, setMergedData] = useState();
  //   const [userDataLoading, setUserDataLoading] = useState(false);
  const [termState, setTermState] = useState("");
  const [ordersStatus, setOrdersStatus] = useState([]);

  //Fetch Orders Data
  const { isLoading, isFetching, isFetched } = useQuery(
    "AllUsers",
    getAllUser,
    {
      onSuccess: (res) => {
        setAllUsers(res?.data?.response?.data);
      },
      refetchOnWindowFocus: false,
    }
  );

  //Get UserInfo Of The Fetched Orders
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const mergedArray = [];
  //       for (const order of ordersState) {
  //         // Use for...of loop for better async handling
  //         setUserDataLoading(true);
  //         try {
  //           const userData = await getUser(order.user); // Use await for cleaner async handling
  //           mergedArray.push({
  //             order,
  //             user: userData?.data?.response?.data?.[0] || {},
  //           }); // Set empty object if user data is missing
  //         } finally {
  //           setUserDataLoading(false);
  //         }
  //       }
  //       setMergedData(mergedArray);
  //     };

  //     fetchData(); // Call fetchData immediately (optional, adjust based on use case)
  //   }, [ordersState]); // Re-run useEffect only when orders change

  //Search Handler
  const searchHandler = (e) => {
    setTermState(e.target.value);
  };

  return (
    <>
      <section className="admin-panel">
        <h1 className="header">Users</h1>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by Phone number..."
            onInput={searchHandler}
            style={{ marginBottom: "2rem" }}
          />
        </div>
        {isLoading || isFetching ? (
          <h1>Loading...</h1>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Number</th>
                <th>Email</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {allUsers
                ?.slice()
                .reverse()
                .map((data, idx) => {
                  const { fullName, email, mobile, address } = data;

                  if ( mobile?.includes(termState)) {
                    return (
                      <tr key={idx} style={{ minHeight: "4rem" }}>
                        <td>{allUsers?.length - idx}</td>
                        <td
                          style={{
                            wordBreak: "break-word",
                            userSelect: "text",
                          }}
                        >
                          {fullName}
                        </td>
                        <td>{mobile}</td>
                        <td>{email}</td>
                        <td>{address}</td>
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

export default AdminUsers;

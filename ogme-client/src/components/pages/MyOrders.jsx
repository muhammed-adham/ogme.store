import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { GetUserProfile } from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import CardOrder from "../common/CardOrder";

/** === MyOrdersPage ===
 *
 * This component represents a page displaying the user's orders.
 *
 * Layout:
 * - .my-orders-page: The main container for the "My Orders" page.
 *     - <CardOrder>: A component representing an order card.
 */
const MyOrders = () => {
  const navigate = useNavigate();
  //========================================================================================Get UserOrders
  const [UserOrders, setUserOrders] = useState();

  const { isLoading } = useQuery("userOrder", GetUserProfile, {
    onSuccess: (data) => {
      setUserOrders(data?.data?.order?.response?.data);
      // console.log(data);
    },
  });

  //==========================================================Return=====================================================================
  return isLoading || UserOrders === undefined ? (
    <>
      <h2
        style={{
          textAlign: "center",
          height: "12rem",
          marginTop: "4rem",
          width: "100%",
          padding: "5rem",
        }}
      >
        Loading...
      </h2>
    </>
  ) : UserOrders.length > 0 ? (
    <>
      <section className="my-orders-page">
        {UserOrders?.toReversed().map((order, idx) => {
          const {
            _id,
            product_price: price,
            quantity,
            product_name: name,
            state,
            created_at:date,
          } = order;
          return (
            <CardOrder
              orderState={state}
              key={idx}
              orderNumber={new Date(date).toDateString()}
              orderPrice={price * quantity}
              product={name}
              quantity={quantity}
            />
          );
        })}
      </section>
    </>
  ) : (
    <>
      <section
        className="empty-cart"
        style={{ width: "100%", padding: "5rem" }}
      >
        <h2>Your order list is currently empty.</h2>
        <div className="shop-btn" onClick={() => (navigate("/"), scroll(0, 0))}>
          shop now
        </div>
      </section>
    </>
  );
};

export default MyOrders;

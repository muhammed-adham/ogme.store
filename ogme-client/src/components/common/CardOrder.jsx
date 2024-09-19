import React, { useEffect, useState } from "react";
import {
  TbBox,
  TbCheckupList,
  TbHomeHeart,
  TbTruckDelivery,
} from "react-icons/tb";

/** === Orders Card ===
 *
 * This component represents an order card
 * it displays details an status information for an order
 *
 * Usage:
 * - MyOrders Page
 *
 */
const CardOrder = ({
  orderState,
  Pending,
  ready,
  out,
  delivered,
  orderNumber,
  orderPrice,
  quantity,
  product,
}) => {
  //========================================================================================States
  //Order Progress Bar
  const [progress, setProgress] = useState();

  //========================================================================================Variables
  // Current Order Status
  // const orderStatus = {
  //   Pending,
  //   ready,
  //   out,
  //   delivered,
  // };

  //========================================================================================Handlers
  //Progress Bar Handler
  const orderProgressHandler = () => {
    if (orderState==="delivered") {
      setProgress(100);
    } else if (orderState==="out") {
      setProgress(75);
    } else if (orderState==="ready") {
      setProgress(50);
    } else if (orderState==="Pending") {
      setProgress(25);
    }
  };

  //========================================================================================UseEffect
  // Progress Bar Tracking
  useEffect(() => {
    orderProgressHandler();
  }, []);

  
  //==================================================================Return======================================================//
  return (
    <>
      <div className="card-order-container">
        <div className="order-details">
          <div className="order-number info">
            <b>Order no.</b> <p>{orderNumber}</p>
          </div>
          <div className="expected-arrival info">
            <b style={{ textTransform: "capitalize", textAlign:'center' }}>Ogme {product}</b>{" "}

          </div>
          <div className="expected-arrival info" style={{width:"4rem"}}>
            <p>
              {quantity} {quantity == 1 ? "piece" : "pieces"}
            </p>
          </div>
          <div className="total-price info">
            <b>Total Price</b> <p>EGP {orderPrice}</p>
          </div>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
          <div className="check-marks">
            <div
              className={`Pending check ${
                orderState==="Pending" ||
                orderState==="ready" ||
                orderState==="out" ||
                orderState==="delivered"
                  ? "process-checked"
                  : null
              }`}
            ></div>
            <div
              className={`ready check ${
                orderState==="ready" || orderState==="out" || orderState==="delivered"
                  ? "process-checked"
                  : null
              }`}
            ></div>
            <div
              className={`out-for-delivery check ${
                orderState==="out" || orderState==="delivered"
                  ? "process-checked"
                  : null
              }`}
            ></div>
            <div
              className={`order-arrived check ${
                orderState==="delivered" ? "process-checked" : null
              }`}
            ></div>
          </div>
        </div>
        <div className="order-status">
          <div className="Pending check status-group">
            <TbCheckupList />
            <p>Order Pending</p>
          </div>
          <div className="ready check status-group">
            <TbBox />
            <p>Package is Ready</p>
          </div>
          <div className="out-for-delivery check status-group">
            <TbTruckDelivery />
            <p>Out for Delivery</p>
          </div>
          <div className="order-arrived check status-group">
            <TbHomeHeart />
            <p>Order Arrived</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardOrder;

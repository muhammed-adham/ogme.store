import React from "react";
import Banner from "../common/Banner";
import { FaInstagram } from "react-icons/fa";

/** === FQA ===
 *
 * This component represents the Frequently Asked Questions (FAQ) section.
 *
 * Layout:
 * - .policy: The main container for the Policy section.
 *   - .container: The container for the Policy content.
 *     - .content-group: The container for each policy paragraph.
 *       - <p>: A paragraph element containing the policy text.
 *         - <b>: A bold element for the policy heading.
 */
const Policy = () => {
  //=============================================================Return=================================================================//
  return (
    <>
      <section className="policy">
        <div className="container">
          <div className="content-group">
            <h2>
              <strong>SHIPPING :</strong>
            </h2>
            <ul className="list">
              <li>
                We deliver in Egypt within 5-7 working days (weekends and
                official holidays are excluded).
              </li>
              <li>
                Packages cannot be opened. Returns while courier is at your door
                will cost the shipping fee.
              </li>
            </ul>
          </div>
          <div className="content-group">
            <h2>
              <strong>RETURNS & EXCHANGE :</strong>
            </h2>
            <ul className="list">
              <li>
                We want our customers to be happy, so we will do our best to
                ensure that you are pleased with your order.
              </li>
              <li>
                Ogme will accept, for return or exchange, items that are in new
                condition, unworn, unaltered, and free of damages by the
                customer within two weeks of order delivery date.
              </li>
              <li>
                For exchanges, you will be required to cover the cost of the
                courier company of two delivery fees based on your zone; one for
                the delivery of the new product and one for the delivery of the
                product you are returning to the warehouse.
              </li>
              <li>
                For returns, you will receive your subtotal (price of product(s)
                you purchased without any shipping fees) minus two delivery fees
                based on your zone; one for the delivery of your refunded cash
                and one for the delivery of the product you are returning back
                to the warehouse.
              </li>
              <br />
              <li>
                <b>IMPORTANT: </b> We do not offer Refunds or Exchanges for
                customized orders, On sale items are also not eligible for
                exchanges and refund.
              </li>
              <br />
              <div className="content-group">
                <li>To place an exchange or refund:</li>
                <ul className="list-refund-steps">
                  <li className="list-num">
                    Contact us via Instagram:{" "}
                    <a
                      href="https://www.instagram.com/ogmestore"
                      target="_blank"
                    >
                      https://www.instagram.com/ogmestore
                    </a>
                  </li>
                  <li className="list-num">Provide us with your :</li>
                  <div className="sub-list">
                    <li>Registered mobile number</li>
                    <li>Photo of the received product</li>
                    <li>Your Order Name</li>
                    <li>Your Order Date</li>
                    <li>Your Shipping Address</li>
                    <li>Reason for Return</li>
                  </div>
                </ul>
              </div>
            </ul>
            <br />
            <ul className="list notes">
              <li>
                Please note that OGME has the right to refuse accepting
                returned items if used and if without original packaging
                condition.
              </li>
              <li>
                Note that if a returned item does not meet the above
                conditions, it will be returned to the address of the original
                order and the cost of shipping will be deducted from your order.
              </li>
              <li>
                Exchanged products should be unused and returned with all tags
                & labels intact in their protective packaging.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Policy;

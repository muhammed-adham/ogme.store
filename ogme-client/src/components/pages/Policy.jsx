import React from "react";
import Banner from "../common/Banner";

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
          <div className="content">
              <strong>SHIPPING :</strong> <br /> <br />
              • We deliver in Egypt within 5-7 working days (weekends and
              official holidays are excluded). <br /> <br />
              • We deliver worldwide within 5-10 working days (weekends and
              official holidays are excluded). <br /> <br />• *Packages cannot
              be opened. Returns while courier is at your door will cost the
              shipping fee (EGP 65 in Cairo/Giza and EGP 85 rest of Egypt).
          </div>
          <div className="content">
            <pre>
              <strong>RETURNS & EXCHANGE :</strong> <br /> <br />
              • We want our customers to be happy, so we will do our best to
              ensure that you are pleased with your order. <br /> <br />
              • Exchanges and refunds are valid within 7 days of receiving the
              order, with a EGP 65 shipping/pick-up fee. <br /> <br />
              • IMPORTANT: We do not offer Refunds or Exchanges for customized
              orders , On sale items are also not eligible for exchanges and
              refund. <br /> <br />
              • To place an exchange or refund: <br /> <br />
              <pre>
                &nbsp; (1) Contact us via Instagram: <br />
                <br />
                &nbsp; https://www.instagram.com/ogmestore <br /> <br />
                &nbsp; (2) Provide us with your : <br /> <br />
                &nbsp; -Order number <br /> <br />
                &nbsp; -Photo of the received product <br /> <br />
                &nbsp; -Your Order Name <br /> <br />
                &nbsp; -Your Shipping Address <br /> <br />
                &nbsp; -Reason for Return
              </pre>
            </pre>
          </div>
          <div className="content">
            <p>
                *Please note that OGME has the right to refuse accepting
                returned items if used and if without original packaging
                condition.
            </p>
          </div>
          <div className="content">
            <p>
                *Note that if a returned item does not meet the above
                conditions, it will be returned to the address of the original
                order and the cost of shipping will be deducted from your order.
            </p>
          </div>
          <div className="content">
            <p>
              *Exchanged products should be unused and returned with all tags & labels intact in their protective packaging.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Policy;

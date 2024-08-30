import React from "react";

/** === FQA ===
 *
 * This component represents the Frequently Asked Questions (FAQ) section.
 *
 * Layout:
 * - .fqa: The main container for the FAQ section.
 *   - .container: The container for the FAQ content.
 *     - .content-group: The container for a single question and answer pair.
 *       - .qui: The container for the question.
 *         - <b>: The bold element for the question text.
 *       - .ans: The container for the answer.
 *         - Text: The text content for the answer.
 */
const FAQ = () => {
  //=============================================================Return=================================================================//
  return (
    <>
      <section className="fqa">
        <div className="container">
            <h2>FAQ</h2>
          <div className="content-group">
            <div className="qui">
              <b> Do you have a showroom?</b>
            </div>
            <div className="ans">• We're available online only.</div>
          </div>
          <div className="content-group">
            <div className="qui">
              <b> How can I pay my order?</b>
            </div>
            <div className="ans">• You can pay cash on delivery.</div>
          </div>
          <div className="content-group">
            <div className="qui">
              <b> Are your products hand painted ?</b>
            </div>
            <div className="ans">
              • All our products are Hand-drawn and painted.
            </div>
          </div>
          <div className="content-group">
            <div className="qui">
              <b> How do I care for my Ogme Glass and acrylic ?</b>
            </div>
            <div className="ans">
              • To maintain the beauty of your Ogme , gently clean it with a
              soft cloth and water. Avoid using abrasive cleaners or sponges, as
              these can scratch the surface of your vase or bottle.
            </div>
          </div>
          <div className="content-group">
            <div className="qui">
              <b>
                 Are the vases at OGME suitable for holding water and fresh
                flowers?
              </b>
            </div>
            <div className="ans">
              • Yes, our glass vases are designed to hold water and fresh
              flowers. They make an excellent addition to your home decor,
              whether you're displaying fresh or dried arrangements.
            </div>
          </div>
          <div className="content-group">
            <div className="qui">
              <b> Do you offer custom vases or designs?</b>
            </div>
            <div className="ans">
              • While we don't offer custom designs at the moment, we're
              constantly updating our collection, so be sure to sign up for our
              newsletter and follow us on social media for updates on new
              arrivals.
            </div>
          </div>
          <div className="content-group">
            <div className="qui">
              <b> Can I purchase OGME products as gifts?</b>
            </div>
            <div className="ans">
              • Yes, our unique collection make wonderful gifts for special
              occasions, housewarmings, or birthdays. Simply add a note at
              checkout, and we'll include a personalized message with your order
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;

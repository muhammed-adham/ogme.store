import React from "react";

/**
 * /** === Terms ===
 *
 * This component represents the terms section.
 *
 * Layout:
 * - .terms: The main container for the Terms section.
 *   - .container: The container for the Terms content.
 *     - <h2>: The heading element for the content block.
 *     - <p>: The paragraph element for the content block.
 */
const Terms = () => {
  //=============================================================Return=================================================================//
  return (
    <>
      <section className="terms">
        <div className="container">
          <header>
            <h2>Terms of service</h2>
            <p>
              Welcome to Ogme store. These Terms & Conditions govern your use of
              our website and services. By accessing or using our website, you
              agree to comply with and be bound by these Terms & Conditions. If
              you do not agree with any part of these terms, please refrain from
              using our website.
            </p>
          </header>
          <div className="term-group">
            <strong>1. Intellectual Property</strong>
            <p>
              <b>1.1. Ownership: </b>
              All content, designs, graphics, logos, and other materials on our
              website are the intellectual property of ogme store and are
              protected by applicable copyright, trademark, and other
              intellectual property laws. 1.2. Use of Content: You may access
              and use the content on our website solely for personal,
              non-commercial purposes. You may not modify, distribute,
              reproduce, display, or create derivative works based on our
              content without our prior written consent.
            </p>
            <p>
              <b>1.2. Use of Content: </b>
              You may access and use the content on our website solely for
              personal, non-commercial purposes. You may not modify, distribute,
              reproduce, display, or create derivative works based on our
              content without our prior written consent.
            </p>
          </div>
          <div className="term-group">
            <strong>2. Website Use</strong>
            <p>
              <b>2.1. Eligibility: </b>
              You must be at least 18 years old to use our website and services.
              If you are under 18, you may use our website only with the
              involvement and consent of a parent or legal guardian.
            </p>
            <p>
              <b>2.2. Account Registration: </b>
              Some features of our website may require account registration. You
              are responsible for providing accurate and complete information
              during the registration process and maintaining the
              confidentiality of your account credentials.
            </p>
            <p>
              <b>2.3. Prohibited Activities: </b>
              When using our website, you agree not to engage in any of the
              following activities: <br />
              (A) Violating any applicable laws or regulations; (B)
              Impersonating another person or entity; (C) Interfering with the
              operation of our website or services; (D) Uploading or
              transmitting harmful code, viruses, or malicious software; (E)
              Collecting or harvesting personal information from other users
              without their consent; (F) Engaging in any activity that could
              harm, disable, overburden, or impair our website or services; (G)
              Engaging in any unauthorized commercial activities, such as
              spamming or advertising; (H) Violating the intellectual property
              rights or privacy of others.
            </p>
          </div>
          <div className="term-group">
            <strong>3. Products and Services</strong>
            <p>
              <b>3.1. Product Descriptions: </b>
              We strive to provide accurate and up-to-date product descriptions
              on our website. However, we do not guarantee the accuracy,
              completeness, or reliability of any product information.
            </p>
            <p>
              <b>3.2. Pricing: </b>
              All prices displayed on our website are in EGP and are subject to
              change without notice. We reserve the right to modify prices,
              products, or services at any time.
            </p>
            <p>
              <b>3.3. Availability: </b>
              Product availability is subject to change and may be limited. We
              reserve the right to discontinue products or services without
              prior notice.
            </p>
          </div>
          <div className="term-group">
            <strong>4. Disclaimer of Warranties</strong>
            <p>
              <b>Use at Your Own Risk: </b>
              Our website and services are provided on an "as-is" and "as
              available" basis. Your use of our website is at your sole risk. We
              do not warrant that our website will be error-free, secure, or
              uninterrupted.
            </p>
          </div>
          <div className="term-group">
            <strong>5. Limitation of Liability</strong>
            <p>
              <b>5.1. Exclusion of Damages: </b>
              To the extent permitted by law, Ogme store shall not be liable for
              any direct, indirect, incidental, special, or consequential
              damages arising from or in connection with the use of our website
              or services
            </p>
            <p>
              <b>5.2. Indemnification: </b>
              You agree to indemnify and hold harmless Ogme store , its
              affiliates, officers, employees, and agents from any claims,
              liabilities, damages, losses, or expenses arising from your use of
              our website, violation of these Terms & Conditions, or
              infringement of any third-party rights
            </p>
          </div>
          <div className="term-group">
            <strong>6. Governing Law and Jurisdiction</strong>
            <p>
              <b>6.1. Governing Law: </b>
              These Terms & Conditions shall be governed by and construed in
              accordance with the laws of Egypt.
            </p>
            <p>
              <b>6.2. Jurisdiction: </b>
              Any disputes arising out of or in connection with these Terms &
              Conditions shall be subject to the exclusive jurisdiction of the
              courts of Egypt.
            </p>
          </div>
          <div className="term-group">
            <strong>7. Changes to Terms & Conditions</strong>
            <p>
              We reserve the right to update and modify these Terms & Conditions
              at any time without notice. Your continued use of our website
              after any changes constitute your acceptance of the updated Terms
              & Conditions.
            </p>
          </div>
          <p>
            Thank you for reviewing our Terms & Conditions. We hope you enjoy
            your experience with <b>Ogme</b>.
          </p>
        </div>
      </section>
    </>
  );
};

export default Terms;

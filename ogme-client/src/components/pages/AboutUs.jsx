import React, { useState } from "react";
import Banner from "../common/Banner";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getBanner } from "../../utils/axiosConfig";
import { useQuery } from "react-query";

/** === AboutUsPage ===
 *
 * This component represents the About Us page.
 *
 * Layout:
 * - .about: The main container for the About Us page.
 *   - .container: The container for the About Us content.
 *     - .content*5: The repeated container for each block of content in the About Us section.
 *     - <h2>: The heading element for the content block.
 *     - <p>: The paragraph element for the content block.
 */

const AboutUs = () => {
  const [artistBanner, setArtistBanner] = useState();

  useQuery("getBanner", getBanner, {
    onSuccess: (res) =>
      setArtistBanner(
        res?.data?.response?.data.find(
          (banner) => banner.title === "Ogme artist"
        )
      ),
  });

  //=============================================================Return==============================================================//
  return (
    <>
      <section className="about">
        <div className="container">
          <div className="content">
            <h2>Meet the artist</h2>
            <div className="artist-pic">
              <img src={artistBanner?.bannerURL} alt="artist picture" />
            </div>
            {/* <p>Muhammed Atef</p> */}
            <div className="social-icons">
              <Link
                to={"https://www.instagram.com/muhammedatefabdelfattah/"}
                target="blank"
                className="icon-container"
              >
                <FaInstagram />
              </Link>
            </div>
            <p>
              My name is Muhammed I have painted for most of my life. About 25
              years ago, “I love the idea that I am not only creating something
              beautiful but also useful,” I loved the fact that mosaics and
              stained glass painting are ancient arts that can be adapted to
              modern techniques and subjects ,this inspire me to create a
              decorative design for my own living space. My focus is bringing
              life in glass painting It is like magic, Light and color alone can
              create form, Finding exactly where the light is reflected in the
              eye.
              <br /> <br /> I hope that my works will be used and loved and
              bring lot's of positive energy and smiles into your lives.
            </p>
          </div>
          <div className="content">
            <h2>about us</h2>
            <p>
              if you ever got the chance to change the colors of your world just
              believe you can do it. Ogme is rising to fill the gap of artistic
              glass decorations and customized functional luminating accessories
              in Egypt; founded in 2021 with the mission of changing the idea of
              blank walls and boring environments.
              <br />
              <br />
              Dim colorful lights can set the mood for any task, change the
              feeling of your room, for every-night dreamy atmosphere. We
              customize each piece according to your needs, dimensions and mood
              requests.
              <br />
              <br />
              Glass can transform to various shapes to bring the light to space.
              Be the flame to spread it or give it a chance to reflect joyfully
              on your life. Surround yourself with beauty, give your daily
              setups a dimension and decorate every corner now with Ogme.
            </p>
          </div>
          <div className="content">
            <h2>About bottles</h2>
            <p>
              Beautiful hand painted glass light up bottle with warm yellow
              lights inside. Lights are switch-operated, Lovely decorative
              addition to any tableware indoors or outdoors. Will make a
              beautiful gift.
              <br /> <br />
              (Batteries & LED & White Board included within bottle on
              purchase.)
            </p>
          </div>
          <div className="content">
            <h2>About glass ware</h2>
            <p>
              Hand painted glass ware combines aesthetic beauty with unique
              designs adds a special elegance to your space.
              <br />
              <br />A Perfect Gift for a Friend or Loved one or treat yourself !
              .For Her or for Him. Can be used as a bedroom ornament/lamp or a
              table centerpiece. Looks great on a windowsill.
            </p>
          </div>
          <div className="content ">
            <h2>About ogme drive</h2>
            <p>
              A delightful magical accessory to add a touch of beauty and
              personality to your vehicle! Crafted with meticulous attention to
              detail, from elegant curves to vibrant colors.
              <br /> <br />
              <span style={{ textAlign: "left" }}>
                <b>High-Quality Materials</b>
                <br /> Our ogme drive is made with high-quality, durable acrylic
                We include 5 different shapes, ensures it stays securely in
                place on your rearview mirror or anywhere else you choose to
                display it.
                <br /> <br />
                <b>Easy Installation</b>
                <br /> Installation is a breeze – simply attach the car charm to
                your rearview mirror, visor, or any other suitable location. It
                will instantly add a touch of elegance and charm to your car's
                interior.
                <br /> <br />
                <b>Perfect Gift</b>
                <br /> Looking for a unique and meaningful gift for a friend or
                family member? Ogme drive choice for birthdays, holidays, or
                special occasions. It's a little piece of art that can brighten
                up anyone's day.
                <br /> <br />
                <b>Customization Available</b>
                <br /> Choose from a variety of colors to match your car's
                interior or personal preferences. Whether you prefer a classic
                and timeless look or something more vibrant and playful, we have
                options to suit your taste.
                <br /> <br />
                <b>Handmade with Love</b>
                <br />
                Each ogme drive is handcrafted with love and care, ensuring that
                it's a one-of-a-kind piece that you'll cherish for years to
                come.
                <br /> <br />
              </span>
              Transform your daily commute into a magical journey with our ogme
              drive. Embrace the symbolism of change and adorn your vehicle with
              a touch of natural beauty. Add it to your cart now and watch as it
              adds a flutter of charm to your car interior!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;

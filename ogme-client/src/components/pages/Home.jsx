import React, { useState } from "react";
import Banner from "../common/Banner";
import CategorySection from "../common/CategorySection";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getBanner } from "../../utils/axiosConfig";

/** === Home Page ===
 *
 * This component represents the Home Page
 * it displays diffrent category sections with title ,card and a view all button
 *
 *
 */
const Home = () => {
  
  const [homeBanner, setHomeBanner] = useState();

  const { isLoading, isFetching } = useQuery("getBanner", getBanner, {
    refetchOnWindowFocus: false, // This prevents the query from refetching on window focus
    onSuccess: (res) => {
      setHomeBanner(
        res?.data?.response?.data.find((banner) => banner.title === "Ogme home")
      );
    },
  });

  const [artistBanner, setArtistBanner] = useState();

  useQuery("getBanner", getBanner, {
    refetchOnWindowFocus: false,
    onSuccess: (res) =>
      setArtistBanner(
        res?.data?.response?.data.find(
          (banner) => banner.title === "Ogme artist"
        )
      ),
  });
  //=============================================================Return=================================================================//
  return (
    <>
      <Banner src={homeBanner?.bannerURL} isLoading={isLoading || isFetching} />

      <CategorySection
        categoryPagePath={"/shop/drive"}
        sectionCategory={"drive"}
        sectionTitle={"Ogme Drive"}
        sectionDescription={
          "A delightful magical accessory to add a touch of beauty and personality to your vehicle! Crafted with meticulous attention to detail, from elegant curves to vibrant colors."
        }
      />
      <CategorySection
        categoryPagePath={"/shop/bottles"}
        sectionCategory={"bottles"}
        sectionTitle={"Ogme bottles"}
        sectionDescription={
          "Beautiful hand painted glass light up bottle with warm yellow lights inside and switch. Lovely addition to any tableware indoors or outdoors. Will make a beautiful gift."
        }
      />
      <CategorySection
        categoryPagePath={"/shop/glassware"}
        sectionCategory={"glassware"}
        sectionTitle={"Ogme glassware"}
        sectionDescription={
          "Hand painted glass ware combines aesthetic beauty with sustainable design and adds a special elegance to your space."
        }
      />
      <section
        className="meet-artist "
        style={{ backgroundImage: `url(${artistBanner?.bannerURL})` }}
      >
        <h2>meet the artist</h2>
        <Link to={"/about"} onClick={() => scroll(0, 0)} className="btn">
          read more
        </Link>
      </section>
    </>
  );
};

export default Home;

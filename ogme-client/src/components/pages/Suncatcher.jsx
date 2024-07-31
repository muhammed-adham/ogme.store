import React, { useContext, useState } from "react";
import Banner from "../common/Banner";
import Card from "../common/Card";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import CardXs from "../common/CardXs";
import { MobileContext } from "../../context/MobileContext";
import { getBanner, getCategoryProducts } from "../../utils/axiosConfig";

/** === Suncatcher Category Page ===
 *
 * This component represents a category page.
 *
 * Layout:
 * - <Banner>: The customize banner component for the category page.
 * - .category-Page: The main container for the category page.
 *   - .container: The container for the page contents.
 *     - .title: The paragraph element for the page title.
 *     - .cards-container: The container for the cards displaying product information.
 *       - .cards: The container for individual product cards.
 *         - <Card>: The customize component representing a product card.
 *
 */
const Suncatcher = () => {
  const [homeBanner, setHomeBanner] = useState();

  useQuery("getBanner", getBanner, {
    onSuccess: (res) =>
      setHomeBanner(
        res?.data?.response?.data.find((banner) => banner.title === "Ogme suncatcher")
      ),
  });
  //========================================================================================Variables
  const navigate = useNavigate();
  const { isMobile } = useContext(MobileContext);

  //========================================================================================Fetch Data
  const { data } = useQuery(["OgmeSuncatcher", "suncatcher"]);

  const [productsState, setProductsState] = useState();
  const limit = 15;
  const [skipState, setSkipState] = useState(0);
  const [dataLengthState, setDataLengthState] = useState();

  const { refetch } = useQuery(
    ["OgmeSuncatcher", "suncatcher", limit, skipState],
    () => getCategoryProducts("suncatcher", limit, skipState),
    {
      onSuccess: (data) => {
        setProductsState(data?.data?.response?.data);
      },
    }
  );

  useQuery(
    ["OgmeSuncatcher", "suncatcher", 0, 0],
    () => getCategoryProducts("suncatcher", 0, 0),
    {
      onSuccess: (data) => {
        setDataLengthState(data?.data?.response?.data?.length);
      },
    }
  );

  const pageHandler = () => {
    setSkipState((i - 1) * limit), refetch(), scroll(0, 400);
  };
  const pagination = [];
  for (let i = 1; i <= Math.ceil(dataLengthState / limit); i++) {
    pagination.push(
      <NavLink
        className={`page-no ${
          skipState / limit == i - 1 ? "active-page" : null
        }`}
        key={i}
        onClick={() => {
          setSkipState((i - 1) * limit),
            refetch(),
            scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
        }}
      >
        {i}
      </NavLink>
    );
  }

  //=============================================================Return=================================================================//
  return (
    <>
      <Banner
        src={homeBanner?.bannerURL}
        currentPage={"ogme suncatcher"}
      />
      <section className="category-page ogme-drive">
        <div className="container">
          <p className="title">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
            modi doloremque voluptates voluptate distinctio earum ullam iste qui
            fuga sint.
          </p>
          <div className="cards-container">
            <div className="cards">
              {dataLengthState > 0 ? null : (
                <h1 style={{ margin: "auto" }}>Coming Soon..</h1>
              )}
              {productsState?.map((prd, idx) =>
                isMobile ? (
                  <CardXs
                    prdID={prd._id}
                    key={idx}
                    productName={prd.name}
                    price={prd._sale.onSale ? prd._sale.price : prd.price}
                    oldPrice={prd._sale.onSale ? prd.price : null}
                    productImage={prd.featureImage}
                    onClick={() => {
                      navigate(
                        `/shop/${prd.category.split(" ")[1]}/${prd._id}`
                      ),
                        scroll(0, 0);
                    }}
                  />
                ) : (
                  <Card
                    prdID={prd._id}
                    isDragging={false}
                    key={idx}
                    productName={prd.name}
                    price={prd._sale.onSale ? prd._sale.price : prd.price}
                    oldPrice={prd._sale.onSale ? prd.price : null}
                    productImage={prd.featureImage}
                    onClick={() => {
                      navigate(
                        `/shop/${prd.category.split(" ")[1]}/${prd._id}`
                      ),
                        scroll(0, 0);
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="pagination">{pagination}</div>
    </>
  );
};

export default Suncatcher;

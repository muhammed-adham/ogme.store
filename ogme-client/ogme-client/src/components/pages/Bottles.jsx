import React, { useContext, useState } from "react";
import Banner from "../common/Banner";
import { useQuery } from "react-query";
import { getBanner, getCategoryProducts } from "../../utils/axiosConfig";
import Card from "../common/Card";
import { NavLink, useNavigate } from "react-router-dom";
import CardXs from "../common/CardXs";
import { MobileContext } from "../../context/MobileContext";

/** === Bottles Category Page ===
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
const Bottles = () => {
  const [homeBanner, setHomeBanner] = useState();

  const { isLoading, isFetching } = useQuery("getBanner", getBanner, {
    onSuccess: (res) =>
      setHomeBanner(
        res?.data?.response?.data.find(
          (banner) => banner.title === "Ogme bottles"
        )
      ),
  });
  //========================================================================================Variables
  const navigate = useNavigate();
  const { isMobile } = useContext(MobileContext);

  //========================================================================================Fetch Data
  const [productsState, setProductsState] = useState();
  const limit = 16;
  const [skipState, setSkipState] = useState(0);
  const [dataLengthState, setDataLengthState] = useState();

  const { refetch } = useQuery(
    ["OgmeBottles", "bottles", limit, skipState],
    () => getCategoryProducts("bottles", limit, skipState),
    {
      onSuccess: (data) => {
        setProductsState(data?.data?.response?.data);
      },
      refetchOnWindowFocus: false, // This prevents the query from refetching on window focus
    }
  );

  useQuery(
    ["OgmeBottles", "bottles", 0, 0],
    () => getCategoryProducts("bottles", 0, 0),
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
        onClick={async () => {
          setSkipState((i - 1) * limit),
            await refetch(),
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
        currentPage={"ogme Bottles"}
        isLoading={isLoading || isFetching}
      />
      <section className="category-page ogme-drive">
        <div className="container">
          <p className="title">
            Beautiful hand painted glass light up bottle <br /> with warm yellow
            lights inside and switch. <br /> <br /> Lovely decorative addition
            to any tableware indoors or outdoors. <br /> Will make a beautiful
            gift.
          </p>
          <div className="cards-container">
            <div className="cards">
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

export default Bottles;

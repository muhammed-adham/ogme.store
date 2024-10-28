import React, { useContext, useState } from "react";
import Banner from "../common/Banner";
import Card from "../common/Card";
import { useQuery } from "react-query";
import { getBanner, getCategoryProducts } from "../../utils/axiosConfig";
import { NavLink, useNavigate } from "react-router-dom";
import CardXs from "../common/CardXs";
import { MobileContext } from "../../context/MobileContext";
import { LogedInContext } from "../../context/IsLogedIn";

/** === Glassware Category Page ===
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
const Glassware = () => {
  const { isLogedIn } = useContext(LogedInContext);

  const [homeBanner, setHomeBanner] = useState();

  const { isLoading, isFetching } = useQuery("getBanner", getBanner, {
    onSuccess: (res) => {
      setHomeBanner(
        res?.data?.response?.data.find(
          (banner) => banner.title === "Ogme glassware"
        )
      );
    },
    refetchOnWindowFocus: false, // This prevents the query from refetching on window focus
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
    ["OgmeGlassware", "glassware", limit, skipState],
    () => getCategoryProducts("glassware", limit, skipState),
    {
      onSuccess: (data) => {
        setProductsState(data?.data?.response?.data);
      },
    }
  );

  useQuery(
    ["OgmeGlassware", "glassware", 0, 0],
    () => getCategoryProducts("glassware", 0, 0),
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
        currentPage={"ogme glassware"}
        isLoading={isLoading || isFetching}
      />
      <section className="category-page ogme-drive">
        <div className="container">
          <p className="title">
            Hand painted glass ware combines aesthetic beauty with sustainable
            design and adds a special elegance to your space.
          </p>
          <div className="cards-container">
            <div className="cards">
              {productsState?.map((prd, idx) =>
                isMobile ? (
                  <CardXs
                    prdID={prd._id}
                    key={idx}
                    productName={prd.name}
                    price={
                      isLogedIn
                        ? prd._sale?.onSale
                          ? prd._sale?.price
                          : prd.price
                        : prd.price
                    }
                    oldPrice={
                      isLogedIn
                        ? prd._sale?.onSale
                          ? prd.price
                          : null
                        : null
                    }
                    productImage={prd.featureImage}
                    sold={prd.sold}
                    onClick={() => {
                      navigate(
                        `/shop/${prd.category.split(" ")[1]}/${prd.name
                          .split(" ")
                          .join("-")}`,
                        { state: { data: prd._id } }
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
                    price={
                      isLogedIn
                        ? prd._sale?.onSale
                          ? prd._sale?.price
                          : prd.price
                        : prd.price
                    }
                    oldPrice={
                      isLogedIn
                        ? prd._sale?.onSale
                          ? prd.price
                          : null
                        : null
                    }
                    productImage={prd.featureImage}
                    sold={prd.sold}
                    onClick={() => {
                      navigate(
                        `/shop/${prd.category.split(" ")[1]}/${prd.name
                          .split(" ")
                          .join("-")}`,
                        { state: { data: prd._id } }
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

export default Glassware;

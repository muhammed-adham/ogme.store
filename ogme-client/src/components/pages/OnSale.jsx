import React, { useEffect, useState } from "react";
import Banner from "../common/Banner";
import { useQuery } from "react-query";
import {
  getAllProducts,
  getBanner,
  GetUserProfile,
} from "../../utils/axiosConfig";
import Card from "../common/Card";
import { useNavigate } from "react-router-dom";

/** === Onsale Category Page ===
 *
 * This component represents a category page.
 *
 */
const OnSale = () => {
  const { data: userProfile, refetch } = useQuery(
    "userProfile",
    GetUserProfile,
    []
  );

  const [homeBanner, setHomeBanner] = useState();

  const { isLoading: bannerIsLoading, isFetching } = useQuery(
    "getBanner",
    getBanner,
    {
      onSuccess: (res) =>
        setHomeBanner(
          res?.data?.response?.data.find(
            (banner) => banner.title === "Ogme sale"
          )
        ),
    }
  );
  //========================================================================================Variables
  const navigate = useNavigate();
  //========================================================================================Fetch Data
  const [onSaleProducts, setOnSaleProducts] = useState();

  const { isLoading } = useQuery("OgmeProducts", getAllProducts, {
    onSuccess: (data) => {
      setOnSaleProducts(
        data?.data?.response?.data?.filter(
          (product) => product._sale?.onSale === true
        )
      );
    },
    refetchOnWindowFocus: false, // This prevents the query from refetching on window focus
  });

  //=============================================================Return=================================================================//
  return (
    <>
      <Banner
        currentPage={"on sale"}
        src={homeBanner?.bannerURL}
        isLoading={bannerIsLoading || isFetching}
      />
      <section className="category-page ogme-drive">
        <div className="container">
          {/* <p className="title">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
            modi doloremque voluptates voluptate distinctio earum ullam iste qui
            fuga sint.
          </p> */}
          <div className="cards-container">
            <div className="cards">
              {isLoading || onSaleProducts === undefined ? (
                <>
                  <h2
                    style={{
                      textAlign: "center",
                      height: "12rem",
                      marginTop: "4rem",
                      width: "100vw",
                    }}
                  >
                    Loading...
                  </h2>
                </>
              ) : userProfile?.data?.data === undefined ? (
                <section className="empty-cart" style={{ margin: "auto" }}>
                  <h2 style={{textAlign:'center'}}>Create an account to access special offers and discounts </h2>
                  <div
                    className="shop-btn"
                    onClick={() => (navigate("/register"), scroll(0, 0))}
                  >
                    create account
                  </div>
                </section>
              ) : onSaleProducts?.length > 0 ? (
                onSaleProducts?.map((prd, idx) => {
                  return (
                    <Card
                      key={idx}
                      productName={prd.name}
                      productImage={prd.featureImage}
                      price={prd._sale?.onSale ? prd._sale?.price : prd.price}
                      oldPrice={prd._sale?.onSale ? prd.price : null}
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
                  );
                })
              ) : (
                <section className="empty-cart" style={{ margin: "auto" }}>
                  <h2>No products on sale yet...</h2>
                  <div
                    className="shop-btn"
                    onClick={() => (navigate("/"), scroll(0, 0))}
                  >
                    shop now
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OnSale;

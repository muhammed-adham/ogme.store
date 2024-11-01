import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  GetUserProfile,
  getAllProducts,
  getProductImages,
  getSingleProduct,
  postProductToCart,
} from "../../utils/axiosConfig";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsQuestionCircle, BsShareFill } from "react-icons/bs";
import Card from "../common/Card";
import { WishCountContext } from "../../context/WishCountContext";
import toast from "react-hot-toast";
import CardXs from "../common/CardXs";
import { TabletContext } from "../../context/TabletContext";
import { MobileContext } from "../../context/MobileContext";
import DialogAddress from "../common/DialogAddress";
import { LogedInContext } from "../../context/IsLogedIn";

const SingleProduct = () => {
  const { isLogedIn } = useContext(LogedInContext);

  //========================================================================================Variables
  const navigate = useNavigate();
  const { setWishCount } = useContext(WishCountContext);
  const { isTablet } = useContext(TabletContext);
  const { isMobile } = useContext(MobileContext);

  //========================================================================================Dialog
  const [dialog, setDialog] = useState(false);
  const Close = (e) => {
    setDialog((prev) => (prev = e));
  };

  const mayAlsoCount = isMobile == true ? 2 : 3;
  //========================================================================================useState
  const [coverIdx, setCoverIdx] = useState(0);

  //========================================================================================Params
  let { prdName } = useParams();
  prdName = prdName?.split("-").join(" ");

  const [ID, setID] = useState();

  const [quantity, setQuantity] = useState(1);

  //========================================================================================Fetch  Data
  const [productState, setProductState] = useState();
  const [randomDataState, setRandomDateState] = useState();
  const [randomIdxs, setRandomIdxs] = useState([]);
  const [coverImagesState, setCoverImagesState] = useState();
  const [isMobileProvided, setIsMobileProvided] = useState(false);
  let prdMax;

  //singleProduct
  const {
    data: singleProductData,
    isSuccess: successSingleProductData,
    isLoading: loadingSingleProductData,
  } = useQuery(["singleProduct", prdName], () => getSingleProduct(prdName), {
    onSuccess: (data) => {
      setProductState(data?.data?.response?.data[0]);
      setID(data?.data?.response?.data[0]?._id);
    },
  });

  //allProducts to generate random cards
  const { data: allProducts, refetch: allProductRefetch } = useQuery(
    "allProducts",
    getAllProducts,
    {
      onSuccess: (data) => {
        setRandomDateState(data?.data?.response?.data);

        //Get All Products Length
        prdMax = data?.data?.response?.data.length;

        //Generate Random Ids
        const randomIdxs = getRandomIdxs(prdMax, mayAlsoCount);
        setRandomIdxs(randomIdxs);
      },
      refetchOnWindowFocus: false,
    }
  );

  //userProfile
  const { data: userProfile, isSuccess: successUserProfile } = useQuery(
    "userProfile",
    GetUserProfile,
    {
      onSuccess: (res) => {
        setIsMobileProvided(Boolean(res?.data?.data?.mobile));
      },
    }
  );

  //Cover Images
  const { data: coverImages, refetch: coverImagesRefetch } = useQuery(
    ["coverImages", ID],
    () => getProductImages(ID),
    {
      onSuccess: (data) => {
        setCoverImagesState(data?.data?.response?.data);
      },
    }
  );

  //========================================================================================State Data
  //adjust data for the post cart api
  const [cartDataState, setCartDataState] = useState();

  useEffect(() => {
    if (successSingleProductData && successUserProfile) {
      const userId = userProfile?.data?.data?._id;
      const { featureImage, name, price, _id, _sale, category } =
        singleProductData?.data?.response?.data[0];

      const data = {
        user: userId,
        product_name: name,
        product_id: _id,
        product_price: price,
        "_sale.onSale": _sale?.onSale,
        "_sale.price": _sale?.price,
        quantity: quantity,
        featureImage: featureImage,
        category,
      };
      setCartDataState(data);
    }
  }, [singleProductData, userProfile, quantity]);

  //========================================================================================OnClickHandler for May also like
  const onClickHandler = (rIdx) => {
    setProductState(allProducts?.data?.response?.data[rIdx]);
    setID(null); //Prevent Delay
    allProductRefetch();
    coverImagesRefetch();
    setCoverIdx(0);
  };

  //========================================================================================Function to Generate random ids
  const getRandomIdxs = (max, count) => {
    const idxs = [];
    while (idxs.length < count) {
      const randomIdx = Math.floor(Math.random() * max);
      if (!idxs.includes(randomIdx) && randomIdx !== ID) {
        idxs.push(randomIdx);
      }
    }
    return idxs;
  };

  //========================================================================================Product Cover Slide Handler
  const imgsIdx = coverImagesState?.length - 1; //images length

  const slideLeftHandler = () => {
    coverIdx == 0 ? setCoverIdx(imgsIdx) : setCoverIdx((prev) => prev - 1);
  };
  const slideRightHandler = () => {
    coverIdx >= imgsIdx ? setCoverIdx(0) : setCoverIdx((prev) => prev + 1);
  };

  //========================================================================================handle Share button
  const shareBtnHandler = () => {
    const url = location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link has been copied to clipboard");
  };
  //========================================================================================handle AddToCart Button
  const addToCartHandler = () => {
    if (productState.sold) {
      toast.error("sold out!");
      navigate("/ask");
      scroll(0, 0);
    } else {
      postProductToCart(cartDataState).then((res) => {
        if (res?.data?.status === 200) {
          setWishCount((prev) => prev + quantity),
            toast.success("added successfuly");
        } else {
          // toast("Please log in first.", {
          //   icon: "⛔️",
          // });
          navigate("/purchase", { state: { data: cartDataState } });
          scroll(0, 0);
        }
      });
    }
  };

  const buyNowHandler = () => {
    if (productState.sold) {
      toast.error("sold out!");
      navigate("/ask");
      scroll(0, 0);
    } else {
      postProductToCart(cartDataState).then((res) => {
        if (res?.data?.status === 200) {
          setWishCount((prev) => prev + quantity),
            toast.success("added successfuly"),
            navigate("/cartlist"),
            scroll(0, 0);
        } else {
          // toast("Please log in first.", {
          //   icon: "⛔️",
          // });
          navigate("/purchase", { state: { data: cartDataState } });
          scroll(0, 0);
        }
      });
    }
  };
  //========================================================================================Quantity Handler

  const plusBtn = () => {
    setQuantity((prev) => prev + 1);
  };

  const minusBtn = () => {
    quantity > 1 ? setQuantity((prev) => prev - 1) : null;
  };

  //==============================================================Return===========================================================//
  return (
    <>
      <section className="single-product ">
        <div className="images-container container">
          <div className="cover-image">
            {loadingSingleProductData ? (
              <>
                <h2
                  style={{
                    textAlign: "center",
                    height: "12rem",
                    marginTop: "4rem",
                  }}
                >
                  Loading...
                </h2>
              </>
            ) : (
              coverImagesState?.map((BannerImg, idx) => {
                const { fullPath, fileName } = BannerImg;
                return (
                  <img
                    key={idx}
                    src={fullPath}
                    alt="product image"
                    className={
                      fileName?.charAt(fileName?.length - 1) - 1 == coverIdx
                        ? "show"
                        : "hide"
                    }
                  />
                );
              })
            )}
          </div>
          <div className="owl">
            {coverImagesState?.map((_, idx) => (
              <div
                key={idx}
                className={`carousel ${
                  coverIdx == idx ? "active-carousel" : null
                }`}
              ></div>
            ))}
          </div>
          <div className="slide-arrows container">
            <IoIosArrowDropleftCircle onClick={slideLeftHandler} />
            <IoIosArrowDroprightCircle onClick={slideRightHandler} />
          </div>
        </div>
        <div className="container">
          <section className="section-product-info">
            <div className="main-content-container">
              <div className="main-content">
                <h2>{productState?.name}</h2>
                {productState?.price ? (
                  <div className="price">
                    {isLogedIn ? (
                      productState?._sale?.onSale ? (
                        <>
                          <del>{`EGP ${productState?.price}`}</del>
                          <b>{`EGP ${productState?._sale?.price}`}</b>
                        </>
                      ) : (
                        <b>{`EGP ${productState?.price}`}</b>
                      )
                    ) : (
                      <b>{`EGP ${productState?.price}`}</b>
                    )}
                  </div>
                ) : null}

                {productState?.sold ? (
                  <div className="sold-out">sold out!</div>
                ) : null}
              </div>
              <div className="actions-container">
                <div className="top-widget">
                  <div className="quantity">
                    <AiOutlineMinus onClick={minusBtn} />
                    <p>{quantity}</p>
                    <AiOutlinePlus onClick={plusBtn} />
                  </div>
                  <div className="add-to-cart" onClick={addToCartHandler}>
                    add to cart
                  </div>
                </div>
                <div className="buy-it-now" onClick={buyNowHandler}>
                  buy it now
                </div>
                <div className="tertiary">
                  <div className="share-btn" onClick={shareBtnHandler}>
                    <BsShareFill /> share
                  </div>
                  <div
                    className="ask-btn"
                    onClick={() => {
                      navigate("/ask"), scroll(0, 0);
                    }}
                  >
                    <BsQuestionCircle /> ask a question
                  </div>
                </div>
              </div>
            </div>
            <div className="details">
              <p style={{ paddingBottom: "1rem" }}>
                {productState?.category.split(" ")[1] === "drive"
                  ? "A delightful magical accessory to add a touch of beauty and personality to your vehicle!"
                  : productState?.category.split(" ")[1] === "bottles"
                  ? " LED Hand Painted Glass Bottle, it can be used as a light or even as a vase or wall frame."
                  : productState?.category.split(" ")[1] === "glassware"
                  ? "The Hand painted glass looks beautiful from all angles, when the sun's rays pass through it or when lighted with LED ."
                  : null}
              </p>
              <p style={{ textTransform: "capitalize" }}>
                {productState?.brief}
              </p>
            </div>
          </section>
        </div>
      </section>
      <section className="may-also category-page">
        <div className="container">
          <div className="title">
            <h2>you may also like</h2>
          </div>
          <div className="cards-container">
            <div className="cards" style={{ justifyContent: "center" }}>
              {randomDataState &&
                randomDataState?.length > 0 &&
                randomIdxs.map((rIdx, idx) => {
                  const product = randomDataState?.[rIdx];
                  if (
                    !product ||
                    !product.featureImage ||
                    !product.name ||
                    !product.price ||
                    !product._sale ||
                    !product.category ||
                    !product._id
                  ) {
                    return null;
                  }

                  const {
                    featureImage,
                    name,
                    price,
                    _sale,
                    category,
                    _id,
                    sold,
                  } = product;

                  const discountedPrice =
                    _sale?.onSale == true ? _sale?.onSale.price : price;

                  const handleClick = () => {
                    setQuantity(1);
                    navigate(
                      `/shop/${category.split(" ")[1]}/${name
                        .split(" ")
                        .join("-")}`,
                      { state: { data: _id } }
                    ),
                      scroll(0, 0);
                    onClickHandler(rIdx);
                  };

                  return isTablet ? (
                    <CardXs
                      key={idx}
                      productImage={featureImage}
                      productName={name}
                    price={
                      isLogedIn
                        ? _sale?.onSale
                          ? _sale?.price
                          : price
                        : price
                    }
                    oldPrice={
                      isLogedIn
                        ? _sale?.onSale
                          ? price
                          : null
                        : null
                    }
                      sold={sold}
                      onClick={handleClick}
                    />
                  ) : (
                    <Card
                      prdID={_id}
                      key={idx}
                      productImage={featureImage}
                      productName={name}
                    price={
                      isLogedIn
                        ? _sale?.onSale
                          ? _sale?.price
                          : price
                        : price
                    }
                    oldPrice={
                      isLogedIn
                        ? _sale?.onSale
                          ? price
                          : null
                        : null
                    }
                      sold={sold}
                      onClick={handleClick}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </section>
      {dialog ? <DialogAddress onDialog={Close} /> : null}
    </>
  );
};

export default SingleProduct;

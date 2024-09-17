import React, { useContext, useEffect, useState } from "react";
import CardMini from "../common/CardMini";
import { IoCashOutline } from "react-icons/io5";
import { MdMobileFriendly } from "react-icons/md";
import { useQuery } from "react-query";
import {
  GetUserProfile,
  updateCartProduct,
  postUserOrder,
  removeProductCart,
} from "../../utils/axiosConfig";
import { WishCountContext } from "../../context/WishCountContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DialogAddress from "../common/DialogAddress";
import { BsCash } from "react-icons/bs";
import FacebookPixel from 'react-facebook-pixel';

/**
 *  * === CartPage ===
 *
 * This component represents the cart page.
 *
 */
const Cart = () => {
  //========================================================================================Dialog
  const [dialog, setDialog] = useState(false);
  const Close = (e) => {
    setDialog((prev) => (prev = e));
  };
  const dialogHandler = () => {
    setDialog((prev) => !prev);
  };
  //========================================================================================Variables

  const navigate = useNavigate();

  //========================================================================================cartListCounterContext
  const { setWishCount, wishCount } = useContext(WishCountContext);

  //========================================================================================handle data from axios
  const [cartProducts, setCartProducts] = useState();
  const [userAddress, setUserAddress] = useState();
  const [initialFetch, setInitialFetch] = useState(true);

  const { isLoading, isFetching } = useQuery("userProfile", GetUserProfile, {
    onSuccess: (data) => {
      setCartProducts(data?.data?.cart?.response?.data);
      setUserAddress(data?.data?.data?.address);
      setInitialFetch(false);
    },
    refetchOnWindowFocus: false,
  });

  //========================================================================================Calculate Total Quantity
  useEffect(() => {
    // refetch()
    //TotalCount DependOn Quantity of EachProduct in the Cart
    const totalQuantity = cartProducts?.reduce((total, product) => {
      const quantity = product.quantity;
      return total + quantity;
    }, 0);

    //Set WishCounter
    setWishCount((prev) => totalQuantity);
  }, [cartProducts]);

  //========================================================================================Quantity Handler
  const plusBtn = async (e, data) => {
    e.target.nextElementSibling.textContent = "";
    e.target.nextElementSibling.classList.add('loading-dots');
    const update = { ...data, quantity: data.quantity + 1 };
    await updateCartProduct(update);
    setWishCount((prev) => prev + 1);
    setCartProducts((prev) =>
      prev.map((prd) => (prd._id === data._id ? update : prd))
    );
    e.target.nextElementSibling.classList.remove('loading-dots')
  };

  const minusBtn = async (e, data) => {
    if (data.quantity > 1) {
      e.target.previousElementSibling.textContent = "";
      e.target.previousElementSibling.classList.add('loading-dots');
      const update = { ...data, quantity: data.quantity - 1 };
      await updateCartProduct(update);
      setWishCount((prev) => prev - 1);
      setCartProducts((prev) =>
        prev.map((prd) => (prd._id === data._id ? update : prd))
      );
      e.target.previousElementSibling.classList.remove('loading-dots')
    }
  };

  //========================================================================================Calculate the total price
  const deleviryFee = "Delivery fees vary by location.";

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartProducts.forEach((card) => {
      totalPrice += card._sale.onSale
        ? _sale.onSale.price * card.quantity
        : card.product_price * card.quantity;
    });
    return totalPrice;
  };

  

  //========================================================================================remove Item Handler
  const removeItemHandler = async (cardId, quantity) => {
    // console.log(CartProducts.filter(prev=>prev.id != "ed0f"));
    const toastLoading = toast.loading("deleting..");
    await removeProductCart(cardId);
    setWishCount((prev) => prev - quantity);
    setCartProducts((prev) => prev.filter((item) => item._id != cardId));
    toast.dismiss(toastLoading);
  };

  //========================================================================================CheckOut Handler
  // const { data: userData } = useQuery("userData", GetUserData);
  const [isChecked, setIsChecked] = useState("cash");

  const checkoutHandler = async () => {
    if (!userAddress) {
      toast.error("please provide your address");
      navigate("/account/setting");
    } else if (isChecked === "insta") {
      // console.log("insta");
      navigate("/instapay");
    } else {
      
      // Track purchase event with Meta Pixel
      FacebookPixel.track("Purchase", {
        value: calculateTotalPrice(), // calculation to get total cart value
        currency: "EGP", // currency
        content_ids: cartProducts.map((el) => el._id), // Product IDs from cart
        content_type: "product",
        
      });

      await cartProducts.map((el) => {
        removeProductCart(el._id);
        postUserOrder(el);
      });
      toast.success("your order has been processed"),
        setCartProducts(null),
        setWishCount(0),
        navigate("/account/orders");
    }
  };

  //=================================================================Return=========================================================//
  return initialFetch ? (
    <>
      <h2 style={{ textAlign: "center", height: "12rem", marginTop: "4rem" }}>
        Loading...
      </h2>
    </>
  ) : cartProducts?.length > 0 ? (
    <>
      <section className="cart-page">
        <div className="container">
          <div className="card-list-container">
            <p>You have {wishCount ? wishCount : 0} items in your cart</p>
            <div className="cards-container">
              <div className="cards">
                {cartProducts.map((card, idx) => {
                  const {
                    featureImage,
                    product_name,
                    product_price,
                    _sale,
                    _id,
                    quantity,
                    category,
                  } = card;

                  const activePrice = _sale.onSale
                    ? _sale.onSale.price * quantity
                    : product_price * quantity;

                  return (
                    <CardMini
                      key={idx}
                      onClick={() => {
                        navigate(`/shop/${_id}`), scroll(0, 0);
                      }}
                      productImageSrc={featureImage}
                      productCategory={category}
                      productName={product_name}
                      price={activePrice}
                      oldPrice={_sale.onSale ? product_price * quantity : null}
                      removeItem={() => {
                        removeItemHandler(_id, quantity);
                      }}
                      quantity={quantity}
                      plusBtn={(e) => plusBtn(e, card)}
                      minusBtn={(e) => minusBtn(e, card)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="card-details-container">
            <h2>Payment Summary</h2>
            <div className="pay-methods-container">
              <b>Pay With</b>
              <div className="methods">
                <label
                  className="method-container"
                  // onClick={() => toast.error("not yet available")}
                >
                  <MdMobileFriendly />
                  Insta Pay
                  <input
                    type="radio"
                    name="paymethod"
                    onChange={() => setIsChecked("insta")}
                  />
                  <span className="check-mark"></span>
                </label>
                <label className="method-container">
                  {/* <IoCashOutline /> */}
                  <BsCash />
                  Cash On Deliver
                  <input
                    type="radio"
                    name="paymethod"
                    defaultChecked
                    onChange={() => setIsChecked("cash")}
                  />
                  <span className="check-mark"></span>
                </label>
              </div>
            </div>
            <div className="pay-receipt-container">
              <div className="delivery-fee receipt-group">
                <p>Delivery Fee</p>
                <p>{deleviryFee}</p>
              </div>
              <div className="total receipt-group">
                <p>Total</p>
                <b>EGP {calculateTotalPrice()}</b>
              </div>
            </div>
            <div className="check-out" onClick={checkoutHandler}>
              check out
            </div>
          </div>
        </div>
      </section>
      {dialog ? <DialogAddress onDialog={Close} /> : null}
    </>
  ) : (
    <>
      <section className="empty-cart">
        <h2>You cartlist is empty</h2>
        <div className="shop-btn" onClick={() => (navigate("/"), scroll(0, 0))}>
          shop now
        </div>
      </section>
    </>
  );
};

export default Cart;

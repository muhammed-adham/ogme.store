import React from "react";
import { TiDelete } from "react-icons/ti";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

/** MiniCard ==> /CartPage
 *
 * This Component represents a mini card
 * it displays product information in a compact format
 *
 * Usage:
 * - Cart Page
 *
 */
const CardMini = ({
  productImageSrc,
  productName,
  productCategory,
  quantity,
  price,
  oldPrice,
  removeItem,
  onClick,
  plusBtn,
  minusBtn,
}) => {
  //=================================================================Return=========================================================//
  return (
    <>
      <div className="card-mini-container">
        <div className="prd-img" onClick={onClick}>
          <img src={productImageSrc} alt="product image" />
        </div>
        <div className="prd-info">
          <div className="prd-name">
            <b style={{textTransform:"capitalize"}}>{productName}</b>
          </div>
          <div className="prd-cat" style={{textTransform:"capitalize"}}>{productCategory}</div>
        </div>
        <div className="quan">
          <AiOutlinePlus onClick={plusBtn} />
          <span>
          {quantity}
          </span>
          <AiOutlineMinus onClick={minusBtn} />
        </div>
          <div className="prd-price">
            <span>
              <del>
                {oldPrice ? "EGP" : null} {oldPrice}
              </del>
              EGP {price}
            </span>
          </div>
        <div className="delete-btn" onClick={removeItem}>
          <TiDelete />
        </div>
      </div>
    </>
  );
};

export default CardMini;

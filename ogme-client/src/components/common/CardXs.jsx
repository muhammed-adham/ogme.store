import React, { useEffect, useState } from "react";

/** CardXs ==> / CategoryPage
 *
 * This Component represents a xs card
 * it displays product information in a compact format
 *
 * Usage:
 * - Category Page On Mobile View
 *
 */
const CardXs = ({
  productName,
  price,
  oldPrice,
  productImage,
  onClick,
  isDragging,
  sold
}) => {
  //========================================================================================States
  const [hovered, setHovered] = useState(false); //Mouse Hovering Over Card Image

  const [imgIdx, setImgIdx] = useState(0); //Images Index Controller

  const [intervalId, setIntervalId] = useState(null); // Global Interval Function

  //========================================================================================Handlers
  //  Hover Handler
  // const handleHover = () => {
  //   setHovered((prev) => !prev);
  // };

  //Change Card Image On Hover
  // const startHoverInterval = () => {
  //   setImgIdx(imgIdx + 1);
  //   const id = setInterval(() => {
  //     setImgIdx((prevIndex) => {
  //       const nextIndex = prevIndex + 1; //Giving the state a variable so if statement can check it immediately//
  //       if (nextIndex >= 3) {
  //         setImgIdx(0);
  //       }
  //       return nextIndex; //The return refer to the setImgIdx value//
  //     });
  //   }, 2000);
  //   setIntervalId(id);
  // };

  //========================================================================================UseEffect
  //Handle Image Change On Hover
  // useEffect(() => {
  //   //Prevent Change Image while Dragging//
  //   if (hovered && !isDragging) {
  //     startHoverInterval();
  //   } else {
  //     clearInterval(intervalId);
  //     setImgIdx(0);
  //   }
  // }, [hovered, isDragging]);

  //==================================================================Return======================================================//
  return (
    <>
      <div
        className="card-xs"
        // onMouseEnter={handleHover}
        // onMouseLeave={handleHover}
        onClick={onClick}
      >
        <div className="img-container">
          <img
            draggable="false"
            // src={productImage ? productImage[imgIdx] : null} // Prevent Delay Errors
            src={productImage}
            alt="product image"
            className="image-nd"
          />
        </div>
        <div className="desc">
          <p>{productName}</p>
          <div className="price">
            <span>
              <del>
                {oldPrice ? "EGP" : null} {oldPrice}
              </del>
              EGP {price}
            </span>
          </div>
          {sold ? <div className="sold-out">sold out!</div> : null}

        </div>
      </div>
    </>
  );
};

export default CardXs;

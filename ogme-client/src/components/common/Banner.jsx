import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

/** === Banner ===
 *
 * This component represents a custom banner
 * It used to display either a video or an image and breadcrumb for sub-pages
 *
 * Usage:
 * - Shop Pages: This Banner is used in the Drive, Bottles, SunCatcher, Customize pages
 * - OnSale Page: This banner is used in the OnSale page to promote discounted or special offer items.
 *
 */
const Banner = ({ src, currentPage, isLoading }) => {
  const [isVideo, setIsVideo] = useState();

  useEffect(() => {
    const videoPattern = /\.mp4$/i;
    setIsVideo(videoPattern.test(src));
  }, [src]);

  //==================================================================Return======================================================//
  return (
    <>
      <section className="banner">
        {isLoading || undefined ? (
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
        ) : isVideo ? (
          <video
            src={src}
            autoPlay={true}
            muted
            playsInline
            loop={true}
            controls={false}
          ></video>
        ) : (
          <img src={src} alt="Banner Image" />
        )}
        <div className="crumbs-container">
          <h1>{currentPage}</h1>
          <div className="crumbs">
            {currentPage ? (
              <>
                <Link to={"/"} onClick={() => scroll(0, 0)}>
                  home{" "}
                </Link>
                <span>- </span>
              </>
            ) : null}
            <NavLink>{currentPage}</NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;

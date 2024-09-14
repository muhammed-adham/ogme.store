import React, { useEffect, useRef, useState } from "react";
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

  //LowPowerMode AutoPlay on Safari 
  const videoRef = useRef(null);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Autoplay failed:', error);
      });
    }
  };

  // const isLowPowerMode = async () => {
  //   const battery = await navigator.getBattery();
  //   return battery.level <= 0.2 && !battery.charging;
  // };

  useEffect(() => {
    // Set initial attributes on mount
    if (videoRef.current) {
      videoRef.current.autoplay = true;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.loop = true;
      videoRef.current.controls = false;

      // Try to play the video on load
      videoRef.current.addEventListener('canplaythrough', playVideo);
    }

    // Cleanup on unmount
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('canplaythrough', playVideo);
      }
    };
  }, []);
  
  // useEffect(() => {
  //   const handleAutoplay = async () => {
  //     const isLow = await isLowPowerMode();

  //     if (isLow) {
  //       // Low power mode
  //       videoRef.current.autoplay = true;
  //       videoRef.current.muted = true;
  //       videoRef.current.playsInline = true;
  //       videoRef.current.loop = true;
  //       videoRef.current.controls = false;

  //       // Request user interaction to play the video
  //       videoRef.current.addEventListener("canplaythrough", () => {
  //         videoRef.current.play();
  //       });
  //     }
  //   };
  //   handleAutoplay();
  // }, []);
  
  //==================================================================Return======================================================//
  return (
    <>
      <section className="banner container">
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
            muted={true}
            playsInline={true}
            loop={true}
            controls={false}
            ref={videoRef}
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

import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

/** === Banner ===
 *
 * This component represents a custom banner
 * It used to display either a video or an image and breadcrumb for sub-pages
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

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.autoplay = true;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.loop = true;
      videoRef.current.controls = false;

      const onCanPlayThrough = () => {
        handlePlay();
      };

      videoRef.current.addEventListener("canplaythrough", onCanPlayThrough);

      // Cleanup
      return () => {
        videoRef.current.removeEventListener(
          "canplaythrough",
          onCanPlayThrough
        );
      };
    }
  }, [videoRef]);

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
          rel="preload"
            preload="metadata"
            src={src}
            autoPlay={true}
            muted={true}
            playsInline={true}
            loop={true}
            controls={false}
            ref={videoRef}
            onClick={handlePlay}
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

import React, { useEffect } from 'react';

const MetaPixel = () => {
  useEffect(() => {
    // Check if fbq is already defined
    if (window.fbq) return;

    // Define fbq and load the Facebook Pixel script
    window.fbq = function() {
      window.fbq.callMethod ?
      window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
    };
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    window.fbq.queue = [];

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.body.appendChild(script);

    // Initialize Facebook Pixel
    window.fbq('init', '1060896135398879');
    window.fbq('track', 'PageView');

    // Cleanup function to remove the script if needed
    // return () => {
    //   document.body.removeChild(script);
    // };

  }, []);

  return null
};

export default MetaPixel;
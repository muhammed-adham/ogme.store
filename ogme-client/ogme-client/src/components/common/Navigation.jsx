import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

/** === Navigation ===
 *
 * This component represents the navigation menu.
 *
 * Usage:
 * - Header Component
 *
 */
const Navigation = ({ admin }) => {
  //Main NavLinks
  const navLinks = [
    { path: "/", label: "home" },
    { path: "/shop", label: "shop" },
    { path: "/sale", label: "on sale" },
    { path: "/about", label: "about us" },
    { path: "/policy", label: "policy" },
  ];

  if (admin) {
    navLinks.push({ path: "/backstage", label: "admin" });
  }

  //Sub NavLinks ==> ShopLink
  const overlayLinks = [
    { path: "/shop/drive", label: "ogme drive" },
    { path: "/shop/bottles", label: "ogme bottles" },
    { path: "/shop/glassware", label: "ogme glassware" },
    // { path: "/shop/suncatcher", label: "ogme suncatcher" },
    { path: "/ask", label: "Customize" },
  ];

  //========================================================================================State
  const [isHovered, setIsHovered] = useState(false);

  //========================================================================================Handler
  //Hover Handler To Show an OverLay With SubLinks When Hover On ShopLink
  const mouseEnterHandler = () => {
    setIsHovered(true);
  };
  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  //===============================================================Return===============================================================//
  return (
    <>
      <nav>
        {navLinks.map((link, idx) => (
          <span key={idx}>
            <NavLink
              to={link.path}
              onClick={link.label === "shop" ? (e) => e.preventDefault() : null} // Prevent default for "shop" only
              onMouseEnter={link.label === "shop" ? mouseEnterHandler : null} // Event handler for "shop" hover
              onMouseLeave={link.label === "shop" ? mouseLeaveHandler : null} // Event handler for "shop" leave
              style={{ color: link.label === "on sale" ? "red" : null, opacity:isHovered&&link.label === "shop"?"1":null }} // Dynamic color for "on sale"
            >
              {link.label}
            </NavLink>
            {/* Conditional rendering of dropdown, ensuring no nesting  */}
            {idx === 0 && isHovered && (
              <>
                <div
                  className="overlay-container"
                  onMouseEnter={mouseEnterHandler} // Event handler for "shop" hover
                  onMouseLeave={mouseLeaveHandler} // Event handler for "shop" leave
                >
                  <div className="overlay">
                    {overlayLinks.map((li, idx) => (
                      <div key={idx} className="link-container">
                        <Link to={li.path} onClick={() => scroll(0, 0)}>
                          {li.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </span>
        ))}
      </nav>
    </>
  );
};

export default Navigation;

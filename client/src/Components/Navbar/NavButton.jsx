import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const NavButton = ({ set }) => {
  const buttonRef = useRef(null);
  const componentRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        handleMouseLeave();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const style = {
    backgroundImage: `url(${set.img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, { borderRadius: "16px", duration: 0.3 });
  };

  const handleMouseLeave = () => {
    if (!dropdownOpen)
      gsap.to(buttonRef.current, { borderRadius: "99px", duration: 0.3 });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div ref={componentRef}>
      <div className="dropdown dropdown-top">
        <button
          ref={buttonRef}
          className="nav-button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={set.type === "profile" ? toggleDropdown : null}
          tabIndex={0}
          role="button"
          style={style}
        >
          {set.icon && (
            <span className="material-symbols-outlined filled p-2">
              {set.icon}
            </span>
          )}
        </button>
        {set.type === "profile" ? (
          <ul tabIndex={0} className="nav-dropdown">
            <li>
              <a className="flex justify-between">
                User Settings{" "}
                <span className="material-symbols-outlined filled text-base">
                  settings
                </span>
              </a>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default NavButton;

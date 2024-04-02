import React, { useRef, useState, useEffect } from "react";
import Theme from "../../utils/Theme";
import { gsap } from "gsap";

const Profile = ({ set, handleLogout }) => {
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
      <div className="dropdown dropdown-right">
        <button
          ref={buttonRef}
          className="nav-button m-3 avatar"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={set.type === "profile" ? toggleDropdown : null}
          tabIndex={0}
          role="button"
          style={style}
          aria-label="Profile menu"
        >
          <div className="w-14 rounded-full tooltip tooltip-right" data-tip="Profile">
            <img src={set.img}  alt="prifle picture"/>
          </div>
        </button>
        {set.type === "profile" ? (
          <ul tabIndex={0} className="nav-dropdown">
            <li onClick={ handleLogout }>
              <a className="flex justify-between w-36">
                Logout
                <span className="material-symbols-outlined filled text-base">
                  logout
                </span>
              </a>
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;

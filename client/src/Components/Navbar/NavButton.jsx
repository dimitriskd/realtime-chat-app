import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const NavButton = (props) => {
  const buttonRef = useRef(null);
  const componentRef = useRef(null);
  const selectorRef = useRef(null);


  useEffect(() => {
    if (!props.active) {
      buttonRef.current.addEventListener(
        "mouseenter",
        handleShortSelectorAppear
      );
      buttonRef.current.addEventListener(
        "mouseleave",
        handleShortSelectorDisappear
      );
      handleShortSelectorDisappear();
    }
    return () => {
      if (!props.active && buttonRef.current) {
        buttonRef.current.removeEventListener(
          "mouseenter",
          handleShortSelectorAppear
        );
        buttonRef.current.removeEventListener(
          "mouseleave",
          handleShortSelectorDisappear
        );
      }
    };
  }, [props.active]);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      borderRadius: "99px",
      backgroundColor: "#0075fb",
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
      gsap.to(buttonRef.current, {
        borderRadius: "99px",
        backgroundColor: "",
        duration: 0.3,
      });
  };

  const handleShortSelectorAppear = () => {
    gsap.to(selectorRef.current, { height: "30%", duration: 0.3 });
  };

  const handleShortSelectorDisappear = () => {
    gsap.to(selectorRef.current, { height: "10%", duration: 0.3 });
  };

  return (
    <div
      ref={componentRef}
      className="flex justify-center items-center w-full relative"
    >
      <div
        ref={selectorRef}
        className={`dark:bg-white bg-cod-gray-900 w-1 absolute rounded-xl -left-0 ${
          props.active ? "h-8" : "h-2"
        }`}
      ></div>
      <button
        ref={buttonRef}
        className={`nav-button my-2 tooltip tooltip-right ${
          props.active ? "bg-accent" : null
        }`}
        data-tip={props.set.type[0].toUpperCase() + props.set.type.substring(1)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => props.handleClick(props.set.type)} // Change props.handleClick to props.onClick
        tabIndex={0}
        role="button"
      >
        {props.set.icon && (
          <span className="material-symbols-outlined filled dark:text-white text-cod-gray-950 p-2">
            {props.set.icon}
          </span>
        )}
      </button>
    </div>
  );
};

export default NavButton;

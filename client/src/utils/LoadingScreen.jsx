import gsap from "gsap";
import { useRef, useEffect } from "react";

export default function LoadingScreen() {
  const innerDivRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const innerDiv = innerDivRef.current;
    const text = textRef.current;
    const characters = text.textContent.split("");

    // Define the animation timeline
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // Set up animation
    tl.to(innerDiv, { x: "200%", duration: 1, ease: "none" });
    text.innerHTML = characters
      .map((char) => `<span style="opacity:0; font-size:0">${char}</span>`)
      .join("");

    const tl2 = gsap.timeline();

    // Animate each character to appear one by one
    tl2.staggerTo(
      text.querySelectorAll("span"),
      0.2,
      { opacity: 1, fontSize: "9rem" },
      0.2
    );
    // Return cleanup function
    return () => {
      tl.kill(); // Kill the animation to prevent memory leaks
    };
  }, []); // Run once when the component mounts

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-20 absolute top-0 left-0 bg-white dark:bg-shark-950 z-50">
      <h1
        ref={textRef}
        className="text-black dark:text-white font-bold tracking-tighter text-9xl"
      >
        chappy.
      </h1>
      <div className="w-1/4 h-3 bg-shark-500 rounded-full">
        <div
          ref={innerDivRef}
          className="w-1/3 h-3 bg-black dark:bg-white rounded-full"
        ></div>
      </div>
    </div>
  );
}

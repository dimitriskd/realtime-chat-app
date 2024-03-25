import { useEffect, useState } from "react";
import { themeChange } from "theme-change";

themeChange();

export default function Theme() {
  const [selected, setSelected] = useState(
    document.querySelector("html").getAttribute("data-theme")
  );

  useEffect(() => {
    // Add event listener to handle theme change
    const handleThemeChange = () => {
      setSelected(document.querySelector("html").getAttribute("data-theme"));
    };

    document.addEventListener("theme-changed", handleThemeChange);

    return () => {
      document.removeEventListener("theme-changed", handleThemeChange);
    };
  }, []);

  return (
    <div className="font-bold w-fit">
      <button
        className={`w-fit p-2 mr-3 rounded-xl ${
          selected === "light"
            ? "border-accent"
            : "border-shark-600"
        } bg-white border-2 rounded-full relative`}
        onClick={() => {
          document.documentElement.setAttribute("data-theme", "light");
          document.dispatchEvent(new Event("theme-changed"));
        }}
        data-set-theme="light"
        data-act-class="ACTIVECLASS"
      >
        <div className="w-10 h-10"></div>
        <p className="hidden">Light Mode</p>
        <span className="material-symbols-outlined filled bg-accent rounded-full block dark:hidden absolute text-white -top-2 -right-0">check</span>
      </button>
      <button
        className={`w-fit p-2 rounded-xl ${
          selected === "dark"
            ? "border-accent"
            : "border-shark-600"
        } bg-darkBg border-2 rounded-full text-white relative`}
        onClick={() => {
          document.documentElement.setAttribute("data-theme", "dark");
          document.dispatchEvent(new Event("theme-changed"));
        }}
        data-set-theme="dark"
        data-act-class="ACTIVECLASS"
      >
        <div className="w-10 h-10"></div>
        <p className="hidden">Dark Mode</p>
        <span className="material-symbols-outlined filled bg-accent rounded-full hidden dark:block absolute text-white -top-2 -right-0">check</span>
      </button>
    </div>
  );
}

import { useState } from "react";
import NavButton from "./NavButton";
import Profile from "./Profile";
import ThemeButton from "./ThemeButton";
import { Link } from "react-router-dom";

export default function Navbar({ user, handleLogout }) {
  const [activeButton, setActiveButton] = useState("home");

  const settings = { type: "settings", icon: "settings" },
    friends = { type: "friends", icon: "group" },
    home = { type: "home", icon: "forum" },
    profile = { type: "profile", img: user.avatar };

  const handleButtonClick = (type) => {
    setActiveButton(type);
  };

  return (
    <section className="nav-h flex flex-col w-fit gap-2">
      <h1 className="text-darkBg dark:text-white text-2xl font-bold tracking-tighter m-2">
        <a href="#">chappy.</a>
      </h1>
      <nav className="flex flex-col justify-between items-center rounded-2xl w-full h-full">
        <div className="flex flex-col justify-center w-full h-full">
          <Link to="/">
            <NavButton set={home} active={activeButton === "home"} handleClick={handleButtonClick} />
          </Link>
          <NavButton set={friends} active={activeButton === "friends"} handleClick={handleButtonClick} />
          <NavButton set={settings} active={activeButton === "settings"} handleClick={handleButtonClick} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <ThemeButton />
          <Profile set={profile} handleLogout={handleLogout} />
        </div>
      </nav>
    </section>
  );
}

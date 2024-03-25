import { useState } from "react";
import NavButton from "./NavButton";
import Profile from "./Profile";
import ThemeButton from "./ThemeButton";
import profilePic from "../../assets/images/profile.jpg";

export default function Navbar() {
  const [activeButton, setActiveButton] = useState("home");

  const settings = { type: "settings", icon: "settings" },
    friends = { type: "friends", icon: "group" },
    home = { type: "home", icon: "home" },
    profile = { type: "profile", img: profilePic };

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
          <NavButton set={home} active={activeButton === "home"} handleClick={handleButtonClick} />
          <NavButton set={friends} active={activeButton === "friends"} handleClick={handleButtonClick} />
          <NavButton set={settings} active={activeButton === "settings"} handleClick={handleButtonClick} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <ThemeButton />
          <Profile set={profile}/>
        </div>
      </nav>
    </section>
  );
}

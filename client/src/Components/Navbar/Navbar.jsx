import NavButton from "./NavButton";
import profilePic from "../../assets/images/profile.jpg";

export default function Navbar() {
  const settings = { type: "selection", icon: "settings" },
        friends = { type: "selection",  icon: "group" },
        profile = { type: "profile",  img: profilePic };
        
  return (
    <section className="nav-h flex flex-col w-fit gap-2 m-2">
      <h1 className="text-darkBg dark:text-white text-2xl font-bold tracking-tighter">
        chappy.
      </h1>
      <nav className="flex flex-col justify-between items-center rounded-2xl bg-shark-200 dark:bg-darkBg p-3 w-fit h-full">
        <div id="home" className="home">
          <button className="p-1 bg-accent rounded-2xl w-14 h-14">
            <span className="material-symbols-outlined filled text-white text-3xl">
              home
            </span>
          </button>
        </div>
        <hr className="border w-10 border-shark-300 dark:border-shark-600 my-3" />
        <div id="chats" className="chats flex flex-col flex-1 gap-3">
          <NavButton set={settings} />
        </div>
        <div id="profile" className="profile">
          <NavButton set={profile} />
        </div>
      </nav>
    </section>
  );
}

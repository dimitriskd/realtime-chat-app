import { useState, useEffect } from "react";
import "./assets/Styles/App.css";
import Navbar from "./Components/Navbar/Navbar";
import LoadingScreen from "./utils/LoadingScreen";
import Theme from "./utils/Theme"

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(delay);
  }, []);

  if(loading){
    return <LoadingScreen />
  }

  return (
    <main className="flex md:flex-row">
      <Navbar />
      {/* <Theme /> */}
      <section className="h-full">
        <div className="window-size mt-4 bg-shark-200 dark:bg-darkBg rounded-2xl">
        </div>
      </section>
      {/* <LoadingScreen /> */}
    </main>
  );
}

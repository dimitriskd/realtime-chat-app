import { useState, useEffect } from "react";
import "./assets/Styles/App.css";
import Navbar from "./Components/Navbar/Navbar";
import LoadingScreen from "./utils/LoadingScreen";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  if(loading){
    return <LoadingScreen />
  }

  return (
    <main className="flex h-screen md:flex-row">
      <Navbar />
      <section className="h-full">
        {/* <Home /> */}
        <Login />
      </section>
      {/* <LoadingScreen /> */}
    </main>
  );
}

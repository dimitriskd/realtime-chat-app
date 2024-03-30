import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/Styles/App.css";
import Navbar from "./Components/Navbar/Navbar";
import LoadingScreen from "./utils/LoadingScreen";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login"

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
    <BrowserRouter>
      <div className="flex h-screen md:flex-row">
        <Navbar />
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

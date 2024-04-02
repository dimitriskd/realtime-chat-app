import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./assets/Styles/App.css";
import Navbar from "./Components/Navbar/Navbar";
import LoadingScreen from "./utils/LoadingScreen";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl)

export default function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchData(navigate, setUserAuthenticated, setUserProfile, setLoading);
  }, [userAuthenticated]);

  // Function to handle user authentication
  const handleLogin = async () => {
    setLoading(true);
    setUserAuthenticated(true);
    setLoading(false);
    setTimeout(() => {
      navigate("/");
    },2000)
  };

  // Function to handle user logout
  const handleLogout = async () => {
    setLoading(true);
    logout();
    setUserAuthenticated(false);
    setUserProfile(null);
    setLoading(false);
    setTimeout(() => {
      navigate("/login");
    },2000)
  };

  return (
    <div className="flex h-screen md:flex-row">
      {loading && <LoadingScreen />}
      {userAuthenticated && userProfile && <Navbar user={userProfile} handleLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/"
          element={
            userAuthenticated ? (
              <Chat user={userProfile} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

const fetchData = async (
  navigate,
  setUserAuthenticated,
  setUserProfile,
  setLoading
) => {
  try {
    const response = await axios.get(`${apiUrl}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    setLoading(true);
    setUserProfile(response.data);
    setUserAuthenticated(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    navigate("/");
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setUserAuthenticated(false);
  }
};

const logout = async (req, res) => {
  try {
    await axios.get(`${apiUrl}/user/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    
  }
}
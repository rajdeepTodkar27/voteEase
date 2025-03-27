import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProtectedRoute = () => {
  const [authorized, setAuthorized] = useState(null);
  const token = sessionStorage.getItem("token");
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        alert("Unauthorized! Please sign in.");
        setAuthorized(false);
        return;
      }
      try {
        await axios.get("http://localhost:4000/user/home", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuthorized(true);
      } catch (err) {
        console.error("Access Denied:", err.response?.data?.message || err.message);
        alert("access denied please sign in again")
        setAuthorized(false);
      }
    };

    fetchUserData();
  }, [token]);

  if (authorized === null) return <div>Loading...</div>;

  return authorized ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;

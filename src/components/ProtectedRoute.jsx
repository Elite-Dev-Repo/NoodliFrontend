import api from "../lib/api";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ACCESS, REFRESH } from "@/lib/constants";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const refreshToken = async () => {
    try {
      const refresh_token = localStorage.getItem(REFRESH);
      if (!refreshToken) {
        setIsAuthenticated(false);
      }
      const res = await api.post("token/refresh/", { refresh: refresh_token });
      if ((await res.status) === 200) {
        localStorage.setItem(ACCESS, res.data.access);
        localStorage.setItem(REFRESH, res.data.refresh);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem(ACCESS);
      if (!token) {
        setIsAuthenticated(false);
      }
      const decoded = jwtDecode(token);
      const expiry = decoded.exp;
      if (expiry <= Math.floor(Date.now() / 1000)) {
        await refreshToken();
      }
      setIsAuthenticated(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkAuth().catch((e) => {
        setIsAuthenticated(false);
        console.log(e);
      });
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;

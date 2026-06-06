import {
  Navigate
} from "react-router";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  API_BASE_URL
} from "../config";

interface Props {

  children: React.ReactNode;
}

export function ProtectedRoute({

  children

}: Props) {

  const [loading, setLoading] =
    useState(true);

  const [isAuthenticated,
    setIsAuthenticated] =
      useState(false);

  useEffect(() => {

    const verifyToken =
      async () => {

      const token =
        localStorage.getItem(
          "token"
        );

      // No token

      if (!token) {

        setLoading(false);

        return;
      }

      try {

        // Verify from backend

        await axios.get(

          `${API_BASE_URL}/admin/verify`,

          {
            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        );

        setIsAuthenticated(true);

      } catch (error) {

        localStorage.removeItem(
          "token"
        );

        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    verifyToken();

  }, []);

  // Loading

  if (loading) {

    return (

      <div className="h-screen flex items-center justify-center text-2xl font-bold">

        Checking Authentication...

      </div>
    );
  }

  // Not authenticated

  if (!isAuthenticated) {

    return (

      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  // Authenticated

  return children;
}
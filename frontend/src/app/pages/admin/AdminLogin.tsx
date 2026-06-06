import {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router";

import {
  API_BASE_URL
} from "../../config";

import toast from "react-hot-toast";

export function AdminLogin() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =========================
  // Login
  // =========================

  const handleLogin =
    async (
      e: React.FormEvent
    ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response =
        await axios.post(

          `${API_BASE_URL}/admin/login`,

          {
            email,
            password
          }
        );

      // Save token

      localStorage.setItem(

        "token",

        response.data.access_token
      );

      toast.success(
        "Login Successful 🚀"
      );

      // Redirect to dashboard

      navigate(
        "/admin/dashboard"
      );

    } catch (error) {

      toast.error(
        "Invalid Credentials"
      );

      console.error(error);
    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <form

        onSubmit={handleLogin}

        className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md space-y-6"
      >

        <h1 className="text-4xl font-bold text-center">

          Admin Login

        </h1>

        {/* Email */}

        <input
          type="email"
          placeholder="Admin Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Password */}

        <input
          type="password"
          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Button */}

        <button

          type="submit"

          disabled={loading}

          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors"
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>

      </form>

    </div>
  );
}
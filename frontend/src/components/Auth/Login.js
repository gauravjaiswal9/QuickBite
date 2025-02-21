import React, { useEffect, useState } from "react";
import API from "../../services/api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      window.location.replace(role === "owner" ? "/owner/dashboard" : "/customer/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      window.location.replace(data.user.role === "owner" ? "/owner/dashboard" : "/customer/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 p-6">
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-12 rounded-3xl shadow-2xl w-full max-w-md border border-gray-500 transform transition-all hover:scale-105 hover:shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-900 opacity-40 pointer-events-none"></div>
        <h2 className="relative text-4xl font-extrabold text-center text-white mb-6">Login</h2>
        {error && <p className="relative text-red-400 text-center mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="relative space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full p-4 border border-gray-600 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all hover:bg-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="w-full p-4 border border-gray-600 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all hover:bg-gray-700"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-2xl relative after:absolute after:inset-0 after:bg-white after:opacity-10 after:rounded-xl after:transition-opacity after:hover:opacity-0"
          >
            Login
          </button>
        </form>
        <p className="relative text-center text-gray-300 mt-6">
          Don't have an account? <a href="/register" className="text-purple-400 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

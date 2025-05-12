import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data)
      if (res.ok) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        if (data.user.userType === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard"); // or wherever non-admin users should go
        }
      } else {
        toast.error(data.message || "Login failed.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-0 sm:p-8 w-full max-w-4xl flex flex-col sm:flex-row"
      >
        {/* Animated Logo Section */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="sm:w-1/2 flex items-center justify-center p-6 sm:border-r border-gray-200"
        >
          <img
            src="https://www.w3schools.com/images/w3schools_green.jpg"
            alt="Logo"
            className="w-28 sm:w-40"
          />
        </motion.div>

        {/* Login Form Section */}
        <div className="sm:w-1/2 w-full p-6 sm:p-10">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-extrabold text-green-700">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Please login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <p>
                Don’t have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-green-600 font-medium cursor-pointer hover:underline"
                >
                  Sign up
                </span>
              </p>
              <p
                onClick={() => navigate("/forgot-password")}
                className="cursor-pointer hover:underline"
              >
                Forgot Password?
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UserLogin;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import logo from '../assets/logo.jpg'; // Adjust the path if needed

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    class: '',
    collegeName: '',
    passingYear: '',
    interestedLanguages: '',
    userType: 'user',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          interestedLanguages: formData.interestedLanguages.split(',').map(lang => lang.trim()),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Registered successfully!");
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#F5F5F5]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row w-full max-w-5xl gap-6"
      >
        {/* Logo Left (md+) */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="hidden md:flex items-center justify-center w-48"
        >
          <img src={logo} alt="Logo" className="w-full h-auto object-contain rounded-xl" />
        </motion.div>

        {/* Form Container */}
        <div className="flex-1">
          {/* Logo Top (mobile only) */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="md:hidden flex items-center justify-center mb-4"
          >
            <img src={logo} alt="Logo" className="w-24 h-auto object-contain rounded-xl" />
          </motion.div>

          <h2 className="text-3xl font-bold text-center text-[#2C2C2C] mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-[#2C2C2C]">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-xl border-[#E0E0E0] focus:ring-2 focus:ring-[#4B0082] outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 text-[#2C2C2C]">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-xl border-[#E0E0E0] focus:ring-2 focus:ring-[#4B0082] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-[#2C2C2C]">Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl border-[#E0E0E0] focus:ring-2 focus:ring-[#4B0082] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-[#2C2C2C]">Class*</label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-xl border-[#E0E0E0] focus:ring-2 focus:ring-[#4B0082] outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 text-[#2C2C2C]">College Name*</label>
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-xl border-[#E0E0E0] focus:ring-2 focus:ring-[#4B0082] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-[#2C2C2C]">Passing Year*</label>
              <input
                type="number"
                name="passingYear"
                value={formData.passingYear}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl border-[#E0E0E0] focus:ring-2 focus:ring-[#4B0082] outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-[#2C2C2C]">Programming Languages* (comma separated)</label>
              <input
                type="text"
                name="interestedLanguages"
                value={formData.interestedLanguages}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl border-[#E0E0E0] focus:ring-2 focus:ring-[#4B0082] outline-none"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              className="w-full bg-[#40E0D0] text-white py-3 rounded-xl font-semibold hover:bg-[#00BFFF] transition"
            >
              Register
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

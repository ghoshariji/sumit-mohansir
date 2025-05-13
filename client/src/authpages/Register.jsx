import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

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
      console.log(data);
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
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-center text-[#2C2C2C] mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Animated Full Name input */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <label className="block text-[#2C2C2C] mb-1">Full Name*</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              required className="w-full p-3 border border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B0082]" />
          </motion.div>

          {/* Animated Email input */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <label className="block text-[#2C2C2C] mb-1">Email*</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              required className="w-full p-3 border border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B0082]" />
          </motion.div>

          {/* Animated Password input */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <label className="block text-[#2C2C2C] mb-1">Password*</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange}
              required className="w-full p-3 border border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B0082]" />
          </motion.div>

          {/* Animated Class and College Name input in one row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-[#2C2C2C] mb-1">Class*</label>
              <input type="text" name="class" value={formData.class} onChange={handleChange}
                required className="w-full p-3 border border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B0082]" />
            </div>

            <div>
              <label className="block text-[#2C2C2C] mb-1">College Name*</label>
              <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange}
                required className="w-full p-3 border border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B0082]" />
            </div>
          </motion.div>

          {/* Animated Passing Year input */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <label className="block text-[#2C2C2C] mb-1">Passing Year*</label>
            <input type="number" name="passingYear" value={formData.passingYear} onChange={handleChange}
              required className="w-full p-3 border border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B0082]" />
          </motion.div>

          {/* Animated Programming Languages input */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <label className="block text-[#2C2C2C] mb-1">Programming Languages* (comma separated)</label>
            <input type="text" name="interestedLanguages" value={formData.interestedLanguages} onChange={handleChange}
              required className="w-full p-3 border border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B0082]" />
          </motion.div>

          {/* Animated Register Button */}
          <motion.button 
            type="submit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full bg-[#40E0D0] text-white py-3 rounded-xl font-semibold hover:bg-[#00BFFF] transition"
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;

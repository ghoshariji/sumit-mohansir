import React, { useEffect, useState } from "react";
import AdminNav from "./AdminSidebar";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import API from "../api";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);

  const fetchUserGrowth = async () => {
    try {
      const res = await API.get("/api/auth/user-count");
      setUserCount(res.data.totalUsers);
      setMonthlyData(res.data.monthlyRegistrations);
    } catch (error) {
      console.error("Failed to fetch user growth data", error);
    }
  };

  useEffect(() => {
    fetchUserGrowth();
  }, []);

  const [languages, setLanguages] = useState([]);

  const fetchLanguage = async () => {
    try {
      const res = await API.get("/api/auth/user-lang-count");
      console.log(res.data);
      setLanguages(res.data);
    } catch (error) {
      console.error("Error fetching languages", error);
    }
  };

  useEffect(() => {
    fetchLanguage();
  }, []);

  const pieData = [
    { name: "Flights", value: 400 },
    { name: "Hotels", value: 300 },
    { name: "Events", value: 300 },
    { name: "Others", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <AdminNav />
      <div className="lg:ml-64 mt-20 bg-gray-100 min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Total Users */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600">{userCount}</p>
            <p className="text-gray-500">Non-admin users</p>
          </div>

          {/* Bar Chart: Monthly User Registrations */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">
              User Growth (Monthly)
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Active Bookings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Active Bookings</h2>
            <p className="text-3xl font-bold text-green-600">872</p>
            <p className="text-gray-500">Across all services</p>
          </div>

          {/* Pie Chart: Service Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Service Distribution</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Monthly Revenue</h2>
            <p className="text-3xl font-bold text-purple-600">$25,300</p>
            <p className="text-gray-500">From all bookings</p>
          </div>

          {/* Support Tickets */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Open Support Tickets</h2>
            <p className="text-3xl font-bold text-red-600">58</p>
            <p className="text-gray-500">Pending resolutions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

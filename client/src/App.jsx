import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./authpages/Register";
import UserLogin from "./authpages/UserLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLanguage from "./admin/AdminLanguage";
import AddContentSection from "./admin/AddContentSection";
import AddTitleSection from "./admin/AddTitleSection";
import CoursePage from "./pages/Courses/CoursePage"; // Import the new page
import Home from "./pages/Home";
import Editor from "./pages/Test";
import AdminAddvertise from "./admin/AddvertiseMent";
import { ThemeProvider } from "./context/ThemeContext";


const AppLayout = () => {
  const location = useLocation();

  // Define condition to hide Navbar for certain routes
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {/* Only render Navbar if not on login, register, or admin pages */}
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-language" element={<AdminLanguage />} />
        <Route path="/admin-title" element={<AddTitleSection />} />
        <Route path="/admin-section-content" element={<AddContentSection />} />
        <Route path="/course/:languageName/title/:languageContent" element={<CoursePage />} />
        <Route path="/test" element={<Editor />} />
        {/* Optional: redirect old route */}
        <Route path="/MainContainer" element={<Navigate to="/" />} />
        <Route path="/admin-addvertisement" element={<AdminAddvertise />} />
      </Routes>
    </>
  );
};
const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";  // Assuming Sidebar exists
import Register from "./authpages/Register";
import UserLogin from "./authpages/UserLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLanguage from "./admin/AdminLanguage";
import AddContentSection from "./admin/AddContentSection";
import AddTitleSection from "./admin/AddTitleSection";
import MainContainer from "./pages/Courses/MainContainer";
import ContentDisplay from "./pages/Courses/ContentDisplay"; // Assuming this is your content display component
import ContentPage from "./pages/Courses/ContentDisplay";
import CoursePage from "./pages/Courses/CoursePage"; 
const AppLayout = () => {
  const location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // Determine if the Navbar and Sidebar should be hidden
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/admin-language" ||
    location.pathname === "/admin-section-content" ||
    location.pathname === "/admin-dashboard" ||
    location.pathname === "/admin-title";

  return (
    <>
      {!hideNavbar && <Navbar onSelectLanguage={setSelectedLanguage} />}
      <div className="flex">
        <div className="flex-grow">
          <Routes>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-language" element={<AdminLanguage />} />
            <Route path="/admin-title" element={<AddTitleSection />} />
            <Route path="/admin-section-content" element={<AddContentSection />} />
            <Route path="/" element={<MainContainer />} />
            {/* <Route path="/course/:language" element={<CoursePage />} /> 
            <Route path="/course/:language/:title" element={<ContentPage />} /> */}
          <Route path="/course/:languageName/title/:languageContent" element={<MainContainer />} /> 
          </Routes>
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;

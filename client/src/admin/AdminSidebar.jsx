import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
import smallLogo from "../assets/react.svg";
import {
  FaHome,
  FaPlusSquare,
  FaRegCalendarAlt,
  FaUserPlus,
  FaShoppingCart,
  FaUsers,
  FaHandsHelping,
  FaBell,
  FaCalendarAlt,
  FaBoxOpen,
  FaUser,
  FaCartPlus,
  FaDollarSign,
  FaSyncAlt,
  FaWallet,
  FaGlobe,
  FaFlagUsa,
  FaFlag,
  FaSignOutAlt,
  FaLanguage,
  FaTiktok,
  FaTint,
  FaTextWidth,
  FaAdversal,
} from "react-icons/fa"; // Importing icons

const AdminNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [admin, isAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userName, setUserName] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("name");
    navigate("/login");
  };

  useEffect(() => {
    // const adminStatus = localStorage.getItem("admin");
    // const name = localStorage.getItem("name");
    setUserName("name");
    //   isAdmin(adminStatus === "true");
    //  setLoading(false);
  }, []);
  const firstName = userName ? userName.split(" ")[0] : "User";

  const [currentLogo, setCurrentLogo] = useState(logo);

  useEffect(() => {
    const updateLogo = () => {
      if (window.innerWidth <= 768) {
        setCurrentLogo(smallLogo);
      } else {
        setCurrentLogo(logo);
      }
    };

    updateLogo();
    window.addEventListener("resize", updateLogo);

    return () => {
      window.removeEventListener("resize", updateLogo);
    };
  }, []);

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full dark:bg-black dark:border-gray-900 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden md:block lg:hidden hover:bg-[#3184A6]"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <Link to="/milkman-dashboard" className="ml-2">
                <img src={currentLogo} alt="Logo" className="w-[100%] h-14" />
              </Link>
            </div>
            <div className="hidden lg:block">
              <div
                className="flex items-center space-x-4 hover:cursor-pointer"
                onClick={() => navigate("/milkman-profile")}
              >
                {/* Profile Icon Circle */}
                <div className="w-10 h-10 rounded-full bg-[#40A1CB] flex items-center justify-center text-white font-bold text-lg">
                  {firstName?.charAt(0).toUpperCase()}
                </div>

                {/* Welcome Message */}
                <span className="text-white text-lg font-semibold">
                  Welcome Admin
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform dark:bg-black dark:border-gray-900 border-r border-gray-200  ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-black dark:border-gray-900">
          <ul className="space-y-2 font-medium">
            {/* Sidebar links */}
            <li>
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition duration-300 transform ${
                    isActive
                      ? "bg-[#B1D4E0] text-gray-900 dark:text-black"
                      : "text-gray-900 dark:text-white hover:bg-[#40A1CB] dark:hover:bg-[#005F7F] hover:scale-105"
                  }`
                }
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <FaHome className="w-5 h-5" color="black" />
                </div>
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-language"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition duration-300 transform ${
                    isActive
                      ? "bg-[#B1D4E0] text-gray-900 dark:text-black"
                      : "text-gray-900 dark:text-white hover:bg-[#40A1CB] dark:hover:bg-[#005F7F] hover:scale-105"
                  }`
                }
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <FaLanguage className="w-5 h-5" color="black" />
                </div>
                <span className="ms-3">Add Language</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-title"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition duration-300 transform ${
                    isActive
                      ? "bg-[#B1D4E0] text-gray-900 dark:text-black"
                      : "text-gray-900 dark:text-white hover:bg-[#40A1CB] dark:hover:bg-[#005F7F] hover:scale-105"
                  }`
                }
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <FaTint className="w-5 h-5" color="black" />
                </div>
                <span className="ms-3">Add Title</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-section-content"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition duration-300 transform ${
                    isActive
                      ? "bg-[#B1D4E0] text-gray-900 dark:text-black"
                      : "text-gray-900 dark:text-white hover:bg-[#40A1CB] dark:hover:bg-[#005F7F] hover:scale-105"
                  }`
                }
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <FaTextWidth className="w-5 h-5" color="black" />
                </div>
                <span className="ms-3">Add Content</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-addvertisement"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition duration-300 transform ${
                    isActive
                      ? "bg-[#B1D4E0] text-gray-900 dark:text-black"
                      : "text-gray-900 dark:text-white hover:bg-[#40A1CB] dark:hover:bg-[#005F7F] hover:scale-105"
                  }`
                }
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <FaAdversal className="w-5 h-5" color="black" />
                </div>
                <span className="ms-3">Add AdvertiseMent</span>
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center p-2 rounded-lg transition duration-300 transform text-gray-900 dark:text-white hover:bg-[#40A1CB] dark:hover:bg-[#005F7F] hover:scale-105"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <FaSignOutAlt className="w-5 h-5 text-black" />
                </div>
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default AdminNav;

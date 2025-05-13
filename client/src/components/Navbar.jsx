import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaMoon,
  FaSun,
  FaShoppingCart,
  FaGraduationCap,
  FaCode,
  FaMagic,
  FaChevronLeft,
  FaChevronRight,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import API from "../api";
import logo from "../assets/logo.jpg"
import {toast} from "react-hot-toast"
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [activeCourse, setActiveCourse] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const coursesRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await API.get("/api/language");
        const langs = res.data || [];
        setLanguages(langs);
        if (langs.length) setActiveCourse(langs[0].programmingLanguage);
      } catch (error) {
        console.error("Failed to fetch languages:", error);
      }
    };
    fetchLanguages();
  }, []);

  const scrollLeft = () =>
    coursesRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = () =>
    coursesRef.current?.scrollBy({ left: 200, behavior: "smooth" });

  return (
    <div className="w-full font-sans">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-2 bg-white dark:bg-gray-900 shadow dark:text-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="text-green-600 font-bold text-lg">SMStudy</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="border dark:border-gray-700 px-3 py-1 rounded-full text-sm outline-none bg-white dark:bg-gray-800 dark:text-white"
            />
            <FaSearch className="text-gray-600 dark:text-gray-300 cursor-pointer text-lg" />
            {darkMode ? (
              <FaSun
                onClick={() => setDarkMode(false)}
                className="text-yellow-400 cursor-pointer text-xl ml-2"
              />
            ) : (
              <FaMoon
                onClick={() => setDarkMode(true)}
                className="text-gray-600 cursor-pointer text-xl ml-2"
              />
            )}
            <div className="flex items-center gap-6 text-sm ml-6">
              <span className="flex items-center gap-1 cursor-pointer" onClick={()=> toast.success("Comming soon")}>
                <FaGraduationCap /> For Teachers
              </span>
              <button
                onClick={() => navigate("/register")}
                className="bg-green-500 text-white px-4 py-1 rounded-full hover:bg-green-600"
              >
                Register
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-green-100 text-green-800 px-4 py-1 rounded-full hover:bg-green-200"
              >
                Log in
              </button>
            </div>
          </div>

          <button
            className="md:hidden text-2xl p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 space-y-2">
          <div className="flex gap-4 mt-2">
            <button className="bg-green-500 text-white px-4 py-1 rounded-full">
              Sign Up
            </button>
            <button className="bg-green-100 text-green-800 px-4 py-1 rounded-full">
              Log in
            </button>
          </div>
        </div>
      )}

      {/* Only show courses strip on home or course page */}
      {(location.pathname === "/" || location.pathname.includes("/course")) && (
        <div className="sticky top-[56px] z-40 bg-gray-900 text-white py-2">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 z-10"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={coursesRef}
            className="overflow-x-auto whitespace-nowrap scroll-smooth px-10 hide-scrollbar"
          >
            {languages.map((lang) => (
              <Link
                key={lang._id}
                to={`/course/${lang.programmingLanguage}/title/${
                  lang.defaultContent || "intro"
                }`}
                className={`inline-block px-4 py-1 mr-2 text-sm rounded ${
                  activeCourse === lang.programmingLanguage
                    ? "bg-green-600"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => setActiveCourse(lang.programmingLanguage)}
              >
                {lang.programmingLanguage}
              </Link>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 z-10"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

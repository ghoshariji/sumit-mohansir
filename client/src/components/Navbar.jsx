import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMoon, FaSun, FaShoppingCart, FaGraduationCap, FaCode, FaMagic, FaChevronLeft, FaChevronRight, FaBars, FaTimes } from 'react-icons/fa';
import API from '../api/index';
import Sidebar from './Sidebar'; // Import Sidebar component
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [activeCourse, setActiveCourse] = useState('');
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const coursesRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Fetch languages
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await API.get('/api/language');
        console.log(res.data);
        const langs = res.data || [];
        setLanguages(langs);
        if (langs.length) {
          setActiveCourse(langs[0].programmingLanguage); // Set the first language as active
        }
      } catch (error) {
        console.error('Failed to fetch languages:', error);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    if (activeCourse) {
      const fetchTitles = async () => {
        try {
          const res = await API.get(`/api/title/${activeCourse}`);
          setTitles(res.data || []);
        } catch (error) {
          console.error('Failed to fetch titles:', error);
        }
      };
      fetchTitles();
    }
  }, [activeCourse]);

  const scrollLeft = () => coursesRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  const scrollRight = () => coursesRef.current?.scrollBy({ left: 200, behavior: 'smooth' });

  return (
    <div className="w-full font-sans">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-6 py-2 bg-white dark:bg-gray-900 shadow dark:text-white relative">
        <div className="flex items-center gap-4 md:gap-8">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <img src="/logo192.png" alt="Logo" className="h-8 w-8" />
            <span className="text-green-600 font-bold text-lg">Qstudy</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="border dark:border-gray-700 px-3 py-1 rounded-full text-sm outline-none bg-white dark:bg-gray-800 dark:text-white"
            />
            <FaSearch className="text-gray-600 dark:text-gray-300 cursor-pointer text-lg" />
            {darkMode ? (
              <FaSun onClick={() => setDarkMode(false)} className="text-yellow-400 cursor-pointer text-xl ml-2" />
            ) : (
              <FaMoon onClick={() => setDarkMode(true)} className="text-gray-600 cursor-pointer text-xl ml-2" />
            )}
            <div className="flex items-center gap-6 text-sm ml-6">
              <span className="flex items-center gap-1 cursor-pointer"><FaMagic className="text-purple-600" /> Plus</span>
              <span className="flex items-center gap-1 cursor-pointer"><FaCode className="text-purple-600" /> Spaces</span>
              <span className="flex items-center gap-1 cursor-pointer"><FaGraduationCap className="text-purple-600" /> For Teachers</span>
              <span className="flex items-center gap-1 cursor-pointer"><FaShoppingCart className="text-purple-600" /> Get Certified</span>
              <button className="bg-green-500 text-white px-4 py-1 rounded-full hover:bg-green-600" onClick={() => navigate('/register')}>Register</button>
              <button className="bg-green-100 text-green-800 px-4 py-1 rounded-full hover:bg-green-200" onClick={() => navigate('/login')}>Log in</button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-2xl p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 space-y-2">
          <span className="block cursor-pointer">Tutorials ▾</span>
          <span className="block cursor-pointer">Exercises ▾</span>
          <span className="block cursor-pointer">Certificates ▾</span>
          <span className="block cursor-pointer">Services ▾</span>
          <hr />
          <span className="flex items-center gap-2"><FaMagic className="text-purple-600" /> Plus</span>
          <span className="flex items-center gap-2"><FaCode className="text-purple-600" /> Spaces</span>
          <span className="flex items-center gap-2"><FaGraduationCap className="text-purple-600" /> For Teachers</span>
          <span className="flex items-center gap-2"><FaShoppingCart className="text-purple-600" /> Get Certified</span>
          <div className="flex gap-4 mt-2">
            <button className="bg-green-500 text-white px-4 py-1 rounded-full">Sign Up</button>
            <button className="bg-green-100 text-green-800 px-4 py-1 rounded-full">Log in</button>
          </div>
        </div>
      )}

      {/* Scrollable Courses Section */}
      <div className="relative bg-gray-900 text-white py-2">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 z-10"
        >
          <FaChevronLeft />
        </button>

        <div ref={coursesRef} className="overflow-x-auto whitespace-nowrap scroll-smooth px-10 hide-scrollbar">
          {languages.map(lang => (
            <Link
              to={`/course/${lang.programmingLanguage}`} // Navigate to a dynamic course route
              key={lang._id}
              onClick={() => setActiveCourse(lang.programmingLanguage)} // Update active course
              className={`inline-block px-4 py-1 mr-2 text-sm rounded ${activeCourse === lang.programmingLanguage ? 'bg-green-600' : 'hover:bg-gray-700'}`}
            >
              {lang.programmingLanguage}
            </Link>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 z-10"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Pass activeCourse to Sidebar */}
<Sidebar
  activeCourse={activeCourse}
  titles={titles}
  selectedTitle={selectedTitle}
  setSelectedTitle={setSelectedTitle}
/>

    </div>
  );
 
};

export default Navbar;

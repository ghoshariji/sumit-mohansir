import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Sidebar = ({ activeCourse, titles, selectedTitle, setSelectedTitle }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const selectedRef = useRef(null);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedTitle]);

  return (
    <>
      {/* Toggle button (mobile) */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-4 left-4 z-50 bg-green-500 text-white p-2 rounded shadow-lg md:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 fixed md:relative z-40 w-64 bg-[#f5f5f5] dark:bg-gray-800 p-4 border-r dark:border-gray-700 h-full flex flex-col overflow-hidden`}
      >
        {/* Header (mobile only) */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Topics</h2>
          <button
            onClick={() => setShowSidebar(false)}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable title list */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth pr-1 space-y-2">
          {titles.length > 0 &&
            titles.map((title) => (
              <button
                key={title._id}
                ref={selectedTitle === title.languageContent ? selectedRef : null}
                onClick={() => {
                  setSelectedTitle(title.languageContent);
                  navigate(`/course/${title.languageName}/title/${title.languageContent}`);
                  if (window.innerWidth < 768) setShowSidebar(false); // Auto-close on mobile
                }}
                className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 ${
                  selectedTitle === title.languageContent
                    ? 'bg-green-500 text-white'
                    : 'text-gray-800 dark:text-gray-200'
                }`}
              >
                {title.languageContent}
              </button>
            ))}
        </div>
      </div>

      {/* Backdrop for mobile */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
        />
      )}
    </>
  );
};

export default Sidebar;

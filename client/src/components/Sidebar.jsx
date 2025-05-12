import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeCourse, titles, selectedTitle, setSelectedTitle }) => {
  const navigate = useNavigate();
  
  console.log("Selected Course:", activeCourse);

  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-4 border-r dark:border-gray-700 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Topics</h2>

      {titles.map((title) => (
        <button
          key={title._id}
          onClick={() => {
            setSelectedTitle(title.languageContent);  // Set the selected title state
            navigate(`/course/${title.languageName}/title/${title.languageContent}`);  // Navigate with params
          }}
          className={`block w-full text-left px-3 py-2 mb-2 rounded hover:bg-green-100 dark:hover:bg-gray-700 ${
            selectedTitle === title.languageContent ? 'bg-green-500 text-white' : 'text-gray-800 dark:text-gray-200'
          }`}
        >
          {title.languageContent}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;

import React from 'react';
import Navbar from '../components/Navbar'; // Create a separate Navbar component if not already done
import Sidebar from '../components/Sidebar';
import MainContainer from '../pages/Courses/MainContainer';

const AppLayout = ({ selectedTitle, setSelectedTitle, selectedLanguageName, titles }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <Sidebar
          activeCourse={selectedLanguageName}
          titles={titles}
          selectedTitle={selectedTitle}
          setSelectedTitle={setSelectedTitle}
        />

        {/* Main content in the center */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <MainContainer selectedTitle={selectedTitle} selectedLanguageName={selectedLanguageName} />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

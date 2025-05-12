import React, { useState } from "react";
import Sidebar from "../../components/Sidebar"; 
import ContentDisplay from "./ContentDisplay";

const CourseLayout = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("c++"); // Default or selected language
  const [selectedSection, setSelectedSection] = useState(null); // Content selected from sidebar

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        selectedLanguage={selectedLanguage}
        onSelectSection={setSelectedSection}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">{selectedLanguage}</h1>
        {selectedSection ? (
          <ContentDisplay content={selectedSection} />
        ) : (
          <p className="text-gray-500">Select a section to begin learning.</p>
        )}
      </div>
    </div>
  );
};

export default CourseLayout;

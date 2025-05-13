import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import MainContainer from './MainContainer';
import API from '../../api/index';

const CoursePage = () => {
  const { languageName, languageContent } = useParams();
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(languageContent);
  const [activeCourse] = useState(languageName);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const res = await API.get(`/api/title/${languageName}`);
        console.log(res)
        setTitles(res.data || []);
      } catch (err) {
        console.error('Error fetching titles:', err);
      }
    };
    fetchTitles();
  }, [languageName]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Navbar (sticky at top) */}
      <div className="w-full bg-white text-black px-4 py-3 text-xl font-bold sticky top-0 z-50 shadow">
        Module : {languageName}
      </div>

      {/* Main Layout (Sidebar + Main Content) */}
      <div className="flex  h-[calc(100vh-56px)]">
        <Sidebar
          activeCourse={activeCourse}
          titles={titles}
          selectedTitle={selectedTitle}
          setSelectedTitle={setSelectedTitle}
        />
        <div className="flex-grow overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900 p-4">
          <MainContainer
            languageName={languageName}
            languageContent={selectedTitle}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;

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
        setTitles(res.data || []);
      } catch (err) {
        console.error('Error fetching titles:', err);
      }
    };
    fetchTitles();
  }, [languageName]);

  return (
    <div className="flex h-screen">
      <Sidebar
        activeCourse={activeCourse}
        titles={titles}
        selectedTitle={selectedTitle}
        setSelectedTitle={setSelectedTitle}
      />
      <div className="flex-grow overflow-y-auto">
        <MainContainer />
      </div>
    </div>
  );
};

export default CoursePage;

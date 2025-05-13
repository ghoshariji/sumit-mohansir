import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion'; // 👈 Import framer-motion
import Sidebar from '../../components/Sidebar';
import MainContainer from './MainContainer';
import AdvertisementSidebar from '../../components/Advertisment';
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
    <motion.div 
      className="flex flex-col h-full overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* Navbar */}
      <motion.div
        className="w-full bg-white text-black px-4 py-3 text-xl font-bold sticky top-0 z-50 shadow"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Module : {languageName}
      </motion.div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-56px)]">
        {/* Left Sidebar */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Sidebar
            activeCourse={activeCourse}
            titles={titles}
            selectedTitle={selectedTitle}
            setSelectedTitle={setSelectedTitle}
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="flex-grow overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <MainContainer
            languageName={languageName}
            languageContent={selectedTitle}
          />
        </motion.div>

        {/* Advertisement Sidebar */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <AdvertisementSidebar />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CoursePage;

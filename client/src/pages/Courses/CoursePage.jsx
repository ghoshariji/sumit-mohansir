import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CoursePage = () => {
  const { language } = useParams();
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/title/by-language/${language}`)
      .then((res) => setTitles(res.data))
      .catch((err) => console.error('Failed to load titles:', err));
  }, [language]);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Titles for {language}</h2>
      <div className="flex flex-wrap gap-2">
        {titles.map((title) => (
          <Link
            to={`/course/${language}/${title.languageContent}`}
            key={title._id}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {title.languageContent}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;

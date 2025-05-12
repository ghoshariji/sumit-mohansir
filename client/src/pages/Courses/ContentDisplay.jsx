import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ContentDisplay from './ContentDisplay';

const ContentPage = () => {
  const { language, title } = useParams();
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/section/content/by-language`, {
        params: { selectedLanguageName: language, selectedTitle: title },
      })
      .then((res) => setContents(res.data))
      .catch((err) => console.error('Failed to load content:', err));
  }, [language, title]);

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">‹ Home</button>
        <h1 className="text-3xl font-bold">{language} Tutorial</h1>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Next ›</button>
      </div>

      {contents.map((c) => (
        <ContentDisplay
          key={c._id}
          heading={c.heading || ''}
          paragraphs={c.contentText.split('\n').filter(Boolean)}
          buttonLabel={c.buttonLabel}
        />
      ))}
    </div>
  );
};

export default ContentPage;

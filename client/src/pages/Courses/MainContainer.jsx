import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/index';

const MainContainer = ({ languageName, languageContent }) => {
  const [contentText, setContentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  const fetchContent = async () => {
    try {
      const res = await API.get(
        `/api/section/content/by-language/${encodeURIComponent(languageName)}/${encodeURIComponent(languageContent)}`
      );
      setContentText(res.data.contentText || '');
      setError('');
    } catch (err) {
      setError('Failed to load content.');
    } finally {
      setLoading(false);
    }
  };

  setLoading(true); // add this so new click shows loading state again
  fetchContent();
}, [languageName, languageContent]);


  if (loading) return <div className="p-6 text-lg">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="w-full p-6 pt-20 md:pt-6 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">{languageContent}</h2>
     <div
  className="prose max-w-none content-container text-lg leading-relaxed"
  dangerouslySetInnerHTML={{ __html: contentText }}
/>

    </div>
  );
};

export default MainContainer;

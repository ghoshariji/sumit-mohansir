import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/index';

const MainContainer = () => {
  const { languageName, languageContent } = useParams();
  const [contentText, setContentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await API.get(
          `/api/section/content/by-language/${encodeURIComponent(languageName)}/${encodeURIComponent(languageContent)}`
        );
        console.log('Fetched Content:', res.data);
        setContentText(res.data.contentText || '');
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [languageName, languageContent]);

  if (loading) return <div className="p-6 text-lg">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="w-full p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900 h-screen">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">{languageContent}</h2>
      <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
        {contentText}
      </p>
    </div>
  );
};

export default MainContainer;

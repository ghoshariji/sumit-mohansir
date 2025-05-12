import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/index';

const MainContainer = () => {
  const { languageName, languageContent } = useParams();  // Extract parameters from the URL
  const [contentText, setContentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  console.log("Language Name:", languageName);  // Debugging log
  console.log("Language Content:", languageContent);  // Debugging log

  useEffect(() => {
    if (languageName && languageContent) {
      const fetchContent = async () => {
        try {
          const res = await API.get(`/api/section/content/by-language/${languageName}/${languageContent}`);
          setContentText(res.data.contentText);  // Set content from API
        } catch (err) {
          setError('Error fetching content');
        } finally {
          setLoading(false);
        }
      };
      fetchContent();
    }
  }, [languageName, languageContent]);  // Re-run when either languageName or languageContent changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="main-container">
      <h2 className="text-xl font-bold mb-4">Content for {languageContent}</h2>
      <p>{contentText}</p>
    </div>
  );
};

export default MainContainer;

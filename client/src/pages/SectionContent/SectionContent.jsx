// SectionContent.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/index';

const SectionContent = () => {
  const { courseName, sectionTitle } = useParams();
  const [contentItems, setContentItems] = useState([]);

  useEffect(() => {
    const fetchSection = async () => {
      const res = await API.get('/api/language');
      const lang = res.data.find(l => l.programmingLanguage === courseName);
      const section = lang?.sections.find(s => s.sectionTitle === sectionTitle);
      setContentItems(section?.contentItems || []);
    };
    fetchSection();
  }, [courseName, sectionTitle]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">{sectionTitle}</h1>
      {contentItems.map((item, idx) => (
        <div key={idx} className="mb-4">
          {item.title && <h2 className="text-lg font-semibold">{item.title}</h2>}
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default SectionContent;

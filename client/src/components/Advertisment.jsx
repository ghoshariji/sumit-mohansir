import React, { useEffect, useState } from 'react';
import  API from '../api/index';
const AdvertisementSidebar = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await API.get('/api/add/media');
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 p-4 h-full hidden lg:block border-l dark:border-gray-700 sticky top-[56px] overflow-y-auto">
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Sponsored</h3>
      <div className="space-y-4">
        {ads.map((ad, index) => (
          <div key={index} className="bg-white dark:bg-gray-700 p-3 rounded shadow text-sm text-gray-800 dark:text-gray-200">
            <p className="font-semibold mb-2">{ad.description}</p>
            
            {ad.mediaType === 'image' ? (
              <img
                src={`/api/add/media/${ad._id}`} // This requires a route to serve media
                alt="Ad"
                className="w-full h-auto rounded"
              />
            ) : ad.mediaType === 'video' ? (
              <video controls className="w-full rounded">
                <source src={`/api/add/media/${ad._id}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisementSidebar;

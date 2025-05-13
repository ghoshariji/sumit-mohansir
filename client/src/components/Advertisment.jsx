import React, { useEffect, useState } from "react";
import API from "../api/index";

const AdvertisementSidebar = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await API.get("/api/add/media");
        const ads = response.data;

        if (ads.length === 0) return;

        // Get the latest ad based on createdAt
        const latestAd = ads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

        if (latestAd.media && latestAd.media.data && latestAd.media.contentType) {
          const uint8Array = new Uint8Array(latestAd.media.data.data);
          const blob = new Blob([uint8Array], { type: latestAd.media.contentType });
          const mediaUrl = URL.createObjectURL(blob);
          setAds([{ ...latestAd, mediaUrl }]);
        } else {
          setAds([{ ...latestAd, mediaUrl: null }]);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 p-4 h-full hidden lg:block border-l dark:border-gray-700 sticky top-[56px] overflow-y-auto">
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
        Sponsored
      </h3>
      <div className="space-y-4">
        {ads.map((ad, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-700 p-3 rounded shadow text-sm text-gray-800 dark:text-gray-200"
          >
            {ad.mediaUrl && ad.mediaType === "image" ? (
              <img
                src={ad.mediaUrl}
                alt="Advertisement"
                className="w-full h-auto rounded mb-2"
              />
            ) : (
              <p>No media available</p>
            )}
            <p>{ad.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisementSidebar;

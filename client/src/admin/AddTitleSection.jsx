import React, { useEffect, useState } from "react";
import AdminNav from "./AdminSidebar";
import { toast } from "react-hot-toast";

const AddTitleSection = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState("");
  const [sectionTitle, setSectionTitle] = useState("");

  // Fetch all languages on mount
  const fetchLanguages = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/api/language`);
      const data = await res.json();
      setLanguages(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load languages");
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  // Add section to selected language
  const handleAddSection = async (e) => {
    e.preventDefault();
    if (!selectedLanguageId || !sectionTitle.trim()) {
      toast.error("Language and Section Title are required");
      return;
    }

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_SERVER
        }/api/title`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({languageName:selectedLanguageId, languageContent:sectionTitle }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Section added");
        setSectionTitle("");
      } else {
        toast.error(data.message || "Error adding section");
      }
    } catch (err) {
      toast.error("Server error while adding section");
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="lg:ml-64 p-6 mt-16 text-white  min-h-screen">
        <h2 className="text-2xl font-bold text-black mb-6">Add Title</h2>

        <form className="space-y-6">
          {/* Select Programming Language */}
          <div>
            <label className="block text-black mb-2">Select Language</label>
            <select
              className="w-full p-3 rounded text-black border border-black"
              value={selectedLanguageId}
              onChange={(e) => setSelectedLanguageId(e.target.value)}
            >
              <option value="">-- Select Language --</option>
              {languages.map((lang) => (
                <option key={lang._id} value={lang.programmingLanguage  }>
                  {lang.programmingLanguage}
                </option>
              ))}
            </select>
          </div>

          {/* Add Section */}
          <div>
            <label className="block text-black mb-2">Section Title</label>
            <input
              type="text"
              className="w-full p-3 rounded  text-black border border-black"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="e.g., Java Introduction"
            />
            <button
              onClick={handleAddSection}
              className="mt-3 bg-black  text-white px-4 py-2 rounded"
            >
              Add Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTitleSection;

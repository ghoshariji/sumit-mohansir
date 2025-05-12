import React, { useEffect, useState } from "react";
import AdminNav from "./AdminSidebar";
import { toast } from "react-hot-toast";

const AddContentSection = () => {
  const [languages, setLanguages] = useState([]);
  const [titles, setTitles] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [selectedLanguageName, setSelectedLanguageName] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [contentText, setContentText] = useState("");

  // Fetch all programming languages
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

  // Fetch all titles
  const fetchTitles = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/api/title`);
      const data = await res.json();
      setTitles(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load sections");
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchLanguages();
    fetchTitles();
  }, []);

  // Filter titles based on selected language
  useEffect(() => {
    if (selectedLanguageName) {
      const matched = titles.filter(
        (t) => t.languageName === selectedLanguageName
      );

      // Optional: remove duplicate section names
      // const uniqueMatched = Array.from(
      //   new Map(matched.map((item) => [item.languageContent, item])).values()
      // );
      // setFilteredTitles(uniqueMatched);

      setFilteredTitles(matched);

      console.log(
        "Filtered sections for language:",
        selectedLanguageName,
        matched
      );
    } else {
      setFilteredTitles([]);
    }
    setSelectedTitle("");
  }, [selectedLanguageName, titles]);

  // Handle form submission
  const handleAddContent = async (e) => {
    e.preventDefault();

    if (!selectedLanguageName || !selectedTitle || !contentText.trim()) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER}/api/section/content`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            selectedLanguageName,
            selectedTitle, // This is the selected section (languageContent)
            contentText,
          }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        toast.success("Content added successfully!");
        setContentText("");
        setSelectedTitle("");
        setSelectedLanguageName("");
        setFilteredTitles([]);
      } else {
        toast.error(result.message || "Failed to add content");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="lg:ml-64 p-6 mt-16 text-white min-h-screen">
        <h2 className="text-2xl text-black font-bold mb-6">
          Add Content Section
        </h2>

        <form onSubmit={handleAddContent} className="space-y-5">
          {/* Language Dropdown */}
          <div>
            <label className="block mb-1 text-black font-bold">
              Select Language
            </label>
            <select
              value={selectedLanguageName}
              onChange={(e) => setSelectedLanguageName(e.target.value)}
              className="w-full p-2 rounded text-black border border-black"
            >
              <option value="">-- Select --</option>
              {languages.map((lang) => (
                <option key={lang._id} value={lang.programmingLanguage}>
                  {lang.programmingLanguage}
                </option>
              ))}
            </select>
          </div>

          {/* Section Dropdown */}
          <div>
            <label className="block mb-1 text-black font-bold">
              Select Section
            </label>
            <select
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
              className="w-full p-2 rounded text-black border border-black"
              disabled={!filteredTitles.length}
            >
              <option value="">-- Select --</option>
              {filteredTitles.map((title) => (
                <option key={title._id} value={title.languageContent}>
                  {title.languageContent}
                </option>
              ))}
            </select>
          </div>

          {/* Content Textarea */}
          <div>
            <label className="block mb-1 text-black font-bold">Content</label>
            <textarea
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              rows={5}
              className="w-full p-2 rounded text-black border border-black"
              placeholder="Enter content..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Content
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContentSection;

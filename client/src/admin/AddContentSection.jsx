import React, { useEffect, useState, useRef } from "react";
import AdminNav from "./AdminSidebar";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const AddContentSection = () => {
  const [languages, setLanguages] = useState([]);
  const [titles, setTitles] = useState([]);
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [selectedLanguageName, setSelectedLanguageName] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");

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

  useEffect(() => {
    fetchLanguages();
    fetchTitles();
  }, []);

  useEffect(() => {
    if (selectedLanguageName) {
      const matched = titles.filter(
        (t) => t.languageName === selectedLanguageName
      );
      setFilteredTitles(matched);
    } else {
      setFilteredTitles([]);
    }
    setSelectedTitle("");
  }, [selectedLanguageName, titles]);

  const handleAddContent = async (e) => {
    e.preventDefault();

    if (!selectedLanguageName || !selectedTitle || !editorContent.trim()) {
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
            selectedTitle,
            contentText: editorContent,
          }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        toast.success("Content added successfully!");
        setEditorContent(""); // Clear content after successful submission
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

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image'],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      ['blockquote', 'code-block'],
      ['clean']
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminNav />
      <div className="lg:ml-64 p-8 mt-16 text-gray-800">
        <h2 className="text-4xl text-gray-900 font-extrabold mb-8">Add Content Section</h2>

        <form onSubmit={handleAddContent} className="space-y-6 bg-white shadow-lg rounded-lg p-8">
          {/* Language Dropdown */}
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">Select Language</label>
            <select
              value={selectedLanguageName}
              onChange={(e) => setSelectedLanguageName(e.target.value)}
              className="w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300"
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
            <label className="block mb-2 text-lg font-semibold text-gray-700">Select Section</label>
            <select
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
              className="w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300"
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

          {/* Quill Editor */}
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">Content</label>
            <ReactQuill
              value={editorContent}
              onChange={setEditorContent}
              modules={modules}
              className="w-full min-h-[200px] p-4 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
          type="submit"
          className="px-6 py-2 text-white bg-gradient-to-r from-sky-500 to-sky-700 rounded-lg shadow-lg hover:from-sky-600 hover:to-sky-800 focus:ring-4 focus:ring-blue-300 transition duration-300 text-sm font-semibold mx-auto block"
        >
          Add Content
        </button>
        
        </form>
      </div>
    </div>
  );
};

export default AddContentSection;

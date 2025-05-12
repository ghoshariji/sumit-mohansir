import React, { useEffect, useState } from "react";
import AdminNav from "./AdminSidebar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";

const AdminLanguage = () => {
  const [languages, setLanguages] = useState([]);
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchLanguages = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/api/language`);
      const data = await res.json();
      setLanguages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    if (!programmingLanguage.trim()) {
      toast.error("Language name cannot be empty!");
      return;
    }

    try {
      const url = editingId
        ? `${import.meta.env.VITE_SERVER}/api/language/${editingId}`
        : `${import.meta.env.VITE_SERVER}/api/language`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ programmingLanguage }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Language ${editingId ? "updated" : "added"}!`);
        setProgrammingLanguage("");
        setEditingId(null);
        fetchLanguages();
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Server error.");
      console.error(error);
    }
  };

  const handleEdit = (language) => {
    setProgrammingLanguage(language.programmingLanguage);
    setEditingId(language._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this language?"))
      return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER}/api/language/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Language deleted.");
        fetchLanguages();
      } else {
        toast.error(data.message || "Delete failed.");
      }
    } catch (error) {
      toast.error("Server error.");
    }
  };

  return (
    <div className="min-h-screen text-white">
      <AdminNav />
      <div className="lg:ml-64 p-6 mt-16">
        <h2 className="text-2xl font-semibold text-black mb-6 border-b pb-2">
          Manage Languages
        </h2>

        {/* Add / Edit Form */}
        <form
          onSubmit={handleAddOrUpdate}
          className="mb-8 flex flex-col md:flex-row gap-4 md:items-end"
        >
          <input
            type="text"
            className="p-3 rounded border border-gray-600 w-full md:w-1/2 text-black"
            placeholder="Enter programming language"
            value={programmingLanguage}
            onChange={(e) => setProgrammingLanguage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-300 transition-all"
          >
            {editingId ? "Update Language" : "Add Language"}
          </button>
        </form>

        {/* Language List */}
        <div className="overflow-x-auto">
          <table className="w-full rounded shadow-md">
            <thead>
              <tr className="text-left text-black border-b border-gray-700">
                <th className="p-4">#</th>
                <th className="p-4">Programming Language</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {languages.map((lang, index) => (
                <tr
                  key={lang._id}
                  className="border-b border-gray-800 hover:bg-gray-200"
                >
                  <td className="p-4 text-black">{index + 1}.</td>
                  <td className="p-4 text-black">{lang.programmingLanguage}</td>
                  <td className="p-4 flex gap-4">
                    <button
                      onClick={() => handleEdit(lang)}
                      className="text-yellow-400 hover:text-yellow-300"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(lang._id)}
                      className="text-red-500 hover:text-red-400"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {languages.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No languages added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLanguage;

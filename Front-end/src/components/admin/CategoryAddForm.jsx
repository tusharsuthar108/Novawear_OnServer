import React, { useState } from "react";
import { X, Save, Upload } from "lucide-react";

const CategoryAddForm = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    masterCategory: "",
    description: "",
    status: "Active",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const masterCategories = [
    "Clothing",
    "Accessories",
    "Footwear",
    "Electronics",
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.masterCategory) {
      alert("Please select a master category");
      return;
    }
    onSave(formData);
    setFormData({
      name: "",
      masterCategory: "",
      description: "",
      status: "Active",
      image: null,
    });
    setPreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* 1. Set max height and flex-col on the container */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* FIXED HEADER (shrink-0 prevents it from squashing) */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Add New Category</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 2. SCROLLABLE FORM BODY */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter category name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Master Category *
              </label>
              <select
                required
                value={formData.masterCategory}
                onChange={(e) =>
                  setFormData({ ...formData, masterCategory: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select Master Category</option>
                {masterCategories.map((master) => (
                  <option key={master} value={master}>
                    {master}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors group">
                  <Upload size={18} className="text-slate-400 group-hover:text-indigo-500" />
                  <span className="text-sm text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
                    {formData.image ? formData.image.name : "Upload from Computer"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {preview && (
                  <div className="w-12 h-12 rounded-lg border border-slate-200 overflow-hidden shrink-0 shadow-sm">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                placeholder="Enter category description"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* 3. FIXED FOOTER (bg-white and shrink-0 keeps it at the bottom) */}
          <div className="p-6 border-t border-slate-100 flex gap-3 bg-white shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200 font-medium"
            >
              <Save size={18} />
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryAddForm;
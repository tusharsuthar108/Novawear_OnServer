import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Save,
  Upload,
  Check,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

const CategoryEdit = ({
  isOpen,
  onClose,
  onSave,
  categoryData,
  masterCategories = [],
}) => {
  const fileInputRef = useRef(null);

  const initialState = {
    name: "",
    slug: "",
    master_category_id: "",
    is_active: true,
    description: "",
    image: null,
    imagePreview: "",
  };

  const [formData, setFormData] = useState(initialState);

  /* ================= POPULATE DATA ================= */
  useEffect(() => {
    if (categoryData) {
      setFormData({
        name: categoryData.name || "",
        slug: categoryData.slug || "",
        master_category_id: categoryData.master_category_id || "",
        is_active: categoryData.is_active ?? true,
        description: categoryData.description || "",
        image: null,
        imagePreview: categoryData.image_url || "",
      });
    }
  }, [categoryData]);

  /* ================= CLEAN IMAGE PREVIEW ================= */
  useEffect(() => {
    return () => {
      if (formData.imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [formData.imagePreview]);

  /* ================= RESET ON CLOSE ================= */
  useEffect(() => {
    if (!isOpen) setFormData(initialState);
  }, [isOpen]);

  if (!isOpen || !categoryData) return null;

  /* ================= IMAGE HANDLER ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.master_category_id) {
      alert("Category name and Master Category are required");
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("slug", formData.slug);
    payload.append("master_category_id", formData.master_category_id);
    payload.append("description", formData.description);
    payload.append("is_active", formData.is_active);

    // Only send image if user selected a new one
    if (formData.image) {
      payload.append("image", formData.image);
    }

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden border flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        {/* HEADER */}
        <div className="px-8 py-6 border-b flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Edit Category
            </h2>
            <p className="text-slate-500 text-xs">
              Update category details
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 text-slate-400 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <form id="categoryEditForm" onSubmit={handleSubmit} className="space-y-6">
            {/* NAME */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Category Name
              </label>
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full mt-2 px-4 py-3 bg-slate-50 border rounded-2xl"
              />
            </div>

            {/* SLUG */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Slug
              </label>
              <input
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full mt-2 px-4 py-3 bg-slate-50 border rounded-2xl"
              />
            </div>

            {/* MASTER CATEGORY */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Master Category
              </label>
              <div className="relative mt-2">
                <select
                  required
                  value={formData.master_category_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      master_category_id: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-50 border rounded-2xl appearance-none"
                >
                  <option value="">Select master category</option>
                  {masterCategories.map((m) => (
                    <option
                      key={m.master_category_id}
                      value={m.master_category_id}
                    >
                      {m.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* STATUS */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Status
              </label>
              <div className="flex mt-2 bg-slate-100 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, is_active: true })
                  }
                  className={`flex-1 py-2 rounded-xl ${
                    formData.is_active && "bg-white shadow text-indigo-600"
                  }`}
                >
                  <Check size={16} /> Active
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, is_active: false })
                  }
                  className={`flex-1 py-2 rounded-xl ${
                    !formData.is_active && "bg-white shadow"
                  }`}
                >
                  <AlertCircle size={16} /> Inactive
                </button>
              </div>
            </div>

            {/* IMAGE */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Category Image
              </label>
              <div
                onClick={() => fileInputRef.current.click()}
                className="mt-2 border-2 border-dashed rounded-3xl p-4 cursor-pointer bg-slate-50 text-center"
              >
                {formData.imagePreview ? (
                  <img
                    src={formData.imagePreview}
                    className="h-40 mx-auto object-contain rounded-xl"
                  />
                ) : (
                  <>
                    <Upload className="mx-auto text-slate-400" />
                    <p className="text-xs mt-2 text-slate-500">
                      Click to upload image
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full mt-2 px-4 py-3 bg-slate-50 border rounded-2xl"
              />
            </div>
          </form>
        </div>

        {/* FOOTER */}
        <div className="px-8 py-6 bg-slate-50 border-t flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border rounded-2xl py-3"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="categoryEditForm"
            className="flex-[2] bg-indigo-600 text-white rounded-2xl py-3 flex items-center justify-center gap-2"
          >
            <Save size={18} /> Update Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryEdit;

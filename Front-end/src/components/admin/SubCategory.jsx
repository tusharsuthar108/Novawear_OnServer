import React, { useState } from 'react';
import { 
  Eye, Edit3, Trash2, Plus, 
  Search, Filter, Folder, Layers, CheckCircle
} from 'lucide-react';
// Import your modal component
import SubCategoryAdd from './SubCategoryAdd';

const SubCategory = () => {
  // --- STATE FOR MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample Data for Sub-Categories
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Smartphones",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop",
      directory: "Electronics / Smartphones",
      description: "Latest mobile devices and high-end smartphones.",
      status: "Active"
    },
    {
      id: 2,
      name: "Kitchenware",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=80&h=80&fit=crop",
      directory: "Home Appliances / Kitchenware",
      description: "Modern kitchen tools and essential cookware.",
      status: "Active"
    }
  ]);

  // Data needed for the Modal's Master Category dropdown
  const [masterCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Home Appliances" },
    { id: 3, name: "Fashion" }
  ]);

  // Logic to calculate totals
  const totalCategories = categories.length;
  const activeCategories = categories.filter(cat => cat.status === 'Active').length;

  // --- SAVE LOGIC ---
  const handleSaveSubCategory = (formData) => {
    // Find the Master Category name to build the directory string
    const masterName = masterCategories.find(m => m.id === parseInt(formData.masterCategoryId))?.name || "General";

    const newEntry = {
      id: categories.length + 1,
      name: formData.name,
      image: formData.imagePreview || "https://via.placeholder.com/80",
      directory: `${masterName} / ${formData.name}`,
      description: formData.description,
      status: formData.status
    };

    setCategories([...categories, newEntry]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sub-Categories</h1>
          <p className="text-slate-500 text-sm mt-1">Organize and manage your secondary product levels</p>
        </div>
        {/* Trigger Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 font-semibold text-sm"
        >
          <Plus size={18} />
          <span>New Sub-Category</span>
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total</p>
            <h3 className="text-2xl font-bold text-slate-900">{totalCategories}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active</p>
            <h3 className="text-2xl font-bold text-slate-900">{activeCategories}</h3>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search sub-categories..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[13px] uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Category Details</th>
                <th className="px-6 py-4 font-semibold">Directory</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm leading-tight">{cat.name}</span>
                        <span className="text-[11px] text-slate-400 font-semibold tracking-wider mt-1">ID: #SC-00{cat.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 bg-slate-100/50 w-fit px-2 py-1 rounded-md text-sm">
                      <Folder size={14} className="text-slate-400" />
                      <span className="font-medium text-slate-600">{cat.directory}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-500 max-w-xs truncate" title={cat.description}>
                      {cat.description}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                      ${cat.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                      {cat.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View"><Eye size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Edit"><Edit3 size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500 font-medium tracking-tight">
            Showing <span className="text-slate-900 font-bold">{totalCategories}</span> entries
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors">Prev</button>
            <button className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* MODAL INTEGRATION */}
      <SubCategoryAdd 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveSubCategory}
        masterCategories={masterCategories}
      />
    </div>
  );
};

export default SubCategory;
import React, { useState } from 'react';
import { 
  Eye, Edit3, Trash2, Plus, 
  Search, Filter, Folder, Layers, CheckCircle
} from 'lucide-react';
// Import the Modal we discussed
import SubSubCategoryAdd from './SubSubCategoryAdd';

const SubSubCategory = () => {
  // --- Logic to handle Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample Data for Level 3
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Android Phones",
      image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbab?w=80&h=80&fit=crop",
      directory: "Electronics / Mobiles / Android",
      description: "All brands of Android smartphones and tablets.",
      status: "Active"
    }
  ]);

  // Data required for the Modal selections
  const [masterCategories] = useState([{ id: 1, name: "Electronics" }, { id: 2, name: "Home" }]);
  const [parentCategories] = useState([{ id: 10, masterId: 1, name: "Mobiles" }, { id: 20, masterId: 2, name: "Kitchen" }]);
  const [subCategories] = useState([{ id: 100, categoryId: 10, name: "Android" }, { id: 200, categoryId: 20, name: "Fryers" }]);

  // Logic to calculate totals
  const totalCategories = categories.length;
  const activeCategories = categories.filter(cat => cat.status === 'Active').length;

  // --- Handle Save from Modal ---
  const handleSave = (formData) => {
    const mName = masterCategories.find(m => m.id === parseInt(formData.masterId))?.name;
    const cName = parentCategories.find(c => c.id === parseInt(formData.categoryId))?.name;
    const sName = subCategories.find(s => s.id === parseInt(formData.subCategoryId))?.name;

    const newEntry = {
      id: categories.length + 1,
      name: formData.name,
      image: formData.imagePreview || "https://via.placeholder.com/80",
      directory: `${mName} / ${cName} / ${sName}`,
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
          <h1 className="text-2xl font-bold text-slate-900">Sub-Sub Categories</h1>
          <p className="text-slate-500 text-sm mt-1">Manage the third level of your product hierarchy</p>
        </div>
        {/* Triggering the Modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 font-semibold text-sm"
        >
          <Plus size={18} />
          <span>New Sub-Sub Category</span>
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
            placeholder="Search sub-sub categories..." 
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
                        <span className="text-[11px] text-slate-400 font-semibold tracking-wider mt-1">ID: #SSC-00{cat.id}</span>
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
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Eye size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"><Edit3 size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Integration */}
      <SubSubCategoryAdd 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
        masterCategories={masterCategories}
        categories={parentCategories}
        subCategories={subCategories}
      />
    </div>
  );
};

export default SubSubCategory;
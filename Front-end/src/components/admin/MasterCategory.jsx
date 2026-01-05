import React, { useState } from 'react';
import { 
  Eye, Edit3, Trash2, Plus, 
  Search, Filter, Folder, Layers, CheckCircle
} from 'lucide-react';
import MasterCategoryAdd from './MasterCategoryAdd';

const MasterCategory = () => {
  // State to manage the categories list
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=80&h=80&fit=crop",
      directory: "Products",
      description: "All kinds of electronic devices and tech accessories.",
      status: "Active"
    },
    {
      id: 2,
      name: "Home Appliances",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=80&h=80&fit=crop",
      directory: "Home",
      description: "Smart kitchen tools, refrigerators, and washing machines.",
      status: "Inactive"
    },
    {
      id: 3,
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=80&h=80&fit=crop",
      directory: "Apparel",
      description: "Clothing, footwear, and accessories for all seasons.",
      status: "Active"
    }
  ]);

  // State to manage Modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Logic to calculate totals
  const totalCategories = categories.length;
  const activeCategories = categories.filter(cat => cat.status === 'Active').length;

  // Function to add new category from the modal
  const handleSaveCategory = (newCategory) => {
    const categoryWithId = {
      ...newCategory,
      id: categories.length + 1 // Simple ID generation
    };
    setCategories([...categories, categoryWithId]);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Master Categories</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and organize your product hierarchy</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 font-semibold text-sm"
        >
          <Plus size={18} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Categories</p>
            <h3 className="text-2xl font-bold text-slate-900">{totalCategories}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Categories</p>
            <h3 className="text-2xl font-bold text-slate-900">{activeCategories}</h3>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search categories..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[13px] uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Category</th>
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
                        src={cat.image || "https://via.placeholder.com/80"} 
                        alt={cat.name} 
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm leading-tight">{cat.name}</span>
                        <span className="text-[11px] text-slate-400 font-semibold tracking-wider mt-0.5">ID: #00{cat.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2 bg-slate-100/50 w-fit px-2 py-1 rounded-md">
                      <Folder size={14} className="text-slate-400" />
                      <span className="font-medium text-slate-600">{cat.directory || "Uncategorized"}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-500 max-w-xs truncate" title={cat.description}>
                      {cat.description || "No description provided."}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide
                      ${cat.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                      {cat.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                        <Edit3 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500 font-medium">Showing {totalCategories} categories</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-slate-200 rounded-lg bg-white text-slate-600 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 text-sm border border-slate-200 rounded-lg bg-white text-slate-600">Next</button>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <MasterCategoryAdd 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveCategory}
      />
    </div>
  );
};

export default MasterCategory;
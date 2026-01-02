import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import CategoryAddForm from './CategoryAddForm';

const MasterCategory = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Clothing', description: 'All clothing items', status: 'Active', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=80' },
    { id: 2, name: 'Accessories', description: 'Fashion accessories', status: 'Active', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=80' },
    { id: 3, name: 'Footwear', description: 'Shoes and sandals', status: 'Active', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80' },
    { id: 4, name: 'Electronics', description: 'Tech accessories', status: 'Inactive', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=80' },
  ]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const handleAddCategory = (newCategory) => {
    const category = {
      id: categories.length + 1,
      ...newCategory,
      items: 0
    };
    setCategories([...categories, category]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Master Categories</h2>
          <p className="text-slate-500">Manage your product categories</p>
        </div>
        <button 
          onClick={() => setIsAddFormOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Category Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="font-semibold text-slate-800">{category.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-600">{category.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      category.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-indigo-50">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Category Card */}
      <div 
        onClick={() => setIsAddFormOpen(true)}
        className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center hover:border-indigo-300 transition-colors cursor-pointer"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Plus size={24} className="text-indigo-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Add New Category</h3>
        <p className="text-slate-500">Create a new master category for your products</p>
      </div>

      {/* Add Category Form Modal */}
      <CategoryAddForm 
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSave={handleAddCategory}
      />
    </div>
  );
};

export default MasterCategory;
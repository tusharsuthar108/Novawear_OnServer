import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import CategoryAddForm from './CategoryAddForm';

const Category = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Men's Clothing", masterCategory: 'Clothing', description: "All men's apparel", status: 'Active', image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=80' },
    { id: 2, name: "Women's Clothing", masterCategory: 'Clothing', description: "All women's apparel", status: 'Active', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=80' },
    { id: 3, name: 'Bags', masterCategory: 'Accessories', description: 'Handbags and backpacks', status: 'Active', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80' },
    { id: 4, name: 'Jewelry', masterCategory: 'Accessories', description: 'Rings, necklaces, earrings', status: 'Active', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80' },
    { id: 5, name: 'Sneakers', masterCategory: 'Footwear', description: 'Casual and sports shoes', status: 'Active', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80' },
    { id: 6, name: 'Formal Shoes', masterCategory: 'Footwear', description: 'Business and dress shoes', status: 'Inactive', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=80' },
  ]);

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  
  // 1. Added Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaster, setSelectedMaster] = useState('');

  const masterCategories = ['Clothing', 'Accessories', 'Footwear', 'Electronics'];

  const handleAddCategory = (newCategory) => {
    const category = {
      id: Date.now(), // Unique ID
      ...newCategory
    };
    setCategories([...categories, category]);
  };

  // 2. Combined Filtering Logic
  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         cat.masterCategory.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMaster = selectedMaster === '' || cat.masterCategory === selectedMaster;
    
    return matchesSearch && matchesMaster;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Categories</h2>
          <p className="text-slate-500">Manage categories under master categories</p>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          {/* 3. Updated Filter Dropdown */}
          <select 
            value={selectedMaster}
            onChange={(e) => setSelectedMaster(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-w-[200px]"
          >
            <option value="">All Master Categories</option>
            {masterCategories.map(master => (
              <option key={master} value={master}>{master}</option>
            ))}
          </select>

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
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Category Path</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                          <img 
                            src={category.image instanceof File ? URL.createObjectURL(category.image) : category.image} 
                            alt={category.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="font-semibold text-slate-800">{category.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {/* 4. Hierarchical Path Display */}
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600 text-sm font-medium">
                          {category.masterCategory}
                        </span>
                        <span className="text-slate-600">/</span>
                        <span className="text-slate-600 text-sm font-medium">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600 text-sm line-clamp-1 max-w-[200px]">{category.description}</div>
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
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    No categories found.
                  </td>
                </tr>
              )}
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
        <p className="text-slate-500">Create a new category under a master category</p>
      </div>

      <CategoryAddForm 
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSave={handleAddCategory}
      />
    </div>
  );
};

export default Category;
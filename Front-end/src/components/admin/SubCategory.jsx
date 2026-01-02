import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import SubCategoryAddForm from './SubCategoryAddForm';

const SubCategory = () => {
  const [subCategories, setSubCategories] = useState([
    { id: 1, name: 'T-Shirts', masterCategory: 'Clothing', category: 'Men\'s Clothing', description: 'Men\'s casual t-shirts', status: 'Active', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80' },
    { id: 2, name: 'Dresses', masterCategory: 'Clothing', category: 'Women\'s Clothing', description: 'Women\'s dresses', status: 'Active', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=80' },
    { id: 3, name: 'Handbags', masterCategory: 'Accessories', category: 'Bags', description: 'Designer handbags', status: 'Active', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=80' },
    { id: 4, name: 'Rings', masterCategory: 'Accessories', category: 'Jewelry', description: 'Fashion rings', status: 'Active', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=80' },
    { id: 5, name: 'Running Shoes', masterCategory: 'Footwear', category: 'Sneakers', description: 'Athletic running shoes', status: 'Active', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80' },
  ]);

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [selectedMasterCategory, setSelectedMasterCategory] = useState('');

  const masterCategories = ['Clothing', 'Accessories', 'Footwear', 'Electronics'];
  
  const categoryMap = {
    'Clothing': ['Men\'s Clothing', 'Women\'s Clothing'],
    'Accessories': ['Bags', 'Jewelry'],
    'Footwear': ['Sneakers', 'Formal Shoes'],
    'Electronics': ['Phones', 'Laptops']
  };

  const handleAddSubCategory = (newSubCategory) => {
    const subCategory = {
      id: subCategories.length + 1,
      ...newSubCategory
    };
    setSubCategories([...subCategories, subCategory]);
  };

  const filteredSubCategories = selectedMasterCategory 
    ? subCategories.filter(sub => sub.masterCategory === selectedMasterCategory)
    : subCategories;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Sub Categories</h2>
          <p className="text-slate-500">Manage sub categories under categories</p>
        </div>
        <button 
          onClick={() => setIsAddFormOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={18} />
          Add Sub Category
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search sub categories..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select 
            value={selectedMasterCategory}
            onChange={(e) => setSelectedMasterCategory(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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

      {/* Sub Categories Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Sub Category Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Master Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubCategories.map((subCategory) => (
                <tr key={subCategory.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                        <img src={subCategory.image} alt={subCategory.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="font-semibold text-slate-800">{subCategory.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                      {subCategory.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                      {subCategory.masterCategory}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-600">{subCategory.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      subCategory.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {subCategory.status}
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

      {/* Add New Sub Category Card */}
      <div 
        onClick={() => setIsAddFormOpen(true)}
        className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center hover:border-indigo-300 transition-colors cursor-pointer"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Plus size={24} className="text-indigo-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Add New Sub Category</h3>
        <p className="text-slate-500">Create a new sub category under a category</p>
      </div>

      {/* Add Sub Category Form Modal */}
      <SubCategoryAddForm 
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSave={handleAddSubCategory}
        categoryMap={categoryMap}
      />
    </div>
  );
};

export default SubCategory;
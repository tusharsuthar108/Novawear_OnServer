import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import SubSubCategoryAddForm from './SubSubCategoryAddForm';

const SubSubCategory = () => {
  const [subSubCategories, setSubSubCategories] = useState([
    { id: 1, name: 'Polo Shirts', masterCategory: 'Clothing', category: 'Men\'s Clothing', subCategory: 'T-Shirts', description: 'Men\'s polo shirts', status: 'Active', image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=80' },
    { id: 2, name: 'Casual Dresses', masterCategory: 'Clothing', category: 'Women\'s Clothing', subCategory: 'Dresses', description: 'Women\'s casual dresses', status: 'Active', image: 'https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=80' },
    { id: 3, name: 'Leather Handbags', masterCategory: 'Accessories', category: 'Bags', subCategory: 'Handbags', description: 'Premium leather handbags', status: 'Active', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=80' },
    { id: 4, name: 'Gold Rings', masterCategory: 'Accessories', category: 'Jewelry', subCategory: 'Rings', description: 'Gold fashion rings', status: 'Active', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=80' },
    { id: 5, name: 'Trail Running', masterCategory: 'Footwear', category: 'Sneakers', subCategory: 'Running Shoes', description: 'Trail running shoes', status: 'Active', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=80' },
  ]);

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [selectedMasterCategory, setSelectedMasterCategory] = useState('');

  const categoryHierarchy = {
    'Clothing': {
      'Men\'s Clothing': ['T-Shirts', 'Shirts', 'Pants'],
      'Women\'s Clothing': ['Dresses', 'Tops', 'Skirts']
    },
    'Accessories': {
      'Bags': ['Handbags', 'Backpacks', 'Wallets'],
      'Jewelry': ['Rings', 'Necklaces', 'Earrings']
    },
    'Footwear': {
      'Sneakers': ['Running Shoes', 'Casual Sneakers', 'Sports Shoes'],
      'Formal Shoes': ['Dress Shoes', 'Loafers', 'Oxfords']
    },
    'Electronics': {
      'Phones': ['Smartphones', 'Accessories', 'Cases'],
      'Laptops': ['Gaming', 'Business', 'Ultrabooks']
    }
  };

  const handleAddSubSubCategory = (newSubSubCategory) => {
    const subSubCategory = {
      id: subSubCategories.length + 1,
      ...newSubSubCategory
    };
    setSubSubCategories([...subSubCategories, subSubCategory]);
  };

  const filteredSubSubCategories = selectedMasterCategory 
    ? subSubCategories.filter(sub => sub.masterCategory === selectedMasterCategory)
    : subSubCategories;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Sub Sub Categories</h2>
          <p className="text-slate-500">Manage sub sub categories under sub categories</p>
        </div>
        <button 
          onClick={() => setIsAddFormOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={18} />
          Add Sub Sub Category
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search sub sub categories..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select 
            value={selectedMasterCategory}
            onChange={(e) => setSelectedMasterCategory(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Master Categories</option>
            {Object.keys(categoryHierarchy).map(master => (
              <option key={master} value={master}>{master}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      {/* Sub Sub Categories Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Sub Sub Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Sub Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Master Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubSubCategories.map((subSubCategory) => (
                <tr key={subSubCategory.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                        <img src={subSubCategory.image} alt={subSubCategory.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="font-semibold text-slate-800">{subSubCategory.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                      {subSubCategory.subCategory}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                      {subSubCategory.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                      {subSubCategory.masterCategory}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-600">{subSubCategory.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      subSubCategory.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {subSubCategory.status}
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

      {/* Add New Sub Sub Category Card */}
      <div 
        onClick={() => setIsAddFormOpen(true)}
        className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center hover:border-indigo-300 transition-colors cursor-pointer"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Plus size={24} className="text-indigo-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Add New Sub Sub Category</h3>
        <p className="text-slate-500">Create a new sub sub category under a sub category</p>
      </div>

      {/* Add Sub Sub Category Form Modal */}
      <SubSubCategoryAddForm 
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSave={handleAddSubSubCategory}
        categoryHierarchy={categoryHierarchy}
      />
    </div>
  );
};

export default SubSubCategory;
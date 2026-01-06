import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter, ArrowLeft } from 'lucide-react';
import AddBrand from './AddBrand';

const BrandList = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [brands, setBrands] = useState([
    { id: 1, name: "Nike", description: "Just Do It", status: 'Active', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80' },
    { id: 2, name: "Adidas", description: "Impossible is Nothing", status: 'Active', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=80' },
    { id: 3, name: "Puma", description: "Forever Faster", status: 'Active', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=80' },
    { id: 4, name: "Reebok", description: "Be More Human", status: 'Inactive', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=80' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         brand.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === '' || brand.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowAddForm(false)}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Brand List
          </button>
        </div>
        <AddBrand />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Brand Management</h2>
          <p className="text-slate-500">Manage all brand information</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={18} />
          Add Brand
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-w-[200px]"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      {/* Brands Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Brand Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                          <img 
                            src={brand.image} 
                            alt={brand.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="font-semibold text-slate-800">{brand.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600 text-sm line-clamp-1 max-w-[200px]">{brand.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        brand.status === 'Active' 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {brand.status}
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
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                    No brands found.
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

export default BrandList;
import React, { useState, useEffect } from 'react';
import {
  Eye, Edit3, Trash2, Plus,
  Search, Filter, Folder, Layers, CheckCircle
} from 'lucide-react';
// Import your modal component
import CategoryAdd from './CategoryAdd';
import CategoryView from './CategoryView';
import { fetchMasterCategories } from '../../api/masterCategory.api';
import { fetchCategories, createCategory, deleteCategory } from '../../api/Category.api';
import { testBackendConnection, testCategoriesEndpoint } from '../../api/test.api';

const Category = () => {
  // --- STATE FOR MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State for categories fetched from database
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('checking'); // 'checking', 'connected', 'failed'

  // Data for the dropdown inside the CategoryAdd modal
  const [masterCategories, setMasterCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [masterCategoryFilter, setMasterCategoryFilter] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Retry function
  const retryConnection = () => {
    setConnectionStatus('checking');
    setError(null);
    setLoadingCategories(true);
    window.location.reload();
  };

  // Fetch categories from database
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        setError(null);
        
        // Test backend connection first
        console.log('Testing backend connection...');
        try {
          await testBackendConnection();
          console.log('Backend connection successful');
          setConnectionStatus('connected');
        } catch (connError) {
          console.error('Backend connection test failed:', connError);
          setConnectionStatus('failed');
          setError('Backend server connection failed');
          setLoadingCategories(false);
          return;
        }
        
        console.log('Fetching categories...');
        const response = await fetchCategories();
        console.log('Categories response:', response);
        
        if (response && response.success) {
          setCategories(response.data || []);
        } else {
          setError('Failed to load categories: ' + (response?.message || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Backend server connection failed');
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // Fetch master categories from database
  useEffect(() => {
    const loadMasterCategories = async () => {
      try {
        setLoading(true);
        console.log('Fetching master categories...');
        const response = await fetchMasterCategories();
        console.log('API Response:', response);
        if (response.success) {
          console.log('Master categories data:', response.data);
          setMasterCategories(response.data);
        } else {
          console.error('API returned success: false');
        }
      } catch (error) {
        console.error('Error fetching master categories:', error);
        // Fallback to dummy data if API fails
        setMasterCategories([
          { master_category_id: 1, name: "Electronics" },
          { master_category_id: 2, name: "Clothing" },
          { master_category_id: 3, name: "Home & Garden" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadMasterCategories();
  }, []);

  // Get search suggestions
  const getSearchSuggestions = () => {
    if (!searchTerm.trim()) return [];
    
    const suggestions = new Set();
    categories.forEach(cat => {
      if (cat.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(cat.name);
      }
      if (cat.slug?.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(cat.slug);
      }
      if (cat.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(cat.description);
      }
    });
    return Array.from(suggestions).slice(0, 5);
  };

  const searchSuggestions = getSearchSuggestions();

  // Filter categories based on search and filters
  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cat.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cat.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && cat.is_active) ||
                         (statusFilter === 'inactive' && !cat.is_active);
    
    const matchesMasterCategory = masterCategoryFilter === 'all' ||
                                cat.master_category_name === masterCategoryFilter;
    
    return matchesSearch && matchesStatus && matchesMasterCategory;
  });

  // Logic to calculate totals
  const totalCategories = filteredCategories.length;
  const activeCategories = filteredCategories.filter(cat => cat.is_active).length;

  // --- SAVE LOGIC ---
  const handleSaveCategory = async (formData) => {
    try {
      console.log('Saving category:', formData);
      const response = await createCategory({
        master_category_id: formData.master_category_id,
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        is_active: formData.is_active,
        imageFile: formData.imageFile
      });
      console.log('Create category response:', response);
      console.log('Response data:', response.data);
      if (response.success) {
        // Refresh categories list
        const updatedResponse = await fetchCategories();
        if (updatedResponse.success) {
          setCategories(updatedResponse.data);
        }
        setIsModalOpen(false);
      } else {
        console.error('Failed to create category');
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  // --- VIEW LOGIC ---
  const handleView = (category) => {
    setSelectedCategory(category);
    setIsViewModalOpen(true);
  };

  // --- DELETE LOGIC ---
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        // Refresh categories list
        const updatedResponse = await fetchCategories();
        if (updatedResponse.success) {
          setCategories(updatedResponse.data);
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        setError('Failed to delete category');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
          <p className="text-slate-500 text-sm mt-1">Organize and manage your product catalog</p>
        </div>
        {/* Trigger Button to open Modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 font-semibold text-sm"
        >
          <Plus size={18} />
          <span>New Category</span>
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
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
            />
            
            {/* Search Suggestions */}
            {showSuggestions && searchTerm && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchTerm(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm text-slate-700 border-b border-slate-100 last:border-b-0"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Status Filter */}
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all min-w-[120px]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          {/* Master Category Filter */}
          <select 
            value={masterCategoryFilter}
            onChange={(e) => setMasterCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all min-w-[150px]"
          >
            <option value="all">All Masters</option>
            {masterCategories.map((master) => (
              <option key={master.master_category_id} value={master.name}>
                {master.name}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={() => {
            setSearchTerm('');
            setStatusFilter('all');
            setMasterCategoryFilter('all');
          }}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Clear Filters
        </button>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || statusFilter !== 'all' || masterCategoryFilter !== 'all') && (
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-slate-600">Active filters:</span>
            
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs font-medium">
                Search: "{searchTerm}"
                <button 
                  onClick={() => setSearchTerm('')}
                  className="ml-1 hover:bg-indigo-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}
            
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium">
                Status: {statusFilter === 'active' ? 'Active' : 'Inactive'}
                <button 
                  onClick={() => setStatusFilter('all')}
                  className="ml-1 hover:bg-emerald-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}
            
            {masterCategoryFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-medium">
                Master: {masterCategoryFilter}
                <button 
                  onClick={() => setMasterCategoryFilter('all')}
                  className="ml-1 hover:bg-amber-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}

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
              {loadingCategories ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-slate-500">
                    Loading categories...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="text-red-500 text-lg font-semibold">{error}</div>
                      {connectionStatus === 'failed' && (
                        <div className="text-sm text-slate-600">
                          <p>Make sure your backend server is running on port 3000</p>
                          <p className="mt-1">Try: <code className="bg-slate-100 px-2 py-1 rounded">npm start</code> or <code className="bg-slate-100 px-2 py-1 rounded">node server.js</code></p>
                        </div>
                      )}
                      <button 
                        onClick={retryConnection}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Retry Connection
                      </button>
                    </div>
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-slate-500">
                    {searchTerm || statusFilter !== 'all' || masterCategoryFilter !== 'all' 
                      ? 'No categories match your filters.' 
                      : 'No categories found.'}
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat.category_id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={cat.icon_url || "https://via.placeholder.com/80"}
                          alt={cat.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm shrink-0"
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 text-sm leading-tight">{cat.name}</span>
                          <span className="text-[11px] text-slate-400 font-semibold tracking-wider mt-1">ID: #00{cat.category_id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 bg-slate-100/50 w-fit px-2 py-1 rounded-md text-sm">
                        <Folder size={14} className="text-slate-400" />
                        <span className="font-medium text-slate-600">{cat.master_category_name} / {cat.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-500 max-w-xs truncate" title={cat.description || "No description"}>
                        {cat.description || "No description"}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                        ${cat.is_active
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                        {cat.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleView(cat)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" 
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Edit"><Edit3 size={18} /></button>
                        <button 
                          onClick={() => handleDelete(cat.category_id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500 font-medium tracking-tight">
            Showing <span className="text-slate-900 font-bold">{totalCategories}</span> of 24 entries
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors">Prev</button>
            <button className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* --- MODAL INTEGRATION --- */}
      <CategoryAdd 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveCategory}
        masterCategories={masterCategories}
      />
      
      <CategoryView 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        category={selectedCategory}
      />
    </div>
  );
};

export default Category;
import React, { useState, useEffect } from 'react';
import { 
  Eye, Edit3, Trash2, Plus, 
  Search, Filter, Folder, Layers, CheckCircle
} from 'lucide-react';
import MasterCategoryAdd from './MasterCategoryAdd';
import MasterCategoryView from './MasterCategoryView';
import MasterCategoryEdit from './MasterCategoryEdit';
import { deleteMasterCategory, updateMasterCategory } from '../../api/masterCategory.api';
import { PLACEHOLDER_IMAGE } from '../../utils/constants';

const MasterCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const API_BASE_URL = 'http://localhost:3000/api/master-categories';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching from:', API_BASE_URL);
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      
      // Handle different response structures
      let categoriesData = [];
      if (Array.isArray(data)) {
        categoriesData = data;
      } else if (data.data && Array.isArray(data.data)) {
        categoriesData = data.data;
      } else if (data.categories && Array.isArray(data.categories)) {
        categoriesData = data.categories;
      } else {
        console.warn('Unexpected data structure:', data);
        categoriesData = [];
      }
      
      console.log('Setting categories:', categoriesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Fetch error details:', error);
      setError(`Failed to load categories: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategory = async (formData) => {
    try {
      setError(null);
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        setSuccess('Category added successfully!');
        fetchCategories();
        setIsModalOpen(false);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.details || errorData.error || 'Failed to save');
        } else {
          throw new Error(`Backend missing POST endpoint. Status: ${response.status}`);
        }
      }
    } catch (error) {
      setError(`Save failed: ${error.message}`);
    }
  };

  const handleView = (category) => {
    setSelectedCategory(category);
    setIsViewModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async (formData) => {
    try {
      setError(null);
      await updateMasterCategory(selectedCategory.master_category_id, formData);
      setSuccess('Category updated successfully!');
      fetchCategories();
      setIsEditModalOpen(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(`Update failed: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        console.log('Deleting master category with ID:', id);
        await deleteMasterCategory(id);
        setSuccess('Deleted successfully');
        fetchCategories();
        setTimeout(() => setSuccess(null), 2000);
      } catch (error) {
        console.error('Delete error:', error);
        setError(`Delete failed: ${error.message || error.error || 'Unknown error'}`);
      }
    }
  };

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
    });
    return Array.from(suggestions).slice(0, 5);
  };

  const searchSuggestions = getSearchSuggestions();

  // Logic for search filtering
  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (cat.slug && cat.slug.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && cat.is_active) ||
                         (statusFilter === 'inactive' && !cat.is_active);
    
    return matchesSearch && matchesStatus;
  });

  const totalCategories = filteredCategories.length;
  const activeCategories = filteredCategories.filter(cat => cat.is_active).length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-slate-500 font-medium">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex justify-between items-center">
          <span><strong>Error:</strong> {error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">×</button>
        </div>
      )}
      
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex justify-between items-center animate-in fade-in slide-in-from-top-2">
          <span><strong>Success:</strong> {success}</span>
        </div>
      )}

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
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Clear Filters
          </button>
          <button onClick={fetchCategories} className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            Refresh
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || statusFilter !== 'all') && (
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
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[13px] uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Slug</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <tr key={cat.master_category_id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={cat.image_url ? `http://localhost:3000${cat.image_url}` : PLACEHOLDER_IMAGE} 
                          alt={cat.name} 
                          className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm shrink-0"
                          onError={(e) => e.target.src = PLACEHOLDER_IMAGE}
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 text-sm leading-tight">{cat.name}</span>
                          <span className="text-[11px] text-slate-400 font-semibold tracking-wider mt-0.5">ID: #{cat.master_category_id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      <div className="flex items-center gap-2 bg-slate-100/50 w-fit px-2 py-1 rounded-md">
                        <Folder size={14} className="text-slate-400" />
                        <span className="font-medium text-slate-600">{cat.slug}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide
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
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleEdit(cat)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat.master_category_id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-medium">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'No categories match your filters.' 
                      : 'No categories found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <MasterCategoryAdd 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveCategory}
      />
      
      <MasterCategoryView 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        category={selectedCategory}
      />
      
      <MasterCategoryEdit 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateCategory}
        categoryData={selectedCategory}
      />
    </div>
  );
};

export default MasterCategory;
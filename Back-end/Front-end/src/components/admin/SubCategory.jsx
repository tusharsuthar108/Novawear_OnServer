import React, { useState, useEffect } from 'react';
import { 
  Eye, Edit3, Trash2, Plus, 
  Search, Filter, Folder, Layers, CheckCircle
} from 'lucide-react';
// Import your modal components
import SubCategoryAdd from './SubCategoryAdd';
import SubCategoryEdit from './SubCategoryEdit';
import SubCategoryView from './SubCategoryView';
import { fetchCategories } from '../../api/Category.api';
import { fetchMasterCategories } from '../../api/masterCategory.api';
import { fetchSubCategories, createSubCategory, updateSubCategory, deleteSubCategory } from '../../api/subCategory.api';
import { testBackendConnection } from '../../api/test.api';

const SubCategory = () => {
  // --- STATE FOR MODALS ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // State for subcategories fetched from database
  const [subCategories, setSubCategories] = useState([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('checking');

  // Data for the dropdown inside the SubCategoryAdd modal
  const [categories, setCategories] = useState([]);
  const [masterCategories, setMasterCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [masterCategoryFilter, setMasterCategoryFilter] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Filter state for the dropdown
  const [selectedFilter, setSelectedFilter] = useState('master');

  // Retry function
  const retryConnection = async () => {
    setConnectionStatus('checking');
    setError(null);
    setLoadingSubCategories(true);
    
    try {
      await testBackendConnection();
      setConnectionStatus('connected');
      
      const response = await fetchSubCategories();
      if (response && response.success) {
        setSubCategories(response.data || []);
      } else {
        setError('Failed to load subcategories: ' + (response?.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Retry failed:', error);
      setConnectionStatus('failed');
      setError('Backend server connection failed');
    } finally {
      setLoadingSubCategories(false);
    }
  };

  // Fetch subcategories from database
  useEffect(() => {
    const loadSubCategories = async () => {
      try {
        setLoadingSubCategories(true);
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
          setLoadingSubCategories(false);
          return;
        }
        
        console.log('Fetching subcategories...');
        const response = await fetchSubCategories();
        console.log('SubCategories response:', response);
        
        if (response && response.success) {
          console.log('SubCategories data:', response.data);
          console.log('First subcategory:', response.data[0]);
          setSubCategories(response.data || []);
        } else {
          setError('Failed to load subcategories: ' + (response?.message || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setError('Backend server connection failed');
      } finally {
        setLoadingSubCategories(false);
      }
    };

    loadSubCategories();
  }, []);

  // Fetch categories and master categories from database for dropdown
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch both categories and master categories
        const [categoriesResponse, masterCategoriesResponse] = await Promise.all([
          fetchCategories(),
          fetchMasterCategories()
        ]);
        
        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data);
        }
        
        if (masterCategoriesResponse.success) {
          setMasterCategories(masterCategoriesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Get search suggestions
  const getSearchSuggestions = () => {
    if (!searchTerm.trim()) return [];
    
    const suggestions = new Set();
    subCategories.forEach(subCat => {
      if (subCat.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(subCat.name);
      }
      if (subCat.slug?.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(subCat.slug);
      }
      if (subCat.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(subCat.description);
      }
    });
    return Array.from(suggestions).slice(0, 5);
  };

  const searchSuggestions = getSearchSuggestions();

  // Filter subcategories based on search and filters
  const filteredSubCategories = subCategories.filter(subCat => {
    const matchesSearch = subCat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subCat.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subCat.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && subCat.is_active) ||
                         (statusFilter === 'inactive' && !subCat.is_active);
    
    const matchesCategory = categoryFilter === 'all' ||
                           subCat.category_name === categoryFilter;
    
    const matchesMasterCategory = masterCategoryFilter === 'all' ||
                                 subCat.master_category_name === masterCategoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesMasterCategory;
  });

  // Logic to calculate totals
  const totalCategories = filteredSubCategories.length;
  const activeCategories = filteredSubCategories.filter(subCat => subCat.is_active).length;

  // --- SAVE LOGIC ---
  const handleSaveSubCategory = async (formData) => {
    try {
      console.log('Saving subcategory:', formData);
      const response = await createSubCategory({
        category_id: formData.category_id,
        name: formData.name,
        slug: formData.slug,
        is_active: formData.is_active,
        description: formData.description,
        imageFile: formData.imageFile
      });
      console.log('Create subcategory response:', response);
      if (response.success) {
        // Refresh subcategories list
        const updatedResponse = await fetchSubCategories();
        if (updatedResponse.success) {
          setSubCategories(updatedResponse.data);
        }
        setIsAddModalOpen(false);
      } else {
        console.error('Failed to create subcategory');
      }
    } catch (error) {
      console.error('Error saving subcategory:', error);
    }
  };

  // --- VIEW LOGIC ---
  const handleViewSubCategory = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setIsViewModalOpen(true);
  };

  // --- EDIT LOGIC ---
  const handleEditSubCategory = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setIsEditModalOpen(true);
  };

  const handleUpdateSubCategory = async (formData) => {
    try {
      console.log('Updating subcategory:', formData);
      const response = await updateSubCategory(formData.sub_category_id, {
        category_id: formData.category_id,
        name: formData.name,
        slug: formData.slug,
        is_active: formData.is_active,
        description: formData.description,
        imageFile: formData.imageFile,
        updateImage: formData.updateImage
      });
      console.log('Update subcategory response:', response);
      if (response.success) {
        // Refresh subcategories list
        const updatedResponse = await fetchSubCategories();
        if (updatedResponse.success) {
          setSubCategories(updatedResponse.data);
        }
        setIsEditModalOpen(false);
        setSelectedSubCategory(null);
      } else {
        console.error('Failed to update subcategory');
      }
    } catch (error) {
      console.error('Error updating subcategory:', error);
    }
  };

  // --- DELETE LOGIC ---
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      try {
        await deleteSubCategory(id);
        // Refresh subcategories list
        const updatedResponse = await fetchSubCategories();
        if (updatedResponse.success) {
          setSubCategories(updatedResponse.data);
        }
      } catch (error) {
        console.error('Error deleting subcategory:', error);
        setError('Failed to delete subcategory');
      }
    }
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
          onClick={() => setIsAddModalOpen(true)}
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
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search sub-categories..." 
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
          
          {/* Category Filter */}
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all min-w-[150px]"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={() => {
            setSearchTerm('');
            setStatusFilter('all');
            setCategoryFilter('all');
            setMasterCategoryFilter('all');
          }}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Clear Filters
        </button>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || masterCategoryFilter !== 'all') && (
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
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">
                Master: {masterCategoryFilter}
                <button 
                  onClick={() => setMasterCategoryFilter('all')}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}
            
            {categoryFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-medium">
                Category: {categoryFilter}
                <button 
                  onClick={() => setCategoryFilter('all')}
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
              {loadingSubCategories ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-slate-500">
                    Loading subcategories...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    <div className="text-red-500 mb-2">{error}</div>
                    <button 
                      onClick={retryConnection}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Retry Connection
                    </button>
                  </td>
                </tr>
              ) : filteredSubCategories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-slate-500">
                    {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || masterCategoryFilter !== 'all' 
                      ? 'No subcategories match your filters.' 
                      : 'No subcategories found'}
                  </td>
                </tr>
              ) : (
                filteredSubCategories.map((subCategory) => (
                  <tr key={subCategory.sub_category_id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                          {subCategory.image_url ? (
                            <img 
                              src={`http://localhost:3000${subCategory.image_url}`} 
                              alt={subCategory.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                          ) : (
                            <Folder className="text-slate-400" size={18} />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm">{subCategory.name}</h4>
                          <p className="text-xs text-slate-500">{subCategory.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 bg-slate-100/50 w-fit px-2 py-1 rounded-md text-sm">
                        <Folder size={14} className="text-slate-400" />
                        <span className="font-medium text-slate-600">{subCategory.master_category_name} / {subCategory.category_name} / {subCategory.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-500 max-w-xs truncate" title={subCategory.description || "No description"}>
                        {subCategory.description || "No description"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        subCategory.is_active 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-slate-50 text-slate-700 border border-slate-200'
                      }`}>
                        {subCategory.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleViewSubCategory(subCategory)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEditSubCategory(subCategory)}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(subCategory.sub_category_id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedSubCategory && (
        <SubCategoryView 
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedSubCategory(null);
          }}
          subCategory={selectedSubCategory}
        />
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <SubCategoryAdd 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveSubCategory}
          categories={categories}
          masterCategories={masterCategories}
          loading={loading}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedSubCategory && (
        <SubCategoryEdit 
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedSubCategory(null);
          }}
          onSave={handleUpdateSubCategory}
          categories={categories}
          masterCategories={masterCategories}
          subCategory={selectedSubCategory}
          loading={loading}
        />
      )}
    </div>
  );
};

export default SubCategory;
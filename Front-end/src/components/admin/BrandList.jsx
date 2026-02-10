import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter, ArrowLeft, X } from 'lucide-react';
import AddBrand from './AddBrand';
import { brandAPI } from '../../api/brand.api';

const BrandList = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [viewingBrand, setViewingBrand] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await brandAPI.getAllBrands();
      console.log('Brands API response:', response);
      // Handle both {success: true, data: []} and direct array responses
      const brandsData = response.success ? response.data : (Array.isArray(response) ? response : []);
      setBrands(brandsData);
    } catch (error) {
      console.error('Error fetching brands:', error);
      alert('Failed to load brands: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        await brandAPI.deleteBrand(id);
        fetchBrands();
        alert('Brand deleted successfully!');
      } catch (error) {
        console.error('Error deleting brand:', error);
        alert(error.message);
      }
    }
  };

  const handleEdit = async (formData) => {
    try {
      await brandAPI.updateBrand(editingBrand.brand_id, formData);
      setEditingBrand(null);
      fetchBrands();
      alert('Brand updated successfully!');
    } catch (error) {
      console.error('Error updating brand:', error);
      alert('Error updating brand. Please try again.');
    }
  };

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = brand.brand_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (brand.description && brand.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus === '' || 
                         (selectedStatus === 'Active' && brand.is_active) ||
                         (selectedStatus === 'Inactive' && !brand.is_active);
    
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
        <AddBrand onSuccess={() => { fetchBrands(); setShowAddForm(false); }} />
      </div>
    );
  }

  if (editingBrand) {
    return <EditBrandForm brand={editingBrand} onSave={handleEdit} onCancel={() => setEditingBrand(null)} />;
  }

  if (viewingBrand) {
    return <ViewBrand brand={viewingBrand} onClose={() => setViewingBrand(null)} />;
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
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                    Loading brands...
                  </td>
                </tr>
              ) : filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <tr key={brand.brand_id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                          {brand.logo_url ? (
                            <img 
                              src={`http://localhost:3000${brand.logo_url}`} 
                              alt={brand.brand_name} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                              No Logo
                            </div>
                          )}
                        </div>
                        <div className="font-semibold text-slate-800">{brand.brand_name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600 text-sm line-clamp-1 max-w-[200px]">{brand.description || 'No description'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        brand.is_active 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {brand.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setViewingBrand(brand)}
                          className="p-2 text-slate-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => setEditingBrand(brand)}
                          className="p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-indigo-50"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(brand.brand_id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        >
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

const EditBrandForm = ({ brand, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    brand_name: brand.brand_name,
    description: brand.description || '',
    is_active: brand.is_active
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const submitData = new FormData();
    submitData.append('brand_name', formData.brand_name);
    submitData.append('description', formData.description);
    submitData.append('is_active', formData.is_active);
    if (selectedImage) submitData.append('logo', selectedImage);
    await onSave(submitData);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onCancel} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors">
          <ArrowLeft size={18} /> Back to Brand List
        </button>
      </div>
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Edit Brand</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Brand Name</label>
            <input
              type="text"
              value={formData.brand_name}
              onChange={(e) => setFormData({...formData, brand_name: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-600">Active</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">New Logo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Brand'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-medium hover:bg-slate-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ViewBrand = ({ brand, onClose }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors">
          <ArrowLeft size={18} /> Back to Brand List
        </button>
        <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
          <X size={20} />
        </button>
      </div>
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden shrink-0">
            {brand.logo_url ? (
              <img src={`http://localhost:3000${brand.logo_url}`} alt={brand.brand_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">No Logo</div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">{brand.brand_name}</h2>
            <p className="text-slate-600 mb-4">{brand.description || 'No description available'}</p>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                brand.is_active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>
                {brand.is_active ? 'Active' : 'Inactive'}
              </span>
              <span className="text-sm text-slate-500">Created: {new Date(brand.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
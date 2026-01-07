import React, { useState, useEffect } from 'react';
import { sizeApi } from '../../api/size.api';
import { Plus, X, Ruler, Trash2, Search, Edit3 } from 'lucide-react';

const ProductSize = () => {
  const [sizes, setSizes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSize, setEditingSize] = useState(null);
  const [formData, setFormData] = useState({
    size_name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSizes();
  }, []);

  const fetchSizes = async () => {
    try {
      const response = await sizeApi.getAllSizes();
      if (response.success) {
        setSizes(response.data);
      } else {
        setError('Failed to fetch sizes');
      }
    } catch (error) {
      setError('Error connecting to server');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (editingSize) {
        const response = await sizeApi.updateSize(editingSize.size_id, formData);
        if (response.success) {
          setSizes(sizes.map(size => 
            size.size_id === editingSize.size_id ? response.data : size
          ));
          setSuccess('Size updated successfully!');
        } else {
          setError(response.message || 'Failed to update size');
        }
      } else {
        const response = await sizeApi.createSize(formData);
        if (response.success) {
          setSizes([...sizes, response.data]);
          setSuccess('Size added successfully!');
        } else {
          setError(response.message || 'Failed to add size');
        }
      }
      
      setFormData({ size_name: '' });
      setShowForm(false);
      setEditingSize(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error connecting to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (size) => {
    setEditingSize(size);
    setFormData({
      size_name: size.size_name
    });
    setShowForm(true);
  };

  const handleDelete = async (sizeId) => {
    if (window.confirm('Are you sure you want to delete this size?')) {
      try {
        await sizeApi.deleteSize(sizeId);
        setSizes(sizes.filter(size => size.size_id !== sizeId));
        setSuccess('Size deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Failed to delete size');
      }
    }
  };

  const resetForm = () => {
    setFormData({ size_name: '' });
    setShowForm(false);
    setEditingSize(null);
  };

  // Filter sizes based on search
  const filteredSizes = sizes.filter(size => 
    size.size_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSizes = filteredSizes.length;

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex justify-between items-center">
          <span><strong>Error:</strong> {error}</span>
          <button onClick={() => setError('')} className="text-red-400 hover:text-red-600">×</button>
        </div>
      )}
      
      {/* Success Alert */}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex justify-between items-center animate-in fade-in slide-in-from-top-2">
          <span><strong>Success:</strong> {success}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Product Sizes</h1>
          <p className="text-slate-500 text-sm mt-1">Manage product size options</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 font-semibold text-sm"
        >
          {showForm ? (
            <><X size={18} /><span>Cancel</span></>
          ) : (
            <><Plus size={18} /><span>Add New Size</span></>
          )}
        </button>
      </div>

      {/* Stats Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm max-w-md">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
          <Ruler size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Sizes</p>
          <h3 className="text-2xl font-bold text-slate-900">{totalSizes}</h3>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search sizes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSearchTerm('')}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Clear
          </button>
          <button 
            onClick={fetchSizes} 
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            {editingSize ? 'Edit Size' : 'Add New Size'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Size Name
              </label>
              <input
                type="text"
                value={formData.size_name}
                onChange={(e) => setFormData({...formData, size_name: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                placeholder="Enter size name (e.g., XS, S, M, L, XL, XXL)"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-indigo-100"
              >
                {loading ? (editingSize ? 'Updating...' : 'Adding...') : (editingSize ? 'Update Size' : 'Add Size')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sizes Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[13px] uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Size Name</th>
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSizes.length > 0 ? (
                filteredSizes.map((size) => (
                  <tr key={size.size_id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 text-sm">{size.size_name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      <span className="text-[11px] text-slate-400 font-semibold tracking-wider">#{size.size_id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(size)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(size.size_id)}
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
                  <td colSpan="3" className="px-6 py-12 text-center text-slate-400 font-medium">
                    {searchTerm 
                      ? 'No sizes match your search.' 
                      : 'No sizes found. Add your first size!'}
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

export default ProductSize;
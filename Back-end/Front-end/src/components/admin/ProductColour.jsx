import React, { useState, useEffect } from 'react';
import { colorApi } from '../../api/color.api';
import { Plus, X, Palette, Trash2, Search, CheckCircle, Edit3 } from 'lucide-react';

const ProductColour = () => {
  const [colors, setColors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingColor, setEditingColor] = useState(null);
  const [formData, setFormData] = useState({
    color_name: '',
    hex_code: '#000000'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const response = await colorApi.getAllColors();
      if (response.success) {
        setColors(response.data);
      } else {
        setError('Failed to fetch colors');
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
      if (editingColor) {
        const response = await colorApi.updateColor(editingColor.color_id, formData);
        if (response.success) {
          setColors(colors.map(color => 
            color.color_id === editingColor.color_id ? response.data : color
          ));
          setSuccess('Color updated successfully!');
        } else {
          setError(response.message || 'Failed to update color');
        }
      } else {
        const response = await colorApi.createColor(formData);
        if (response.success) {
          setColors([...colors, response.data]);
          setSuccess('Color added successfully!');
        } else {
          setError(response.message || 'Failed to add color');
        }
      }
      
      setFormData({ color_name: '', hex_code: '#000000' });
      setShowForm(false);
      setEditingColor(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error connecting to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (color) => {
    setEditingColor(color);
    setFormData({
      color_name: color.color_name,
      hex_code: color.hex_code
    });
    setShowForm(true);
  };

  const handleDelete = async (colorId) => {
    if (window.confirm('Are you sure you want to delete this color?')) {
      try {
        await colorApi.deleteColor(colorId);
        setColors(colors.filter(color => color.color_id !== colorId));
        setSuccess('Color deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        setError('Failed to delete color');
      }
    }
  };

  const resetForm = () => {
    setFormData({ color_name: '', hex_code: '#000000' });
    setShowForm(false);
    setEditingColor(null);
  };

  // Filter colors based on search
  const filteredColors = colors.filter(color => 
    color.color_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    color.hex_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalColors = filteredColors.length;

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
          <h1 className="text-2xl font-bold text-slate-900">Product Colors</h1>
          <p className="text-slate-500 text-sm mt-1">Manage product colors and hex codes</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 font-semibold text-sm"
        >
          {showForm ? (
            <><X size={18} /><span>Cancel</span></>
          ) : (
            <><Plus size={18} /><span>Add New Color</span></>
          )}
        </button>
      </div>

      {/* Stats Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm max-w-md">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
          <Palette size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Colors</p>
          <h3 className="text-2xl font-bold text-slate-900">{totalColors}</h3>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search colors..." 
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
            onClick={fetchColors} 
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
            {editingColor ? 'Edit Color' : 'Add New Color'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Color Name
                </label>
                <input
                  type="text"
                  value={formData.color_name}
                  onChange={(e) => setFormData({...formData, color_name: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  placeholder="Enter color name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hex Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={formData.hex_code}
                    onChange={(e) => setFormData({...formData, hex_code: e.target.value})}
                    className="w-12 h-10 border border-slate-200 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.hex_code}
                    onChange={(e) => setFormData({...formData, hex_code: e.target.value})}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-mono"
                    placeholder="#000000"
                    pattern="^#[0-9A-Fa-f]{6}$"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-indigo-100"
              >
                {loading ? (editingColor ? 'Updating...' : 'Adding...') : (editingColor ? 'Update Color' : 'Add Color')}
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

      {/* Colors Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[13px] uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Color</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Hex Code</th>
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredColors.length > 0 ? (
                filteredColors.map((color) => (
                  <tr key={color.color_id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl border border-slate-100 shadow-sm shrink-0"
                          style={{ backgroundColor: color.hex_code }}
                        ></div>
                        <div 
                          className="w-6 h-6 rounded-full border-2 border-slate-200"
                          style={{ backgroundColor: color.hex_code }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 text-sm">{color.color_name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 bg-slate-100/50 w-fit px-2 py-1 rounded-md">
                        <span className="font-medium text-slate-600 font-mono text-sm">{color.hex_code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      <span className="text-[11px] text-slate-400 font-semibold tracking-wider">#{color.color_id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(color)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(color.color_id)}
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
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400 font-medium">
                    {searchTerm 
                      ? 'No colors match your search.' 
                      : 'No colors found. Add your first color!'}
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

export default ProductColour;
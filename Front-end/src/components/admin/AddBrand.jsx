import React, { useState } from 'react';
import { Upload, Save, X, Image as ImageIcon } from 'lucide-react';
import { brandAPI } from '../../api/brand.api';

const AddBrand = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    brand_name: '',
    description: '',
    is_active: true
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('=== SUBMITTING BRAND ===');
      console.log('Form data:', formData);
      console.log('Selected image:', selectedImage);
      
      const submitData = new FormData();
      submitData.append('brand_name', formData.brand_name);
      if (formData.description) {
        submitData.append('description', formData.description);
      }
      submitData.append('is_active', formData.is_active);
      
      if (selectedImage) {
        submitData.append('logo', selectedImage);
      }

      console.log('Calling API...');
      const response = await brandAPI.createBrand(submitData);
      console.log('API Response:', response);
      
      if (response.success) {
        handleReset();
        if (onSuccess) onSuccess();
        alert('Brand created successfully!');
      } else {
        throw new Error(response.error || 'Failed to create brand');
      }
    } catch (error) {
      console.error('Error creating brand:', error);
      console.error('Error details:', error.response);
      const errorMsg = error.response?.data?.error || error.message || 'Unknown error';
      alert(`Error creating brand: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      brand_name: '',
      description: '',
      is_active: true
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Add New Brand</h2>
          <p className="text-slate-500">Create a new brand entry</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Brand Name *
                </label>
                <input
                  type="text"
                  name="brand_name"
                  value={formData.brand_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter brand name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Enter brand description"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Status
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-600">Active</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Brand Logo
                </label>
                <div 
                  className="relative border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('brand-logo-input').click()}
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-xl mx-auto mb-4"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(null);
                          setImagePreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto">
                        <ImageIcon size={24} className="text-slate-400" />
                      </div>
                      <div>
                        <p className="text-slate-600 font-medium">Upload Brand Logo</p>
                        <p className="text-sm text-slate-400">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                  )}
                  <input
                    id="brand-logo-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {loading ? 'Saving...' : 'Save Brand'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-2 bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              <X size={18} />
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
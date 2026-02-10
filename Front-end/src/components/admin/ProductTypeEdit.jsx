import React, { useState, useEffect } from 'react';
import { X, Check, ChevronDown, Upload } from 'lucide-react';
import masterCategoriesApi from '../../services/masterCategoriesApi';
import categoriesApi from '../../services/categoriesApi';
import { fetchSubCategories } from '../../api/subCategory.api';
import productTypeApi from '../../services/productTypeService';

const ProductTypeEdit = ({ productType, onClose, onSave }) => {
  const [formData, setFormData] = useState({ 
    masterId: '', 
    categoryId: '', 
    subCategoryId: productType.sub_category_id || '', 
    name: productType.type_name || '', 
    description: productType.description || '', 
    status: productType.is_active ? 'Active' : 'Inactive', 
    imageFile: null,
    imagePreview: productType.image_url ? `http://localhost:3000${productType.image_url}` : null 
  });

  const [masterCategories, setMasterCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [masterRes, categoryRes, subCategoryRes] = await Promise.all([
          masterCategoriesApi.getAll(),
          categoriesApi.getAll(),
          fetchSubCategories()
        ]);
        
        const masters = masterRes.data.data || [];
        const cats = categoryRes.data.data || [];
        const subs = subCategoryRes.data || [];
        
        setMasterCategories(masters);
        setCategories(cats);
        setSubCategories(subs);
        
        // Find the hierarchy for the current product type
        if (productType.sub_category_id) {
          const subCat = subs.find(s => s.sub_category_id === productType.sub_category_id);
          if (subCat) {
            const cat = cats.find(c => c.category_id === subCat.category_id);
            if (cat) {
              setFormData(prev => ({
                ...prev,
                masterId: cat.master_category_id,
                categoryId: cat.category_id
              }));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [productType.sub_category_id]);

  useEffect(() => {
    if (formData.masterId && categories.length > 0) {
      const filtered = categories.filter(c => c.master_category_id === parseInt(formData.masterId));
      setFilteredCategories(filtered);
    }
  }, [formData.masterId, categories]);

  useEffect(() => {
    if (formData.categoryId && subCategories.length > 0) {
      const filtered = subCategories.filter(s => s.category_id === parseInt(formData.categoryId));
      setFilteredSubCategories(filtered);
    }
  }, [formData.categoryId, subCategories]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ 
        ...formData, 
        imageFile: file,
        imagePreview: URL.createObjectURL(file) 
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('sub_category_id', formData.subCategoryId);
      formDataToSend.append('type_name', formData.name);
      formDataToSend.append('slug', formData.name.toLowerCase().replace(/\s+/g, '-'));
      formDataToSend.append('is_active', formData.status === 'Active');
      
      if (formData.imageFile) {
        formDataToSend.append('image', formData.imageFile);
      } else if (productType.image_url) {
        formDataToSend.append('image_url', productType.image_url);
      }

      const response = await productTypeApi.update(productType.type_id, formDataToSend);
      if (response.data.success) {
        onSave();
      } else {
        throw new Error(response.data.error || 'Update failed');
      }
    } catch (error) {
      console.error('Error updating product type:', error);
      const errorMsg = error.response?.data?.error || error.message || 'Unknown error';
      alert(`Error updating product type: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-8 py-6 border-b flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Edit Product Type</h2>
            <p className="text-sm text-slate-500 mt-1">Update product type details</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Master Category</label>
              <select 
                required
                value={formData.masterId}
                onChange={(e) => setFormData({...formData, masterId: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm"
              >
                <option value="">Select Master</option>
                {masterCategories.map(m => <option key={m.master_category_id} value={m.master_category_id}>{m.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Parent Category</label>
              <select 
                required
                disabled={!formData.masterId}
                value={formData.categoryId}
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm disabled:opacity-50"
              >
                <option value="">Select Category</option>
                {filteredCategories.map(c => <option key={c.category_id} value={c.category_id}>{c.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Sub-Category</label>
              <select 
                required
                disabled={!formData.categoryId}
                value={formData.subCategoryId}
                onChange={(e) => setFormData({...formData, subCategoryId: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm disabled:opacity-50"
              >
                <option value="">Select Sub-Category</option>
                {filteredSubCategories.map(s => <option key={s.sub_category_id} value={s.sub_category_id}>{s.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Product Type Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700">Description</label>
              <textarea 
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm resize-none"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700">Type Thumbnail</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-slate-50 border-2 border-dashed flex items-center justify-center overflow-hidden">
                  {formData.imagePreview ? (
                    <img src={formData.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="text-slate-300" size={24} />
                  )}
                </div>
                <div>
                  <input type="file" onChange={handleImageChange} className="hidden" id="edit-upload" accept="image/*" />
                  <label htmlFor="edit-upload" className="inline-block px-4 py-2 bg-white border rounded-lg text-sm font-medium cursor-pointer">
                    Choose Image
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border rounded-xl font-semibold text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Check size={18} />
              {loading ? 'Updating...' : 'Update Type'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductTypeEdit;

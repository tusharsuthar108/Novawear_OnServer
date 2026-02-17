import React, { useState, useEffect } from 'react';
import { 
  Eye, Edit3, Trash2, Plus, 
  Search, Filter, Folder, Layers, CheckCircle
} from 'lucide-react';
import ProductTypeAdd from './ProductTypeAdd';
import ProductTypeEdit from './ProductTypeEdit';
import productTypeApi from '../../services/productTypeService';
import { PLACEHOLDER_IMAGE } from '../../utils/constants';

const ProductType = () => {
  // --- State Management ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingType, setViewingType] = useState(null);
  const [editingType, setEditingType] = useState(null);

  // Fetch product types on component mount
  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      setLoading(true);
      const response = await productTypeApi.getAll();
      if (response.data.success) {
        setProductTypes(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching product types:', error);
    } finally {
      setLoading(false);
    }
  };

  // Stats Logic
  const totalTypes = productTypes.length;
  const activeTypes = productTypes.filter(t => t.is_active).length;

  // --- Handlers ---
  const handleSave = (newProductType) => {
    setProductTypes([newProductType, ...productTypes]);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product type?')) {
      try {
        await productTypeApi.delete(id);
        setProductTypes(productTypes.filter(type => type.type_id !== id));
      } catch (error) {
        console.error('Error deleting product type:', error);
        alert('Error deleting product type. Please try again.');
      }
    }
  };

  const handleView = (type) => {
    setViewingType(type);
  };

  const handleEdit = (type) => {
    setEditingType(type);
  };

  if (viewingType) {
    return (
      <div className="space-y-6 p-4">
        <button onClick={() => setViewingType(null)} className="text-slate-600 hover:text-slate-800">← Back</button>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-start gap-6 mb-6">
            {viewingType.image_url ? (
              <img 
                src={`http://localhost:3000${viewingType.image_url}`} 
                alt={viewingType.type_name}
                className="w-32 h-32 rounded-xl object-cover border border-slate-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                <Layers size={48} className="text-slate-400" />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{viewingType.type_name}</h2>
              <div className="text-sm text-slate-500 mb-2">ID: #PT-{viewingType.type_id}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><strong>Hierarchy:</strong> {viewingType.master_category_name} / {viewingType.category_name} / {viewingType.sub_category_name}</div>
            <div><strong>Status:</strong> {viewingType.is_active ? 'Active' : 'Inactive'}</div>
            <div className="col-span-2"><strong>Description:</strong> {viewingType.description || 'No description'}</div>
          </div>
        </div>
      </div>
    );
  }

  if (editingType) {
    return (
      <ProductTypeEdit 
        productType={editingType}
        onClose={() => setEditingType(null)}
        onSave={() => {
          setEditingType(null);
          fetchProductTypes();
        }}
      />
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Product Types</h1>
          <p className="text-slate-500 text-sm mt-1">Define and manage the specific types for your inventory</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 font-semibold text-sm"
        >
          <Plus size={18} />
          <span>Add Product Type</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Types</p>
            <h3 className="text-2xl font-bold text-slate-900">{totalTypes}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active</p>
            <h3 className="text-2xl font-bold text-slate-900">{activeTypes}</h3>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search product types..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[13px] uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Type Name</th>
                <th className="px-6 py-4 font-semibold">Hierarchy Path</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    Loading product types...
                  </td>
                </tr>
              ) : productTypes.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    No product types found. Add your first product type!
                  </td>
                </tr>
              ) : (
                productTypes.map((type) => (
                  <tr key={type.type_id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={type.image_url ? `http://localhost:3000${type.image_url}` : PLACEHOLDER_IMAGE} 
                          alt="" 
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200" 
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{type.type_name}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">ID: #PT-{type.type_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium w-fit">
                        <Folder size={12} />
                        {type.master_category_name} / {type.category_name} / {type.sub_category_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                      {type.description || 'No description'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        type.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {type.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button 
                          onClick={() => handleView(type)}
                          className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleEdit(type)}
                          className="p-2 hover:bg-amber-50 text-slate-400 hover:text-amber-600 rounded-lg transition-colors"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(type.type_id)}
                          className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
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
      </div>

      {/* Add/Edit Modal */}
      <ProductTypeAdd 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
      />
    </div>
  );
};

export default ProductType;
import React, { useState, useEffect } from 'react';
import { Search, Eye, Edit, Trash2, ChevronDown, ChevronRight, Package, Tag, Palette, Shirt } from 'lucide-react';
import { productAPI } from '../../api/product.api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProducts, setExpandedProducts] = useState({});
  const [viewingProduct, setViewingProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAllProducts();
      setProducts(response.data || response);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (product) => {
    setViewingProduct(product);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      sku: product.sku,
      description: product.description,
      price: product.price || '',
      discount_price: product.discount_price || '',
      is_active: product.is_active
    });
    setImagePreview(product.image_url ? `http://localhost:3000${product.image_url}` : null);
    setSelectedImage(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(id);
        fetchProducts();
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert(error.message);
      }
    }
  };

  const toggleExpanded = (productId) => {
    setExpandedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', editFormData.name);
      formData.append('sku', editFormData.sku);
      formData.append('description', editFormData.description);
      formData.append('price', editFormData.price || 0);
      formData.append('discount_price', editFormData.discount_price || 0);
      formData.append('is_active', editFormData.is_active);
      
      if (selectedImage) {
        formData.append('image', selectedImage);
      } else if (editingProduct.image_url) {
        formData.append('image_url', editingProduct.image_url);
      }

      await productAPI.updateProduct(editingProduct.product_id, formData);
      alert('Product updated successfully!');
      setEditingProduct(null);
      setEditFormData(null);
      setSelectedImage(null);
      setImagePreview(null);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product: ' + error.message);
    }
  };

  const filteredProducts = products.filter((product) => 
    product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (viewingProduct) {
    return (
      <div className="space-y-6">
        <button onClick={() => setViewingProduct(null)} className="text-slate-600 hover:text-slate-800">← Back to Products</button>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-start gap-6 mb-6">
            {viewingProduct.image_url ? (
              <img 
                src={`http://localhost:3000${viewingProduct.image_url}`} 
                alt={viewingProduct.name}
                className="w-32 h-32 rounded-xl object-cover border border-slate-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                <Package size={48} className="text-slate-400" />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{viewingProduct.name}</h2>
              <div className="text-sm text-slate-500 mb-2">SKU: {viewingProduct.sku}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><strong>Brand:</strong> {viewingProduct.brand_name}</div>
            <div><strong>Status:</strong> {viewingProduct.is_active ? 'Active' : 'Inactive'}</div>
            {viewingProduct.price && <div><strong>Price:</strong> ₹{viewingProduct.price}</div>}
            {viewingProduct.discount_price && <div><strong>Discount Price:</strong> ₹{viewingProduct.discount_price}</div>}
            <div className="col-span-2"><strong>Description:</strong> {viewingProduct.description}</div>
          </div>
        </div>
      </div>
    );
  }

  if (editingProduct) {
    return (
      <div className="space-y-6">
        <button onClick={() => {
          setEditingProduct(null);
          setEditFormData(null);
          setSelectedImage(null);
          setImagePreview(null);
        }} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800">
          ← Back to Products
        </button>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">SKU</label>
                <input
                  type="text"
                  value={editFormData.sku}
                  onChange={(e) => setEditFormData({...editFormData, sku: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({...editFormData, price: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Discount Price (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editFormData.discount_price}
                  onChange={(e) => setEditFormData({...editFormData, discount_price: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
              <textarea
                value={editFormData.description}
                onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Product Image</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-slate-50 border-2 border-dashed flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Package size={24} className="text-slate-300" />
                  )}
                </div>
                <div>
                  <input type="file" onChange={handleImageChange} className="hidden" id="product-image" accept="image/*" />
                  <label htmlFor="product-image" className="inline-block px-4 py-2 bg-white border rounded-lg text-sm font-medium cursor-pointer hover:bg-slate-50">
                    Choose New Image
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editFormData.is_active}
                  onChange={(e) => setEditFormData({...editFormData, is_active: e.target.checked})}
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-slate-600">Active</span>
              </label>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700"
              >
                Update Product
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setEditFormData(null);
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
                className="bg-slate-100 text-slate-600 px-6 py-3 rounded-xl font-medium hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Product Management</h2>
          <p className="text-slate-500">Manage all products and their variants</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search products by name, SKU, or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">SKU</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Brand</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <React.Fragment key={product.product_id}>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleExpanded(product.product_id)}
                            className="p-1 hover:bg-slate-200 rounded"
                          >
                            {expandedProducts[product.product_id] ? 
                              <ChevronDown size={16} /> : 
                              <ChevronRight size={16} />
                            }
                          </button>
                          {product.image_url ? (
                            <img 
                              src={`http://localhost:3000${product.image_url}`} 
                              alt={product.name}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                              <Package size={20} className="text-slate-400" />
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-slate-800">{product.name}</div>
                            <div className="text-sm text-slate-500 truncate max-w-[200px]">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">
                          {product.sku}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600">{product.brand_name || 'No Brand'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600">Category Info</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.is_active 
                            ? 'bg-emerald-100 text-emerald-600' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {product.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleView(product)}
                            className="p-2 text-slate-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => handleEdit(product)}
                            className="p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-indigo-50"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.product_id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Variants Row */}
                    {expandedProducts[product.product_id] && (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 bg-slate-50">
                          <ProductVariants productId={product.product_id} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                    No products found.
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

const ProductVariants = ({ productId }) => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVariants();
  }, [productId]);

  const fetchVariants = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProductVariants(productId);
      setVariants(response.data || response);
    } catch (error) {
      console.error('Error fetching variants:', error);
      setVariants([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-slate-500">Loading variants...</div>;
  }

  if (variants.length === 0) {
    return <div className="text-center py-4 text-slate-500">No variants found for this product.</div>;
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-slate-700 flex items-center gap-2">
        <Shirt size={16} />
        Product Variants ({variants.length})
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {variants.map((variant) => (
          <div key={variant.variant_id} className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">
                  {variant.variant_sku}
                </span>
                <span className="text-lg font-semibold text-slate-800">
                  ${variant.price}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                {variant.size_name && (
                  <div className="flex items-center gap-1">
                    <Tag size={12} className="text-slate-400" />
                    <span>Size: {variant.size_name}</span>
                  </div>
                )}
                {variant.color_name && (
                  <div className="flex items-center gap-1">
                    <Palette size={12} className="text-slate-400" />
                    <span>Color: {variant.color_name}</span>
                  </div>
                )}
                {variant.fabric_name && (
                  <div className="text-xs text-slate-500">
                    Fabric: {variant.fabric_name}
                  </div>
                )}
                {variant.pattern_name && (
                  <div className="text-xs text-slate-500">
                    Pattern: {variant.pattern_name}
                  </div>
                )}
              </div>
              
              {variant.discount_price && (
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through text-slate-400">${variant.price}</span>
                  <span className="text-sm font-semibold text-red-600">${variant.discount_price}</span>
                </div>
              )}
              
              {variant.stock_quantity !== undefined && (
                <div className="text-xs text-slate-500">
                  Stock: {variant.stock_quantity} units
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

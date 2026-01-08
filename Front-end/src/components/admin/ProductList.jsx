import React, { useState, useEffect } from 'react';
import { Search, Eye, Edit, Trash2, ChevronDown, ChevronRight, Package, Tag, Palette, Shirt } from 'lucide-react';
import { productAPI } from '../../api/product.api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProducts, setExpandedProducts] = useState({});

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

  const filteredProducts = products.filter((product) => 
    product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                            <Package size={20} className="text-slate-400" />
                          </div>
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
                          <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-indigo-50">
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
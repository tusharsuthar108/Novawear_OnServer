import React, { useState, useEffect } from 'react';
import { productBadgeApi } from '../../api/productBadge.api';
import { Plus, X, Award, Search, Package, Tag } from 'lucide-react';

const BadgesOnProduct = () => {
  const [products, setProducts] = useState([]);
  const [availableBadges, setAvailableBadges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsResponse, badgesResponse] = await Promise.all([
        productBadgeApi.getProductsWithBadges(),
        productBadgeApi.getAvailableBadges()
      ]);

      if (productsResponse.success) {
        setProducts(productsResponse.data);
      }
      if (badgesResponse.success) {
        setAvailableBadges(badgesResponse.data.filter(badge => badge.is_active));
      }
    } catch (error) {
      setError('Failed to fetch data');
    }
  };

  const handleAddBadge = async (productId, badgeId) => {
    setLoading(true);
    try {
      const response = await productBadgeApi.addBadgeToProduct(productId, badgeId);
      if (response.success) {
        await fetchData();
        setSuccess('Badge added successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to add badge');
      }
    } catch (error) {
      setError('Error adding badge');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBadge = async (productId, badgeId) => {
    setLoading(true);
    try {
      const response = await productBadgeApi.removeBadgeFromProduct(productId, badgeId);
      if (response.success) {
        await fetchData();
        setSuccess('Badge removed successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to remove badge');
      }
    } catch (error) {
      setError('Error removing badge');
    } finally {
      setLoading(false);
    }
  };

  const openBadgeModal = (product) => {
    setSelectedProduct(product);
    setShowBadgeModal(true);
  };

  const closeBadgeModal = () => {
    setSelectedProduct(null);
    setShowBadgeModal(false);
  };

  // Filter products based on search
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.brand_name && product.brand_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalProducts = filteredProducts.length;
  const productsWithBadges = filteredProducts.filter(product => product.badges && product.badges.length > 0).length;

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
          <h1 className="text-2xl font-bold text-slate-900">Badges on Products</h1>
          <p className="text-slate-500 text-sm mt-1">Assign and manage badges for products</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Products</p>
            <h3 className="text-2xl font-bold text-slate-900">{totalProducts}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Products with Badges</p>
            <h3 className="text-2xl font-bold text-slate-900">{productsWithBadges}</h3>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
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
            onClick={fetchData} 
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[13px] uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Brand</th>
                <th className="px-6 py-4 font-semibold">SKU</th>
                <th className="px-6 py-4 font-semibold">Badges</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.product_id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 text-sm">{product.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{product.brand_name || 'No Brand'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] text-slate-400 font-semibold tracking-wider">{product.sku}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {product.badges && product.badges.length > 0 ? (
                          product.badges.map((badge) => (
                            <span 
                              key={badge.badge_id}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full text-[10px] font-bold uppercase tracking-wide"
                            >
                              {badge.badge_name}
                              <button
                                onClick={() => handleRemoveBadge(product.product_id, badge.badge_id)}
                                className="text-indigo-400 hover:text-red-500 ml-1"
                                disabled={loading}
                              >
                                <X size={12} />
                              </button>
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-400">No badges</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => openBadgeModal(product)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          disabled={loading}
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400 font-medium">
                    {searchTerm 
                      ? 'No products match your search.' 
                      : 'No products found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Badge Assignment Modal */}
      {showBadgeModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Add Badge to {selectedProduct.name}
              </h3>
              <button 
                onClick={closeBadgeModal}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              {availableBadges.map((badge) => {
                const isAssigned = selectedProduct.badges?.some(pb => pb.badge_id === badge.badge_id);
                return (
                  <div 
                    key={badge.badge_id}
                    className={`flex items-center justify-between p-3 border rounded-lg ${
                      isAssigned ? 'bg-slate-50 border-slate-200' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="font-medium text-slate-900">{badge.badge_name}</span>
                      {badge.description && (
                        <p className="text-sm text-slate-500">{badge.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        if (isAssigned) {
                          handleRemoveBadge(selectedProduct.product_id, badge.badge_id);
                        } else {
                          handleAddBadge(selectedProduct.product_id, badge.badge_id);
                        }
                        closeBadgeModal();
                      }}
                      disabled={loading}
                      className={`px-3 py-1 text-sm font-medium rounded-lg transition-all ${
                        isAssigned 
                          ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                      }`}
                    >
                      {isAssigned ? 'Remove' : 'Add'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgesOnProduct;
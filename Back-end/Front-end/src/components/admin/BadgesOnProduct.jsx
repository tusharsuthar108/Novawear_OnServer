import React, { useState, useEffect } from 'react';
import { productBadgeApi } from '../../api/productBadge.api';
import { Plus, X, Award, Search, Package, Tag } from 'lucide-react';

const BadgesOnProduct = () => {
  const [products, setProducts] = useState([]);
  const [availableBadges, setAvailableBadges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterBadge, setFilterBadge] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('Fetching products and badges...');
      
      // Try product-badge API first to get products with badges
      try {
        const productsResponse = await productBadgeApi.getProductsWithBadges();
        console.log('Product-badge API response:', productsResponse);
        
        if (productsResponse.success && productsResponse.data) {
          console.log('Using product-badge API data');
          setProducts(productsResponse.data);
        } else {
          // Fallback to direct products API
          console.log('Fallback: trying direct products API...');
          const directResponse = await fetch('http://localhost:3000/api/products');
          
          if (directResponse.ok) {
            const directData = await directResponse.json();
            console.log('Direct products response:', directData);
            
            if (directData.success && directData.data) {
              setProducts(directData.data.map(p => ({ ...p, badges: [] })));
            }
          }
        }
      } catch (productError) {
        console.log('Product-badge API failed, trying direct API:', productError);
        
        // Fallback to direct products API
        const directResponse = await fetch('http://localhost:3000/api/products');
        
        if (!directResponse.ok) {
          setError(`API Error: ${directResponse.status} - Server may not be running`);
          return;
        }
        
        const directData = await directResponse.json();
        if (directData.success && directData.data) {
          setProducts(directData.data.map(p => ({ ...p, badges: [] })));
        }
      }
      
      // Fetch badges
      try {
        const badgesResponse = await productBadgeApi.getAvailableBadges();
        console.log('Badges response:', badgesResponse);
        
        if (badgesResponse.success) {
          setAvailableBadges(badgesResponse.data);
        }
      } catch (badgeError) {
        console.log('Badge API failed:', badgeError);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Server connection failed. Make sure backend is running on port 3000.');
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

  const openProductModal = (badge) => {
    setSelectedBadge(badge);
    setShowProductModal(true);
    setProductSearchTerm('');
  };

  const closeProductModal = () => {
    setSelectedBadge(null);
    setShowProductModal(false);
    setProductSearchTerm('');
  };

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.brand_name && product.brand_name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesBadge = !filterBadge || 
      (product.badges && product.badges.some(b => b.badge_id === parseInt(filterBadge)));
    
    return matchesSearch && matchesBadge;
  });

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterBadge('');
  };

  const hasActiveFilters = searchTerm || filterBadge;

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

      {/* Add Products to Badges */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
            <Plus className="text-indigo-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Add Products to Badges</h3>
            <p className="text-sm text-slate-600">Click on any badge to assign it to products</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {availableBadges.map((badge) => {
            const productCount = filteredProducts.filter(p => 
              p.badges && p.badges.some(b => b.badge_id === badge.badge_id)
            ).length;
            return (
              <div 
                key={badge.badge_id} 
                className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 cursor-pointer min-h-[140px]"
                onClick={() => openProductModal(badge)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Award size={20} className="text-indigo-600" />
                    <span className="font-semibold text-slate-800 text-base">{badge.badge_name}</span>
                  </div>
                  <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full font-bold">
                    {productCount}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-slate-500 font-medium">
                    {productCount} {productCount === 1 ? 'product' : 'products'}
                  </span>
                  <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors group-hover:scale-105 transform duration-200 shadow-sm">
                    Assign
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
            <Search className="text-slate-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Search & Filter Products</h3>
            <p className="text-sm text-slate-600">Find products by name, brand, or badge</p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by product name or brand..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:border-slate-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={filterBadge}
              onChange={(e) => setFilterBadge(e.target.value)}
              className="px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:border-slate-300 min-w-[150px]"
            >
              <option value="">All Badges</option>
              {availableBadges.map((badge) => (
                <option key={badge.badge_id} value={badge.badge_id}>
                  {badge.badge_name}
                </option>
              ))}
            </select>
            
            <div className="text-sm text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-200">
              <span className="font-medium">{filteredProducts.length}</span> results
            </div>
            
            <button 
              onClick={fetchData} 
              className="px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Package size={16} />
              Refresh
            </button>
          </div>
        </div>
        
        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                  Search: "{searchTerm}"
                </span>
              )}
              {filterBadge && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Badge: {availableBadges.find(b => b.badge_id === parseInt(filterBadge))?.badge_name}
                </span>
              )}
            </div>
            <button
              onClick={clearAllFilters}
              className="px-3 py-1 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
            >
              Clear All
            </button>
          </div>
        )}
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

      {/* Product Assignment Modal */}
      {showProductModal && selectedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Assign "{selectedBadge.badge_name}" Badge to Products
              </h3>
              <button 
                onClick={closeProductModal}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={productSearchTerm}
                onChange={(e) => setProductSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2">
              {products
                .filter(product => 
                  product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
                  (product.brand_name && product.brand_name.toLowerCase().includes(productSearchTerm.toLowerCase()))
                )
                .map((product) => {
                  const hasBadge = product.badges?.some(b => b.badge_id === selectedBadge.badge_id);
                  return (
                    <div 
                      key={product.product_id}
                      className={`flex items-center justify-between p-3 border rounded-lg ${
                        hasBadge ? 'bg-indigo-50 border-indigo-200' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <span className="font-medium text-slate-900">{product.name}</span>
                        <p className="text-sm text-slate-500">{product.brand_name || 'No Brand'} • {product.sku}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (hasBadge) {
                            handleRemoveBadge(product.product_id, selectedBadge.badge_id);
                          } else {
                            handleAddBadge(product.product_id, selectedBadge.badge_id);
                          }
                        }}
                        disabled={loading}
                        className={`px-3 py-1 text-sm font-medium rounded-lg transition-all ${
                          hasBadge 
                            ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                        }`}
                      >
                        {hasBadge ? 'Remove' : 'Add'}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

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
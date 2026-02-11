import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Grid, List, Star, Heart, ShoppingBag, X } from 'lucide-react';
import { productAPI } from '../api/product.api';

export default function ProductGallery({ category, mainCategory, subCategory }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    brands: [],
    sizes: [],
    colors: [],
    rating: 0,
    sortBy: 'featured'
  });
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'brands' || filterType === 'sizes' || filterType === 'colors') {
        const currentValues = prev[filterType];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return { ...prev, [filterType]: newValues };
      }
      return { ...prev, [filterType]: value };
    });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      brands: [],
      sizes: [],
      colors: [],
      rating: 0,
      sortBy: 'featured'
    });
  };

  // Extract filter options from fetched products
  const filterOptions = {
    brands: [...new Set(products.map(p => p.brand_name).filter(Boolean))],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Blue', 'White', 'Gray', 'Red'],
    maxPrice: Math.max(...products.map(p => 1000), 10000)
  };

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand_name);
    return matchesBrand;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low': return (a.price || 0) - (b.price || 0);
      case 'price-high': return (b.price || 0) - (a.price || 0);
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
      <div className="px-14 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {subCategory || mainCategory || category || 'All Products'}
            </h1>
            <p className="text-gray-600 mt-2 text-lg">{loading ? 'Loading...' : `${filteredProducts.length} products found`}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <div className="flex border border-gray-300 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 transition-all ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 transition-all ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List size={18} />
              </button>
            </div>

            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 h-fit sticky top-24">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Clear All
                </button>
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 text-lg">Price Range</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange[0]}
                      onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || filterOptions.maxPrice])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 font-medium">
                    <span className="bg-gray-100 px-2 py-1 rounded-lg">₹{filters.priceRange[0]}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-lg">₹{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 text-lg">Brands</h4>
                <div className="space-y-3">
                  {filterOptions.brands.map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleFilterChange('brands', brand)}
                        className="w-4 h-4 rounded border-2 border-gray-300 focus:ring-2 focus:ring-black"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 text-lg">Sizes</h4>
                <div className="flex flex-wrap gap-3">
                  {filterOptions.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => handleFilterChange('sizes', size)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all transform hover:scale-105 ${
                        filters.sizes.includes(size)
                          ? 'bg-black text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 text-lg">Colors</h4>
                <div className="flex flex-wrap gap-3">
                  {filterOptions.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => handleFilterChange('colors', color)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all transform hover:scale-105 ${
                        filters.colors.includes(color)
                          ? 'bg-black text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Filters</h3>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X size={24} />
                  </button>
                </div>
                {/* Same filter content as desktop */}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-20">
                <div className="text-gray-500 text-lg">Loading products...</div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-500 text-lg">No products found</div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <div key={product.product_id} className="bg-white rounded-3xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image_url ? `http://localhost:3000${product.image_url}` : 'https://via.placeholder.com/400'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                        onClick={() => navigate(`/product/${product.product_id}`)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                      <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:scale-110">
                        <Heart size={18} className="text-gray-600 hover:text-red-500 transition-colors" />
                      </button>
                      <button className="absolute bottom-4 left-4 right-4 bg-black text-white py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center justify-center gap-2 font-medium hover:bg-gray-800">
                        <ShoppingBag size={18} />
                        Quick Add
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-black transition-colors">{product.name}</h3>
                      </div>
                      <p className="text-gray-600 mb-3 font-medium">{product.brand_name || 'No Brand'}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                          <Star size={14} fill="currentColor" className="text-yellow-500" />
                          <span className="text-sm font-bold text-yellow-700">4.2</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {product.discount_price ? (
                          <>
                            <span className="text-2xl font-bold text-gray-900">₹{parseFloat(product.discount_price).toLocaleString('en-IN')}</span>
                            <span className="text-sm text-gray-500 line-through">₹{parseFloat(product.price).toLocaleString('en-IN')}</span>
                          </>
                        ) : product.price ? (
                          <span className="text-2xl font-bold text-gray-900">₹{parseFloat(product.price).toLocaleString('en-IN')}</span>
                        ) : (
                          <span className="text-xl font-bold text-gray-900">₹</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-3xl shadow-lg overflow-hidden flex hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="w-64 h-64 flex-shrink-0 relative overflow-hidden rounded-l-3xl">
                      <img
                        src={`${product.images[0]}?w=400&h=400&fit=crop&crop=center`}
                        alt={product.name}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => navigate(`/product/${product.id}`)}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Product+Image';
                        }}
                      />
                    </div>
                    <div className="flex-1 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                          <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">{product.color}</span>
                        </div>
                        <p className="text-gray-600 mb-3 text-lg font-medium">{product.brand}</p>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-lg">
                            <Star size={16} fill="currentColor" className="text-yellow-500" />
                            <span className="font-bold text-yellow-700">{product.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">({product.reviews?.length || 0} reviews)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                          <span className="text-lg text-gray-500 line-through bg-gray-100 px-3 py-1 rounded-lg">₹{product.oldPrice.toLocaleString('en-IN')}</span>
                          <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                            {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                          </span>
                        </div>
                        <button className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                          <ShoppingBag size={18} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
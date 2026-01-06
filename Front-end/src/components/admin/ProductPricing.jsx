import React, { useState } from 'react';
import { Search, Edit, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const ProductPricing = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Nike Air Max", sku: "NAM001", currentPrice: 129.99, originalPrice: 149.99, category: "Shoes", status: "Sale" },
    { id: 2, name: "Adidas T-Shirt", sku: "ATS002", currentPrice: 29.99, originalPrice: 29.99, category: "Clothing", status: "Regular" },
    { id: 3, name: "Puma Jacket", sku: "PJ003", currentPrice: 89.99, originalPrice: 79.99, category: "Outerwear", status: "Increased" }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Product Pricing</h2>
          <p className="text-slate-500">Manage individual product prices</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">SKU</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Current Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Original Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-slate-800">{product.name}</div>
                      <div className="text-sm text-slate-500">{product.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{product.sku}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-slate-400" />
                      <span className="font-semibold text-slate-800">{product.currentPrice}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-slate-400" />
                      <span className="text-slate-600">{product.originalPrice}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {product.status === 'Sale' && <TrendingDown size={16} className="text-red-500" />}
                      {product.status === 'Increased' && <TrendingUp size={16} className="text-orange-500" />}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === 'Sale' ? 'bg-red-100 text-red-600' :
                        product.status === 'Increased' ? 'bg-orange-100 text-orange-600' :
                        'bg-emerald-100 text-emerald-600'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-indigo-50">
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductPricing;
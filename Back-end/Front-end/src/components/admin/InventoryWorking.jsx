import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, TrendingUp, RefreshCw, Search } from 'lucide-react';

const InventoryWorking = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/analytics/low-stock?threshold=50');
      const data = await response.json();
      if (data.success) {
        setInventory(data.data);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = inventory.filter(item =>
    item.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.variant_sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = inventory.filter(item => item.stock_quantity <= 10).length;
  const totalItems = inventory.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Monitor product stock levels</p>
        </div>
        <button onClick={fetchInventory} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
          <RefreshCw size={20} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Variants</p>
              <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Needs Restock</p>
              <p className="text-2xl font-bold text-red-600">{inventory.filter(i => i.stock_quantity === 0).length}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingUp className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Color</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-400">Loading...</td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{item.product_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.variant_sku}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.size_name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.color_name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.stock_quantity} units</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.stock_quantity === 0 ? 'bg-red-100 text-red-800' :
                        item.stock_quantity <= 10 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.stock_quantity === 0 ? 'Out of Stock' :
                         item.stock_quantity <= 10 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-400">No inventory found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryWorking;

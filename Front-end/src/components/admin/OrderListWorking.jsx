import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, Eye, Search, RefreshCw, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { orderService } from '../../services/orderService';
import OrderDetails from './OrderDetails';

const OrderListWorking = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllOrders();
      if (response.success) {
        setOrders(response.data || []);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      loadOrders();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.order_id?.toString().includes(searchQuery) ||
      order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = async (order) => {
    try {
      const response = await orderService.getOrderDetails(order.order_id);
      if (response.success) {
        setSelectedOrder(response.data);
        setShowOrderDetails(true);
      }
    } catch (error) {
      console.error('Error loading order details:', error);
    }
  };

  if (showOrderDetails && selectedOrder) {
    return (
      <OrderDetails 
        order={selectedOrder} 
        onBack={() => setShowOrderDetails(false)}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const orderStats = [
    { label: 'Total Orders', count: orders.length, icon: Package, color: 'bg-blue-500' },
    { label: 'Pending', count: orders.filter(o => o.status === 'Pending').length, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Processing', count: orders.filter(o => o.status === 'Processing').length, icon: Truck, color: 'bg-blue-600' },
    { label: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length, icon: CheckCircle, color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Order Management
            </h1>
            <p className="text-slate-600 text-lg">Track and manage all customer orders</p>
          </div>
          <button 
            onClick={loadOrders}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            <RefreshCw size={18} />
            <span className="font-medium">Refresh</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {orderStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                    <Icon size={18} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-bold text-slate-800">{stat.count}</div>
                  <div className="text-xs text-slate-600 font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search orders, customers, or emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all duration-200 text-slate-700 placeholder-slate-400"
              />
            </div>
            <button 
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 font-medium shadow-sm"
            >
              Clear All
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { key: 'all', label: 'All Orders', count: orders.length, gradient: 'from-indigo-500 to-purple-500' },
              { key: 'Pending', label: 'Pending', count: orders.filter(o => o.status === 'Pending').length, gradient: 'from-amber-500 to-orange-500' },
              { key: 'Processing', label: 'Processing', count: orders.filter(o => o.status === 'Processing').length, gradient: 'from-blue-500 to-indigo-500' },
              { key: 'Delivered', label: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length, gradient: 'from-emerald-500 to-teal-500' },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setStatusFilter(filter.key)}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold ${
                  statusFilter === filter.key 
                    ? `bg-gradient-to-r ${filter.gradient} text-white shadow-lg` 
                    : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm border border-slate-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr key={order.order_id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">#{order.order_id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {order.customer_name?.split(' ').map(n => n[0]).join('') || 'U'}
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">{order.customer_name || 'Unknown'}</div>
                          <div className="text-sm text-slate-500">{order.customer_email || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="text-slate-400" size={16} />
                        <span className="text-slate-700 font-medium">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.order_id, e.target.value)}
                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium border focus:outline-none focus:ring-2 cursor-pointer ${
                          order.status === 'Pending' ? 'bg-yellow-50 border-yellow-200 text-yellow-700 focus:ring-yellow-500' :
                          order.status === 'Processing' ? 'bg-blue-50 border-blue-200 text-blue-700 focus:ring-blue-500' :
                          order.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-700 focus:ring-green-500' :
                          'bg-slate-50 border-slate-200 text-slate-700 focus:ring-slate-500'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="text-emerald-500" size={16} />
                        <span className="font-bold text-slate-800">₹{order.total_amount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold ${
                        order.payment_status === 'Paid' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.payment_status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto text-slate-300 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No orders found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderListWorking;

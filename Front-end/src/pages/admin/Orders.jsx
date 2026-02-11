import React, { useState, useEffect } from 'react';
import { 
  Package, Truck, CheckCircle, Clock, Eye, Download, 
  Search, Filter, Calendar, MapPin, CreditCard, 
  ChevronDown, User, Phone, Mail, Star, Edit, Trash2,
  RefreshCw, X, ShoppingBag, AlertCircle, DollarSign, FileText
} from 'lucide-react';
import OrderDetails from '../../components/admin/OrderDetails';
import { orderService } from '../../services/orderService';

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const result = await orderService.getAllOrders();
    if (result.success) {
      setOrders(result.data);
    }
    setLoading(false);
  };

  const orderStats = [
    { label: 'Payment Refund', count: orders.filter(o => o.status === 'Payment Refund').length, icon: RefreshCw, color: 'text-red-500', bgColor: 'bg-red-50' },
    { label: 'Order Cancel', count: orders.filter(o => o.status === 'Cancelled').length, icon: X, color: 'text-orange-500', bgColor: 'bg-orange-50' },
    { label: 'Order Shipped', count: orders.filter(o => o.status === 'Shipped').length, icon: Truck, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { label: 'Order Delivering', count: orders.filter(o => o.status === 'In Transit').length, icon: Package, color: 'text-purple-500', bgColor: 'bg-purple-50' },
    { label: 'Pending Review', count: orders.filter(o => o.status === 'Pending Review').length, icon: AlertCircle, color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    { label: 'Pending Payment', count: orders.filter(o => o.status === 'Pending Payment').length, icon: DollarSign, color: 'text-pink-500', bgColor: 'bg-pink-50' },
    { label: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length, icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-50' },
    { label: 'In Progress', count: orders.filter(o => o.status === 'Processing').length, icon: Clock, color: 'text-indigo-500', bgColor: 'bg-indigo-50' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <Clock className="w-4 h-4" />;
      case 'In Transit': return <Truck className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Shipped':
      case 'In Transit': return 'bg-blue-100 text-blue-700';
      case 'Delivered': return 'bg-emerald-100 text-emerald-600';
      case 'Processing':
      case 'Pending': return 'bg-amber-100 text-amber-600';
      case 'Cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.order_id.toString().includes(searchQuery) ||
      order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === '' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = async (order) => {
    const result = await orderService.getOrderDetails(order.order_id);
    if (result.success) {
      setSelectedOrder(result.data);
      setShowOrderDetails(true);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Orders Management</h2>
          <p className="text-slate-500">Manage and track all customer orders</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadOrders} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-slate-800">
            <RefreshCw size={16} className="inline mr-2" />
            Refresh
          </button>
          <span className="text-sm text-slate-500">Total Orders: {orders.length}</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
        {orderStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-2xl p-4 border border-white/20 shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between mb-2">
                <IconComponent className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{stat.count}</div>
              <div className="text-xs font-medium text-slate-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by order ID, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-w-[200px]"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Items</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                    Loading orders...
                  </td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.order_id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">#{order.order_id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-slate-800">{order.customer_name}</div>
                        <div className="text-sm text-slate-500">{order.customer_email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600">{new Date(order.created_at).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">₹{order.total_amount}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600">{order.item_count} items</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-slate-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                    No orders found.
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

export default AdminOrders;

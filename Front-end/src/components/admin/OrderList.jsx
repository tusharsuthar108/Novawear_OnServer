import React, { useState } from 'react';
import { 
  Package, Truck, CheckCircle, Clock, Eye, Search, Filter, 
  Edit, Trash2, User, Phone, Mail, Calendar, DollarSign,
  MoreVertical, Download, RefreshCw, TrendingUp
} from 'lucide-react';
import OrderDetails from './OrderDetails';

const OrderList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orders, setOrders] = useState([
    {
      id: '#NW-2024-001',
      customerName: 'John Smith',
      customerEmail: 'john.smith@email.com',
      customerPhone: '+1 (555) 123-4567',
      date: 'Dec 15, 2024',
      status: 'Processing',
      total: '₹4,998',
      items: 2,
      paymentStatus: 'Paid',
      orderItems: [
        { id: 1, name: 'Premium Cotton T-Shirt', size: 'L', color: 'Navy Blue', quantity: 1, price: '₹2,499' },
        { id: 2, name: 'Casual Denim Jeans', size: '32', color: 'Dark Blue', quantity: 1, price: '₹2,499' }
      ],
      shippingAddress: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      }
    },
    {
      id: '#NW-2024-002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@email.com',
      customerPhone: '+1 (555) 987-6543',
      date: 'Dec 14, 2024',
      status: 'Shipped',
      total: '₹7,497',
      items: 3,
      paymentStatus: 'Paid',
      orderItems: [
        { id: 1, name: 'Designer Hoodie', size: 'M', color: 'Black', quantity: 1, price: '₹3,999' },
        { id: 2, name: 'Sports Sneakers', size: '8', color: 'White', quantity: 1, price: '₹2,499' },
        { id: 3, name: 'Baseball Cap', size: 'One Size', color: 'Red', quantity: 1, price: '₹999' }
      ],
      shippingAddress: {
        street: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'United States'
      }
    },
    {
      id: '#NW-2024-003',
      customerName: 'Mike Wilson',
      customerEmail: 'mike.w@email.com',
      customerPhone: '+1 (555) 456-7890',
      date: 'Dec 13, 2024',
      status: 'Delivered',
      total: '₹2,999',
      items: 1,
      paymentStatus: 'Paid',
      orderItems: [
        { id: 1, name: 'Leather Jacket', size: 'XL', color: 'Brown', quantity: 1, price: '₹2,999' }
      ],
      shippingAddress: {
        street: '789 Pine Road',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'United States'
      }
    },
    {
      id: '#NW-2024-004',
      customerName: 'Emma Davis',
      customerEmail: 'emma.d@email.com',
      customerPhone: '+1 (555) 321-0987',
      date: 'Dec 12, 2024',
      status: 'Cancelled',
      total: '₹5,499',
      items: 2,
      paymentStatus: 'Refunded',
      orderItems: [
        { id: 1, name: 'Winter Coat', size: 'S', color: 'Navy', quantity: 1, price: '₹3,999' },
        { id: 2, name: 'Wool Scarf', size: 'One Size', color: 'Grey', quantity: 1, price: '₹1,500' }
      ],
      shippingAddress: {
        street: '321 Elm Street',
        city: 'Miami',
        state: 'FL',
        zipCode: '33101',
        country: 'United States'
      }
    }
  ]);

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  if (showOrderDetails && selectedOrder) {
    return (
      <OrderDetails 
        order={selectedOrder} 
        onBack={() => setShowOrderDetails(false)}
      />
    );
  }

  console.log('Orders:', orders);
  console.log('Filtered Orders:', filteredOrders);
  console.log('Search Query:', searchQuery);
  console.log('Status Filter:', statusFilter);

  const orderStats = [
    { label: 'Total Orders', count: orders.length },
    { label: 'Processing', count: orders.filter(o => o.status === 'Processing').length },
    { label: 'Shipped', count: orders.filter(o => o.status === 'Shipped').length },
    { label: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length },
    { label: 'Cancelled', count: orders.filter(o => o.status === 'Cancelled').length },
    { label: 'Paid Orders', count: orders.filter(o => o.paymentStatus === 'Paid').length },
    { label: 'Refunded', count: orders.filter(o => o.paymentStatus === 'Refunded').length },
    { label: 'Total Revenue', count: `₹${orders.filter(o => o.paymentStatus === 'Paid').reduce((sum, order) => sum + parseInt(order.total.replace(/[₹,]/g, '')), 0).toLocaleString()}` }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Order Management
            </h1>
            <p className="text-slate-600 text-lg">Track and manage all customer orders efficiently</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl hover:bg-white transition-all duration-200 shadow-sm">
              <RefreshCw size={18} className="text-slate-600" />
              <span className="text-slate-700 font-medium">Refresh</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Download size={18} />
              <span className="font-medium">Export</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {orderStats.map((stat, index) => {
            const icons = [Package, Clock, Truck, CheckCircle, Trash2, DollarSign, RefreshCw, TrendingUp];
            const Icon = icons[index];
            const colors = [
              'bg-blue-500',
              'bg-yellow-500', 
              'bg-blue-600',
              'bg-green-500',
              'bg-red-500',
              'bg-emerald-500',
              'bg-orange-500',
              'bg-purple-500'
            ];
            return (
              <div key={index} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${colors[index]} text-white`}>
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

        {/* Search and Filters */}
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
              { key: 'Processing', label: 'Processing', count: orders.filter(o => o.status === 'Processing').length, gradient: 'from-amber-500 to-orange-500' },
              { key: 'Shipped', label: 'Shipped', count: orders.filter(o => o.status === 'Shipped').length, gradient: 'from-blue-500 to-indigo-500' },
              { key: 'Delivered', label: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length, gradient: 'from-emerald-500 to-teal-500' },
              { key: 'Cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'Cancelled').length, gradient: 'from-red-500 to-rose-500' }
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

        {/* Orders Table */}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{order.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {order.customerName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">{order.customerName}</div>
                          <div className="text-sm text-slate-500">{order.customerEmail}</div>
                          <div className="text-xs text-slate-400">{order.customerPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="text-slate-400" size={16} />
                        <span className="text-slate-700 font-medium">{order.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          className={`w-full px-4 py-2 rounded-lg text-sm font-medium border focus:outline-none focus:ring-2 cursor-pointer ${
                            order.status === 'Processing' ? 'bg-yellow-50 border-yellow-200 text-yellow-700 focus:ring-yellow-500' :
                            order.status === 'Shipped' ? 'bg-blue-50 border-blue-200 text-blue-700 focus:ring-blue-500' :
                            order.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-700 focus:ring-green-500' :
                            order.status === 'Cancelled' ? 'bg-red-50 border-red-200 text-red-700 focus:ring-red-500' :
                            'bg-slate-50 border-slate-200 text-slate-700 focus:ring-slate-500'
                          }`}
                        >
                          <option value="Processing" className="bg-white text-yellow-700">Processing</option>
                          <option value="Shipped" className="bg-white text-blue-700">Shipped</option>
                          <option value="Delivered" className="bg-white text-green-700">Delivered</option>
                          <option value="Cancelled" className="bg-white text-red-700">Cancelled</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="text-emerald-500" size={16} />
                        <span className="font-bold text-slate-800">{order.total}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                        {order.items} item{order.items > 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold ${
                        order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                        order.paymentStatus === 'Refunded' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.paymentStatus}
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

export default OrderList;
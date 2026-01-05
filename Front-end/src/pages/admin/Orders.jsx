import React, { useState } from 'react';
import { 
  Package, Truck, CheckCircle, Clock, Eye, Download, 
  Search, Filter, Calendar, MapPin, CreditCard, 
  ChevronDown, User, Phone, Mail, Star, Edit, Trash2,
  RefreshCw, X, ShoppingBag, AlertCircle, DollarSign, FileText
} from 'lucide-react';
import OrderDetails from '../../components/admin/OrderDetails';

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const orderStats = [
    { label: 'Payment Refund', count: 490, icon: RefreshCw, color: 'text-red-500', bgColor: 'bg-red-50' },
    { label: 'Order Cancel', count: 241, icon: X, color: 'text-orange-500', bgColor: 'bg-orange-50' },
    { label: 'Order Shipped', count: 630, icon: Truck, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { label: 'Order Delivering', count: 170, icon: Package, color: 'text-purple-500', bgColor: 'bg-purple-50' },
    { label: 'Pending Review', count: 210, icon: AlertCircle, color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    { label: 'Pending Payment', count: 608, icon: DollarSign, color: 'text-pink-500', bgColor: 'bg-pink-50' },
    { label: 'Delivered', count: 200, icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-50' },
    { label: 'In Progress', count: 656, icon: Clock, color: 'text-indigo-500', bgColor: 'bg-indigo-50' }
  ];

  const orders = [
    {
      id: '#NW-2024-001',
      customerName: 'John Smith',
      customerEmail: 'john.smith@email.com',
      customerPhone: '+1 (555) 123-4567',
      date: 'Dec 15, 2024',
      status: 'In Transit',
      total: '₹4,998',
      items: [
        { 
          name: 'ARCHITECTURAL OVERSIZED TEE', 
          size: 'L', 
          color: 'Black', 
          qty: 2, 
          price: '₹2,499', 
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' 
        },
        { 
          name: 'MINIMAL CARGO PANTS', 
          size: 'M', 
          color: 'Khaki', 
          qty: 1, 
          price: '₹2,499', 
          image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100' 
        }
      ],
      shippingAddress: {
        street: '123 Tech Lane',
        city: 'Silicon Valley',
        state: 'CA',
        zip: '94043',
        country: 'USA'
      },
      billingAddress: {
        street: '123 Tech Lane',
        city: 'Silicon Valley',
        state: 'CA',
        zip: '94043',
        country: 'USA'
      },
      paymentMethod: 'Credit Card ****1234',
      estimatedDelivery: 'Dec 18, 2024',
      statusColor: 'blue',
      trackingNumber: 'TRK123456789'
    },
    {
      id: '#NW-2024-002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@email.com',
      customerPhone: '+1 (555) 987-6543',
      date: 'Dec 10, 2024',
      status: 'Delivered',
      total: '₹7,497',
      items: [
        { 
          name: 'PREMIUM HOODIE', 
          size: 'XL', 
          color: 'Navy', 
          qty: 1, 
          price: '₹3,999', 
          image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100' 
        },
        { 
          name: 'STREET JOGGERS', 
          size: 'L', 
          color: 'Gray', 
          qty: 1, 
          price: '₹2,499', 
          image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100' 
        }
      ],
      shippingAddress: {
        street: '456 Fashion Ave',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA'
      },
      billingAddress: {
        street: '456 Fashion Ave',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA'
      },
      paymentMethod: 'UPI Payment',
      deliveredDate: 'Dec 12, 2024',
      statusColor: 'green',
      trackingNumber: 'TRK987654321',
      rating: 5
    },
    {
      id: '#NW-2024-003',
      customerName: 'Mike Wilson',
      customerEmail: 'mike.w@email.com',
      customerPhone: '+1 (555) 456-7890',
      date: 'Dec 14, 2024',
      status: 'Processing',
      total: '₹2,999',
      items: [
        { 
          name: 'BASIC TEE', 
          size: 'M', 
          color: 'White', 
          qty: 3, 
          price: '₹999', 
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' 
        }
      ],
      shippingAddress: {
        street: '789 Main St',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        country: 'USA'
      },
      billingAddress: {
        street: '789 Main St',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        country: 'USA'
      },
      paymentMethod: 'PayPal',
      estimatedDelivery: 'Dec 17, 2024',
      statusColor: 'yellow',
      trackingNumber: 'TRK456789123'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <Clock className="w-4 h-4" />;
      case 'In Transit': return <Truck className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-700';
      case 'green': return 'bg-emerald-100 text-emerald-600';
      case 'yellow': return 'bg-amber-100 text-amber-600';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === '' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} />
    ));
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
            <option value="Processing">Processing</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Payment Refund">Payment Refund</option>
            <option value="Order Cancel">Order Cancel</option>
            <option value="Order Shipped">Order Shipped</option>
            <option value="Order Delivering">Order Delivering</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Pending Payment">Pending Payment</option>
            <option value="In Progress">In Progress</option>
          </select>

          <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Filter by Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-3">
          <button
            onClick={() => setSelectedStatus('')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${
              selectedStatus === '' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span className="text-sm">All Orders</span>
          </button>
          {orderStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <button
                key={index}
                onClick={() => setSelectedStatus(stat.label)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                  selectedStatus === stat.label 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm">{stat.label}</span>
              </button>
            );
          })}
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
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{order.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-slate-800">{order.customerName}</div>
                        <div className="text-sm text-slate-500">{order.customerEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600">{order.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.statusColor)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{order.total}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600">{order.items.length} items</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleViewOrder(order)}
                          className="p-2 text-slate-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-indigo-50">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                          <Trash2 size={16} />
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
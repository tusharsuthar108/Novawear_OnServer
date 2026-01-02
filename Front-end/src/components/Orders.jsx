import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, Eye, Download, RotateCcw, Star, Calendar, MapPin, CreditCard, Filter, Search, ChevronDown } from 'lucide-react';

const Orders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const orders = [
    {
      id: '#NW-2024-001',
      date: 'Dec 15, 2024',
      status: 'In Transit',
      total: '₹4,998',
      items: [
        { name: 'ARCHITECTURAL OVERSIZED TEE', size: 'L', color: 'Black', qty: 2, price: '₹2,499', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' },
        { name: 'MINIMAL CARGO PANTS', size: 'M', color: 'Khaki', qty: 1, price: '₹2,499', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100' }
      ],
      shippingAddress: '123 Tech Lane, Silicon Valley, CA 94043',
      paymentMethod: 'Credit Card ****1234',
      estimatedDelivery: 'Dec 18, 2024',
      statusColor: 'blue',
      category: 'active'
    },
    {
      id: '#NW-2024-002',
      date: 'Dec 10, 2024',
      status: 'Delivered',
      total: '₹7,497',
      items: [
        { name: 'PREMIUM HOODIE', size: 'XL', color: 'Navy', qty: 1, price: '₹3,999', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100' },
        { name: 'STREET JOGGERS', size: 'L', color: 'Gray', qty: 1, price: '₹2,499', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100' },
        { name: 'BASIC TEE', size: 'M', color: 'White', qty: 1, price: '₹999', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' }
      ],
      shippingAddress: '456 Fashion Ave, New York, NY 10001',
      paymentMethod: 'UPI Payment',
      deliveredDate: 'Dec 12, 2024',
      statusColor: 'green',
      category: 'delivered',
      rating: 5
    },
    {
      id: '#NW-2023-045',
      date: 'Nov 25, 2023',
      status: 'Delivered',
      total: '₹5,998',
      items: [
        { name: 'WINTER COAT', size: 'M', color: 'Black', qty: 1, price: '₹3,999', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100' },
        { name: 'WOOL SCARF', size: 'OS', color: 'Gray', qty: 1, price: '₹1,999', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=100' }
      ],
      shippingAddress: '321 Winter Ave, Chicago, IL 60601',
      paymentMethod: 'Credit Card ****9012',
      deliveredDate: 'Nov 28, 2023',
      statusColor: 'green',
      category: 'past',
      rating: 4
    },
    {
      id: '#NW-2022-089',
      date: 'Dec 20, 2022',
      status: 'Delivered',
      total: '₹4,299',
      items: [
        { name: 'HOLIDAY SWEATER', size: 'L', color: 'Red', qty: 1, price: '₹4,299', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100' }
      ],
      shippingAddress: '123 Holiday Lane, Boston, MA 02101',
      paymentMethod: 'Credit Card ****3456',
      deliveredDate: 'Dec 23, 2022',
      statusColor: 'green',
      category: 'past',
      rating: 5
    },
    {
      id: '#NW-2022-067',
      date: 'Aug 10, 2022',
      status: 'Delivered',
      total: '₹2,999',
      items: [
        { name: 'SUMMER DRESS', size: 'M', color: 'Blue', qty: 1, price: '₹2,999', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100' }
      ],
      shippingAddress: '456 Summer St, Austin, TX 78701',
      paymentMethod: 'PayPal',
      deliveredDate: 'Aug 13, 2022',
      statusColor: 'green',
      category: 'past',
      rating: 4
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
      case 'green': return 'bg-green-100 text-green-700';
      case 'yellow': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getYears = () => {
    const years = [...new Set(orders.map(order => new Date(order.date).getFullYear()))];
    return years.sort((a, b) => b - a);
  };

  const getMonths = () => {
    return ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
  };

  const filteredOrders = orders.filter(order => {
    // Tab filter
    let tabMatch = true;
    if (activeTab === 'active') tabMatch = order.category === 'active';
    else if (activeTab === 'delivered') tabMatch = order.category === 'delivered';
    else if (activeTab === 'past') tabMatch = order.category === 'past';

    // Search filter
    const searchMatch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase());

    // Year filter
    const orderYear = new Date(order.date).getFullYear();
    const yearMatch = selectedYear === 'all' || orderYear.toString() === selectedYear;

    // Month filter
    const orderMonth = new Date(order.date).getMonth();
    const monthMatch = selectedMonth === 'all' || getMonths()[orderMonth] === selectedMonth;

    return tabMatch && searchMatch && yearMatch && monthMatch;
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage all your orders</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by ID, product name, or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Years</option>
                    {getYears().map(year => (
                      <option key={year} value={year.toString()}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Months</option>
                    {getMonths().map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedYear('all');
                    setSelectedMonth('all');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg p-2 mb-8 shadow-sm border border-gray-200">
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All Orders', count: filteredOrders.length },
              { key: 'active', label: 'Active', count: orders.filter(o => o.category === 'active').length },
              { key: 'delivered', label: 'Recent', count: orders.filter(o => o.category === 'delivered').length },
              { key: 'past', label: 'Past Orders', count: orders.filter(o => o.category === 'past').length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.key 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeTab === tab.key ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {activeTab === 'all' ? filteredOrders.length : tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-gray-900">{order.id}</h3>
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.statusColor)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-gray-900">{order.total}</p>
                    <p className="text-sm text-gray-500">{order.items.length} items</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Ordered: {order.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{order.shippingAddress.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{order.paymentMethod}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500">Size: {item.size} • Color: {item.color}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">Qty: {item.qty}</span>
                          <span className="font-semibold text-sm">{item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {order.status === 'Delivered' && order.deliveredDate && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-green-800">Delivered on {order.deliveredDate}</p>
                        <p className="text-sm text-green-600">Your order was successfully delivered</p>
                      </div>
                      {order.rating && (
                        <div className="flex items-center gap-1">
                          {renderStars(order.rating)}
                          <span className="text-sm text-gray-600 ml-1">({order.rating}/5)</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => navigate('/track-order')}
                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Track Order
                  </button>
                  
                  <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Download Invoice
                  </button>

                  {order.status === 'Delivered' && (
                    <button className="flex items-center gap-2 border border-blue-300 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                      <RotateCcw className="w-4 h-4" />
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
import React, { useState } from 'react';
import TrackingStep from '../components/TrackingStep';
import { MapPin, Phone, Mail, Package, Truck, CreditCard, Download, Headphones, ArrowLeft, Edit, X, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TrackOrderPage = () => {
  const navigate = useNavigate();
  const [showChangeAddress, setShowChangeAddress] = useState(false);
  const [showCancelOrder, setShowCancelOrder] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [shippingPrice, setShippingPrice] = useState('₹99');
  const [loading, setLoading] = useState(false);
  
  const cancelReasons = [
    'Changed my mind',
    'Found better price elsewhere',
    'Ordered by mistake',
    'Delivery taking too long',
    'Product no longer needed',
    'Other'
  ];

  const handleAddressChange = async () => {
    setLoading(true);
    // Simulate API call to fetch shipping price
    setTimeout(() => {
      const prices = ['₹99', '₹149', '₹199', '₹249'];
      const randomPrice = prices[Math.floor(Math.random() * prices.length)];
      setShippingPrice(randomPrice);
      setLoading(false);
    }, 1000);
  };

  const openChangeAddress = () => {
    // Check if order is shipped - if yes, don't allow address change
    const isShipped = orderData.steps.some(step => 
      (step.title === 'Shipped' || step.title === 'Out for Delivery' || step.title === 'Delivered') && 
      step.status === 'completed'
    );
    
    if (isShipped) {
      alert('Address cannot be changed after the order has been shipped.');
      return;
    }
    
    // Pre-fill with current address
    setNewAddress({
      street: orderData.shippingAddress.street,
      city: orderData.shippingAddress.city,
      state: orderData.shippingAddress.state,
      pincode: orderData.shippingAddress.pincode
    });
    setShowChangeAddress(true);
  };
  const orderData = {
    orderId: '#NW-2024-001',
    trackingId: 'FDX098765432',
    orderDate: 'Dec 15, 2024',
    estimatedDelivery: 'Dec 18, 2024',
    totalAmount: '₹4,998',
    paymentMethod: 'Credit Card ****1234',
    customer: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+91 9876543210'
    },
    shippingAddress: {
      street: '123 Tech Lane, Apartment 4B',
      city: 'Silicon Valley',
      state: 'CA',
      pincode: '94043',
      country: 'USA'
    },
    items: [
      { id: 1, name: 'ARCHITECTURAL OVERSIZED TEE', size: 'L', color: 'Black', qty: 2, price: '₹2,499', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200' },
      { id: 2, name: 'MINIMAL CARGO PANTS', size: 'M', color: 'Khaki', qty: 1, price: '₹2,499', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200' }
    ],
    steps: [
      { title: 'Order Placed', description: 'Order confirmed and payment received', date: 'Dec 15, 2024 - 10:30 AM', status: 'completed' },
      { title: 'Processing', description: 'Items being packed at warehouse', date: 'Dec 15, 2024 - 02:15 PM', status: 'completed' },
      { title: 'Shipped', description: 'Package in transit via FedEx Express', date: 'Dec 16, 2024 - 08:45 AM', status: 'active' },
      { title: 'Delivered', description: 'Package delivered to doorstep', date: 'Expected: Dec 18', status: 'pending' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Orders</span>
        </button>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                In Transit
              </div>
              <span className="text-gray-500 font-mono text-sm">{orderData.orderId}</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
              <p className="text-xl font-bold text-gray-900">{orderData.estimatedDelivery}</p>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600 text-lg">Real-time updates on your package journey</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-8">
            
            {/* Order Actions Bar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={openChangeAddress}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    orderData.steps.some(step => 
                      (step.title === 'Shipped' || step.title === 'Out for Delivery' || step.title === 'Delivered') && 
                      step.status === 'completed'
                    ) 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                  disabled={orderData.steps.some(step => 
                    (step.title === 'Shipped' || step.title === 'Out for Delivery' || step.title === 'Delivered') && 
                    step.status === 'completed'
                  )}
                >
                  <Edit className="w-4 h-4" />
                  Change Address
                </button>
                <button 
                  onClick={() => setShowCancelOrder(true)}
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel Order
                </button>
                <button className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  <Download className="w-4 h-4" />
                  Download Invoice
                </button>
                <button className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  <Headphones className="w-4 h-4" />
                  Contact Support
                </button>
              </div>
            </div>
            
            {/* Tracking Timeline */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Live Tracking</h3>
                  <p className="text-gray-500 font-mono text-sm">{orderData.trackingId}</p>
                </div>
              </div>
              
              <div className="max-w-lg">
                {orderData.steps.map((step, index) => (
                  <TrackingStep
                    key={index}
                    title={step.title}
                    description={step.description}
                    date={step.date}
                    isCompleted={step.status === 'completed'}
                    isActive={step.status === 'active'}
                    isLast={index === orderData.steps.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Items Ordered */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-8">Order Items ({orderData.items.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orderData.items.map((item, index) => (
                  <div 
                    key={index} 
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="group flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">Size: {item.size} • Color: {item.color}</p>
                      <div className="flex items-center justify-between">
                        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                          Qty: {item.qty}
                        </span>
                        <span className="font-bold text-gray-900">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            
            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-6">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Order Date</span>
                  <span className="font-medium text-gray-900">{orderData.orderDate}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Payment</span>
                  <span className="font-medium text-gray-900">Card ****1234</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total Amount</span>
                    <span className="font-bold text-xl text-gray-900">{orderData.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-700" />
                Delivery Address
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">{orderData.customer.name}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {orderData.shippingAddress.street}<br/>
                  {orderData.shippingAddress.city}, {orderData.shippingAddress.state}<br/>
                  {orderData.shippingAddress.pincode}, {orderData.shippingAddress.country}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-6">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{orderData.customer.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{orderData.customer.phone}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Invoice
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Headphones className="w-4 h-4" />
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Address Modal */}
      {showChangeAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Change Delivery Address</h3>
              <button onClick={() => setShowChangeAddress(false)}>
                <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            
            {/* Current Address */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Current Address:</h4>
              <p className="text-sm text-gray-600">
                {orderData.shippingAddress.street}, {orderData.shippingAddress.city}, {orderData.shippingAddress.state} - {orderData.shippingAddress.pincode}
              </p>
            </div>

            {/* New Address Form */}
            <div className="space-y-4 mb-6">
              <h4 className="font-semibold text-gray-900">New Address:</h4>
              <input 
                type="text" 
                placeholder="Street Address" 
                value={newAddress.street}
                onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                onBlur={handleAddressChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="City" 
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                  onBlur={handleAddressChange}
                  className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="State" 
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                  onBlur={handleAddressChange}
                  className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input 
                type="text" 
                placeholder="Pincode" 
                value={newAddress.pincode}
                onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                onBlur={handleAddressChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Shipping Price Update */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-blue-700 font-medium">Updated Shipping Cost:</span>
                <div className="flex items-center gap-2">
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="font-bold text-blue-700">{shippingPrice}</span>
                  )}
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-1">Shipping cost may vary based on location</p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowChangeAddress(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                disabled={!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.pincode}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Update Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {showCancelOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                Cancel Order
              </h3>
              <button onClick={() => setShowCancelOrder(false)}>
                <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">Please select a reason for cancelling your order:</p>
            <div className="space-y-3 mb-6">
              {cancelReasons.map((reason, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="radio" 
                    name="cancelReason" 
                    value={reason}
                    checked={cancelReason === reason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="text-red-600 focus:ring-red-500"
                  />
                  <span className="text-gray-700">{reason}</span>
                </label>
              ))}
            </div>
            {cancelReason === 'Other' && (
              <textarea 
                placeholder="Please specify your reason..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-6"
                rows="3"
              />
            )}
            <div className="flex gap-4">
              <button 
                onClick={() => setShowCancelOrder(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
              >
                Keep Order
              </button>
              <button 
                disabled={!cancelReason}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
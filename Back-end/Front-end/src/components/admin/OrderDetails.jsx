import React from 'react';
import { 
  ArrowLeft, Package, User, Phone, Mail, MapPin, Calendar, 
  DollarSign, Truck, CheckCircle, Clock, CreditCard, Star
} from 'lucide-react';

const OrderDetails = ({ order, onBack }) => {
  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto text-slate-300 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">Order not found</h3>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  // Mock detailed order data
  const orderDetails = {
    ...order,
    shippingAddress: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    billingAddress: {
      street: '123 Main Street',
      city: 'New York', 
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    orderItems: [
      {
        id: 1,
        name: 'Premium Cotton T-Shirt',
        image: '/api/placeholder/80/80',
        size: 'L',
        color: 'Navy Blue',
        quantity: 1,
        price: '₹2,499',
        total: '₹2,499'
      },
      {
        id: 2,
        name: 'Casual Denim Jeans',
        image: '/api/placeholder/80/80',
        size: '32',
        color: 'Dark Blue',
        quantity: 1,
        price: '₹2,499',
        total: '₹2,499'
      }
    ],
    timeline: [
      { status: 'Order Placed', date: 'Dec 15, 2024 10:30 AM', completed: true },
      { status: 'Payment Confirmed', date: 'Dec 15, 2024 10:32 AM', completed: true },
      { status: 'Processing', date: 'Dec 15, 2024 2:15 PM', completed: order?.status !== 'Processing' },
      { status: 'Shipped', date: order?.status === 'Shipped' || order?.status === 'Delivered' ? 'Dec 16, 2024 9:00 AM' : '', completed: order?.status === 'Shipped' || order?.status === 'Delivered' },
      { status: 'Delivered', date: order?.status === 'Delivered' ? 'Dec 18, 2024 3:45 PM' : '', completed: order?.status === 'Delivered' }
    ]
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <Clock className="text-yellow-600" size={20} />;
      case 'Shipped': return <Truck className="text-blue-600" size={20} />;
      case 'Delivered': return <CheckCircle className="text-green-600" size={20} />;
      case 'Cancelled': return <Package className="text-red-600" size={20} />;
      default: return <Package className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Order Details
            </h1>
            <p className="text-slate-600">Order {order?.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Package className="text-indigo-600" size={24} />
                Order Items
              </h2>
              <div className="space-y-4">
                {orderDetails.orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <Package className="text-indigo-600" size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{item.name}</h3>
                      <div className="text-sm text-slate-600 mt-1">
                        <span>Size: {item.size}</span> • <span>Color: {item.color}</span>
                      </div>
                      <div className="text-sm text-slate-500 mt-1">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-slate-800">{item.total}</div>
                      <div className="text-sm text-slate-500">{item.price} each</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Clock className="text-indigo-600" size={24} />
                Order Timeline
              </h2>
              <div className="space-y-4">
                {orderDetails.timeline.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-100 border-2 border-green-500' : 'bg-slate-100 border-2 border-slate-300'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="text-green-600" size={20} />
                      ) : (
                        <Clock className="text-slate-400" size={20} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${step.completed ? 'text-slate-800' : 'text-slate-500'}`}>
                        {step.status}
                      </div>
                      {step.date && (
                        <div className="text-sm text-slate-500">{step.date}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                {getStatusIcon(order?.status)}
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Order ID</span>
                  <span className="font-semibold text-slate-800">{order?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Order Date</span>
                  <span className="font-semibold text-slate-800">{order?.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order?.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                    order?.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                    order?.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order?.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {order?.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Payment Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order?.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                    order?.paymentStatus === 'Refunded' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {order?.paymentStatus}
                  </span>
                </div>
                <hr className="border-slate-200" />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-slate-800">Total</span>
                  <span className="text-slate-800">{order?.total}</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <User className="text-indigo-600" size={24} />
                Customer Info
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {order?.customerName?.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{order?.customerName}</div>
                    <div className="text-sm text-slate-500">Customer</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="text-slate-400" size={16} />
                    <span className="text-slate-600">{order?.customerEmail}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-slate-400" size={16} />
                    <span className="text-slate-600">{order?.customerPhone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <MapPin className="text-indigo-600" size={24} />
                Shipping Address
              </h2>
              <div className="text-slate-600 space-y-1">
                <div>{orderDetails.shippingAddress.street}</div>
                <div>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}</div>
                <div>{orderDetails.shippingAddress.country}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
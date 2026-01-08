import React, { useState } from 'react';
import { 
  CheckCircle, X, Clock, Eye, Package, 
  User, Phone, MapPin, CreditCard, Calendar, ChevronDown, ChevronUp
} from 'lucide-react';

const OrderAcceptance = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: '#NW-2024-001',
      customerName: 'John Smith',
      customerEmail: 'john.smith@email.com',
      customerPhone: '+1 (555) 123-4567',
      date: 'Dec 15, 2024',
      total: '₹4,998',
      items: [
        { 
          name: 'ARCHITECTURAL OVERSIZED TEE', 
          size: 'L', 
          color: 'Black', 
          qty: 2, 
          price: '₹2,499', 
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' 
        }
      ],
      status: 'pending',
      address: '123 Tech Lane, Silicon Valley, CA 94043',
      shippingAddress: {
        street: '123 Tech Lane',
        city: 'Silicon Valley',
        state: 'CA',
        zip: '94043',
        country: 'USA'
      },
      paymentMethod: 'Credit Card ****1234'
    },
    {
      id: '#NW-2024-002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@email.com',
      customerPhone: '+1 (555) 987-6543',
      date: 'Dec 14, 2024',
      total: '₹7,497',
      items: [
        { 
          name: 'PREMIUM HOODIE', 
          size: 'XL', 
          color: 'Navy', 
          qty: 1, 
          price: '₹3,999', 
          image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100' 
        }
      ],
      status: 'pending',
      address: '456 Fashion Ave, New York, NY 10001',
      shippingAddress: {
        street: '456 Fashion Ave',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA'
      },
      paymentMethod: 'UPI Payment'
    }
  ]);

  const handleViewDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleAccept = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'accepted' } : order
    ));
  };

  const handleReject = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'rejected' } : order
    ));
  };

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const acceptedOrders = orders.filter(order => order.status === 'accepted');
  const rejectedOrders = orders.filter(order => order.status === 'rejected');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Order Acceptance</h2>
          <p className="text-slate-500">Review and accept pending orders</p>
        </div>
        <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-medium">
          {pendingOrders.length} Pending Orders
        </div>
      </div>

      <div className="grid gap-4">
        {pendingOrders.map((order) => (
          <div key={order.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{order.id}</h3>
                <p className="text-slate-500 text-sm">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800 text-lg">{order.total}</p>
                <p className="text-slate-500 text-sm">{order.items.length} items</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <User className="text-slate-400" size={18} />
                <span className="text-slate-700">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-slate-400" size={18} />
                <span className="text-slate-700">{order.customerPhone}</span>
              </div>
              <div className="flex items-center gap-3 md:col-span-2">
                <MapPin className="text-slate-400" size={18} />
                <span className="text-slate-700">{order.address}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleAccept(order.id)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle size={18} />
                Accept Order
              </button>
              <button
                onClick={() => handleReject(order.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <X size={18} />
                Reject Order
              </button>
              <button 
                onClick={() => handleViewDetails(order.id)}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Eye size={18} />
                {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                {expandedOrder === order.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {/* Expanded Order Details */}
            {expandedOrder === order.id && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-4">Order Items</h4>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h5 className="font-medium text-slate-800">{item.name}</h5>
                        <p className="text-sm text-slate-500">Size: {item.size} | Color: {item.color}</p>
                        <p className="text-sm text-slate-600">Qty: {item.qty} × {item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Shipping Address</h5>
                    <p className="text-sm text-slate-600">
                      {order.shippingAddress.street}<br/>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br/>
                      {order.shippingAddress.country}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Payment Method</h5>
                    <p className="text-sm text-slate-600">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {pendingOrders.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <Package className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-slate-500 font-medium">No pending orders</h3>
            <p className="text-slate-400 text-sm">All orders have been processed</p>
          </div>
        )}
      </div>

      {/* Accepted Orders Section */}
      {acceptedOrders.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Accepted Orders</h3>
          <div className="grid gap-4">
            {acceptedOrders.map((order) => (
              <div key={order.id} className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800">{order.id}</h4>
                    <p className="text-slate-600">{order.customerName} - {order.total}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Accepted
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rejected Orders Section */}
      {rejectedOrders.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Rejected Orders</h3>
          <div className="grid gap-4">
            {rejectedOrders.map((order) => (
              <div key={order.id} className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800">{order.id}</h4>
                    <p className="text-slate-600">{order.customerName} - {order.total}</p>
                  </div>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                    Rejected
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderAcceptance;
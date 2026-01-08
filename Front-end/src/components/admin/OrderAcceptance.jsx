import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, X, Clock, Eye, Package, 
  User, Phone, MapPin, CreditCard, Calendar, ChevronDown, ChevronUp
} from 'lucide-react';
import { orderService } from '../../services/orderService';

const OrderAcceptance = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getPendingOrders();
      setOrders(data);
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
      return;
    }
    
    try {
      const orderDetails = await orderService.getOrderDetails(orderId);
      setOrders(orders.map(order => 
        order.order_id === orderId ? { ...order, ...orderDetails } : order
      ));
      setExpandedOrder(orderId);
    } catch (err) {
      setError('Failed to fetch order details');
    }
  };

  const handleAccept = async (orderId) => {
    try {
      await orderService.updateOrderStatus(orderId, 2);
      setOrders(orders.map(order => 
        order.order_id === orderId ? { ...order, status_id: 2, status_name: 'Confirmed' } : order
      ));
    } catch (err) {
      setError('Failed to accept order');
    }
  };

  const handleReject = async (orderId) => {
    try {
      await orderService.updateOrderStatus(orderId, 8);
      setOrders(orders.map(order => 
        order.order_id === orderId ? { ...order, status_id: 8, status_name: 'Cancelled' } : order
      ));
    } catch (err) {
      setError('Failed to reject order');
    }
  };

  const pendingOrders = orders.filter(order => order.status_id === 1);
  const acceptedOrders = orders.filter(order => order.status_id === 2);
  const rejectedOrders = orders.filter(order => order.status_id === 8);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchPendingOrders}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

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
          <div key={order.order_id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">#NW-{order.order_id}</h3>
                <p className="text-slate-500 text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800 text-lg">₹{order.total_amount.toLocaleString()}</p>
                <p className="text-slate-500 text-sm">{order.items?.length || 0} items</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <User className="text-slate-400" size={18} />
                <span className="text-slate-700">{order.customer_name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-slate-400" size={18} />
                <span className="text-slate-700">{order.customer_phone}</span>
              </div>
              <div className="flex items-center gap-3 md:col-span-2">
                <MapPin className="text-slate-400" size={18} />
                <span className="text-slate-700">
                  {order.address_line1}, {order.city}, {order.state} {order.pincode}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleAccept(order.order_id)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle size={18} />
                Accept Order
              </button>
              <button
                onClick={() => handleReject(order.order_id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <X size={18} />
                Reject Order
              </button>
              <button 
                onClick={() => handleViewDetails(order.order_id)}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Eye size={18} />
                {expandedOrder === order.order_id ? 'Hide Details' : 'View Details'}
                {expandedOrder === order.order_id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {/* Expanded Order Details */}
            {expandedOrder === order.order_id && order.items && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-4">Order Items</h4>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                      <img 
                        src={item.image_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100'} 
                        alt={item.product_name} 
                        className="w-16 h-16 object-cover rounded-lg" 
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-slate-800">{item.product_name}</h5>
                        <p className="text-sm text-slate-500">
                          Size: {item.size_name || 'N/A'} | Color: {item.color_name || 'N/A'}
                        </p>
                        <p className="text-sm text-slate-600">Qty: {item.quantity} × ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Shipping Address</h5>
                    <p className="text-sm text-slate-600">
                      {order.address_line1}<br/>
                      {order.city}, {order.state} {order.pincode}<br/>
                      {order.country}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-800 mb-2">Payment Method</h5>
                    <p className="text-sm text-slate-600">{order.payment_method || 'N/A'}</p>
                    <p className="text-sm text-slate-500">Status: {order.payment_status}</p>
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
              <div key={order.order_id} className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800">#NW-{order.order_id}</h4>
                    <p className="text-slate-600">{order.customer_name} - ₹{order.total_amount.toLocaleString()}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Confirmed
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
              <div key={order.order_id} className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800">#NW-{order.order_id}</h4>
                    <p className="text-slate-600">{order.customer_name} - ₹{order.total_amount.toLocaleString()}</p>
                  </div>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                    Cancelled
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
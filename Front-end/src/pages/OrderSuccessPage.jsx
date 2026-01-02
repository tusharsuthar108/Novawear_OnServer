import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home, Star, Gift, Calendar, MapPin, Phone } from 'lucide-react';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-24">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-black to-gray-800 p-8 text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-200">Thank you for shopping with NOVA</p>
        </div>

        <div className="p-8">
          {/* Order Details */}
          <div className="bg-gray-50 p-6 rounded-2xl mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="text-2xl font-bold text-gray-900">#{orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Order Date</p>
                <p className="font-semibold">{new Date().toLocaleDateString('en-IN')}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-blue-600" />
                  <span className="text-sm font-semibold">Estimated Delivery</span>
                </div>
                <p className="text-sm text-gray-700">{estimatedDelivery}</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-green-600" />
                  <span className="text-sm font-semibold">Delivery Address</span>
                </div>
                <p className="text-sm text-gray-700">Home Address</p>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Status</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <CheckCircle size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Order Confirmed</p>
                  <p className="text-sm text-gray-600">We've received and confirmed your order</p>
                </div>
                <span className="text-xs text-gray-600 font-medium">Just now</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <Package size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-indigo-800">Processing</p>
                  <p className="text-sm text-indigo-600">Your order is being prepared</p>
                </div>
                <span className="text-xs text-indigo-600 font-medium">Within 2 hours</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl border border-gray-300">
                <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                  <Truck size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-700">Out for Delivery</p>
                  <p className="text-sm text-gray-600">Your order will be delivered soon</p>
                </div>
                <span className="text-xs text-gray-500 font-medium">3-5 days</span>
              </div>
            </div>
          </div>

          {/* Special Offers */}
          <div className="bg-gradient-to-r from-gray-50 to-indigo-50 p-6 rounded-2xl mb-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <Gift size={20} className="text-indigo-600" />
              <h3 className="font-bold text-gray-900">Special Offer for You!</h3>
            </div>
            <p className="text-sm text-gray-700 mb-3">Get 15% off on your next order. Use code: <span className="font-bold bg-gray-100 px-2 py-1 rounded">NEXT15</span></p>
            <div className="flex items-center gap-2">
              <Star size={14} className="text-yellow-500 fill-current" />
              <span className="text-xs text-gray-600">Valid for 30 days</span>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-gray-50 p-6 rounded-2xl mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-indigo-600" />
                <div>
                  <p className="text-sm font-semibold">Customer Support</p>
                  <p className="text-xs text-gray-600">1800-123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package size={16} className="text-gray-700" />
                <div>
                  <p className="text-sm font-semibold">Track Your Order</p>
                  <p className="text-xs text-gray-600">Real-time updates</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-4 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-900 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <Home size={20} />
              Continue Shopping
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => navigate('/orders')}
                className="bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <Package size={18} />
                Track Order
              </button>
              
              <button 
                className="border-2 border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
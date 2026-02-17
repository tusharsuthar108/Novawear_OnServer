import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag, Gift, Truck, Shield, RotateCcw } from 'lucide-react';

const COUPONS = [
  { code: 'SAVE10', discount: 10, minAmount: 1000, description: '10% off on orders above ₹1000' },
  { code: 'FLAT200', discount: 200, minAmount: 1500, description: '₹200 off on orders above ₹1500' },
  { code: 'FIRST15', discount: 15, minAmount: 500, description: '15% off for first-time buyers' },
];

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [showCoupons, setShowCoupons] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  
  const applyCoupon = (code) => {
    const coupon = COUPONS.find(c => c.code === code);
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }
    if (subtotal < coupon.minAmount) {
      setCouponError(`Minimum order amount ₹${coupon.minAmount} required`);
      return;
    }
    setAppliedCoupon(coupon);
    setCouponCode(code);
    setCouponError('');
    setShowCoupons(false);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const getDiscount = () => {
    if (!appliedCoupon) return 0;
    return appliedCoupon.discount > 100 ? appliedCoupon.discount : Math.round(subtotal * appliedCoupon.discount / 100);
  };

  const finalTotal = subtotal + shipping + tax - getDiscount();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-6">
        <div className="max-w-4xl mx-auto text-center py-20">
          <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to get started</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart ({cartItems.length})</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex gap-4">
                  <img 
                    src={item.images?.[0] || item.image_url || 'https://via.placeholder.com/100'} 
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.brand}</p>
                        <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-gray-100 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="p-2 hover:bg-gray-200 transition-colors rounded-l-lg"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="p-2 hover:bg-gray-200 transition-colors rounded-r-lg"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-lg">₹{((item.price || 0) * item.quantity).toLocaleString('en-IN')}</p>
                        <p className="text-sm text-gray-500">₹{(item.price || 0).toLocaleString('en-IN')} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={clearCart}
              className="w-full py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              
              {/* Coupon Section */}
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={16} className="text-green-600" />
                  <span className="font-semibold text-gray-900">Apply Coupon</span>
                </div>
                
                {!appliedCoupon ? (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase());
                          setCouponError('');
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <button 
                        onClick={() => applyCoupon(couponCode)}
                        className="px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-red-500 text-xs">{couponError}</p>
                    )}
                    
                    <button 
                      onClick={() => setShowCoupons(!showCoupons)}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {showCoupons ? 'Hide' : 'View available coupons'}
                    </button>
                    
                    {showCoupons && (
                      <div className="space-y-2 mt-3">
                        {COUPONS.map((coupon) => (
                          <div key={coupon.code} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="font-semibold text-sm">{coupon.code}</span>
                                <p className="text-xs text-gray-600">{coupon.description}</p>
                              </div>
                              <button 
                                onClick={() => applyCoupon(coupon.code)}
                                disabled={subtotal < coupon.minAmount}
                                className="text-xs bg-black text-white px-2 py-1 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-green-800">{appliedCoupon.code}</span>
                        <p className="text-xs text-green-600">Coupon applied successfully!</p>
                      </div>
                      <button 
                        onClick={removeCoupon}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-500">Free shipping on orders above ₹999</p>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST 18%)</span>
                  <span className="font-semibold">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">-₹{getDiscount().toLocaleString('en-IN')}</span>
                  </div>
                )}
                <hr />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-green-600">You saved ₹{getDiscount().toLocaleString('en-IN')}!</p>
                )}
              </div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-100">
                <div className="text-center">
                  <Truck size={20} className="mx-auto text-green-600 mb-1" />
                  <p className="text-xs text-gray-600">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw size={20} className="mx-auto text-blue-600 mb-1" />
                  <p className="text-xs text-gray-600">Easy Returns</p>
                </div>
                <div className="text-center">
                  <Shield size={20} className="mx-auto text-purple-600 mb-1" />
                  <p className="text-xs text-gray-600">Secure Pay</p>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors mb-3"
              >
                Proceed to Checkout
              </button>
              
              <button 
                onClick={() => navigate('/')}
                className="w-full border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
              
              {/* Gift Message */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-200">
                <div className="flex items-center gap-2 mb-2">
                  <Gift size={16} className="text-pink-600" />
                  <span className="text-sm font-semibold text-gray-900">Add Gift Message</span>
                </div>
                <textarea 
                  placeholder="Write a special message..."
                  className="w-full text-xs p-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
                  rows={2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

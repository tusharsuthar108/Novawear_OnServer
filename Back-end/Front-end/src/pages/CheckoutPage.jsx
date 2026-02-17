import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Phone, Mail, CreditCard, Calendar, Gift, Truck, Home } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Billing Address
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPincode: '',
    billingCountry: 'India',
    
    // Shipping Address
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingPincode: '',
    shippingCountry: 'India',
    sameAsBilling: false,
    
    // Additional Details
    companyName: '',
    gstNumber: '',
    specialInstructions: '',
    giftMessage: '',
    preferredDeliveryTime: '',
    alternatePhone: '',
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
    
    // Auto-fill shipping address when same as billing is checked
    if (name === 'sameAsBilling' && checked) {
      setFormData(prev => ({
        ...prev,
        sameAsBilling: true,
        shippingAddress: prev.billingAddress,
        shippingCity: prev.billingCity,
        shippingState: prev.billingState,
        shippingPincode: prev.billingPincode,
        shippingCountry: prev.billingCountry,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/cart')}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <User size={20} className="text-blue-600" />
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="tel"
                    name="alternatePhone"
                    placeholder="Alternate Phone (Optional)"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black md:col-span-2"
                  />
                </div>
              </div>

              {/* Company Details (Optional) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Home size={20} className="text-purple-600" />
                  <h2 className="text-xl font-semibold">Company Details (Optional)</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="text"
                    name="gstNumber"
                    placeholder="GST Number"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={20} className="text-green-600" />
                  <h2 className="text-xl font-semibold">Billing Address</h2>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="billingAddress"
                    placeholder="Street Address *"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                      type="text"
                      name="billingCity"
                      placeholder="City *"
                      value={formData.billingCity}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="text"
                      name="billingState"
                      placeholder="State *"
                      value={formData.billingState}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="text"
                      name="billingPincode"
                      placeholder="PIN Code *"
                      value={formData.billingPincode}
                      onChange={handleInputChange}
                      required
                      maxLength={6}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      type="text"
                      name="billingCountry"
                      placeholder="Country"
                      value={formData.billingCountry}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Truck size={20} className="text-orange-600" />
                    <h2 className="text-xl font-semibold">Shipping Address</h2>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="sameAsBilling"
                      checked={formData.sameAsBilling}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-600">Same as billing</span>
                  </label>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="shippingAddress"
                    placeholder="Street Address *"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    required
                    disabled={formData.sameAsBilling}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                      type="text"
                      name="shippingCity"
                      placeholder="City *"
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                      required
                      disabled={formData.sameAsBilling}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                    />
                    <input
                      type="text"
                      name="shippingState"
                      placeholder="State *"
                      value={formData.shippingState}
                      onChange={handleInputChange}
                      required
                      disabled={formData.sameAsBilling}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                    />
                    <input
                      type="text"
                      name="shippingPincode"
                      placeholder="PIN Code *"
                      value={formData.shippingPincode}
                      onChange={handleInputChange}
                      required
                      maxLength={6}
                      disabled={formData.sameAsBilling}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                    />
                    <input
                      type="text"
                      name="shippingCountry"
                      placeholder="Country"
                      value={formData.shippingCountry}
                      onChange={handleInputChange}
                      disabled={formData.sameAsBilling}
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Preferences */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={20} className="text-indigo-600" />
                  <h2 className="text-xl font-semibold">Delivery Preferences</h2>
                </div>
                <div className="space-y-4">
                  <select
                    name="preferredDeliveryTime"
                    value={formData.preferredDeliveryTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Preferred Delivery Time</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                    <option value="anytime">Anytime</option>
                  </select>
                  <textarea
                    name="specialInstructions"
                    placeholder="Special delivery instructions (Optional)"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  />
                </div>
              </div>

              {/* Gift Message */}
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Gift size={20} className="text-pink-600" />
                  <h2 className="text-xl font-semibold">Gift Message (Optional)</h2>
                </div>
                <div className="relative">
                  <textarea
                    name="giftMessage"
                    value={formData.giftMessage}
                    onChange={handleInputChange}
                    rows={3}
                    className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-black placeholder-transparent resize-none"
                    placeholder="Add a special message for the recipient"
                  />
                  <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-black">
                    Add a special message for the recipient...
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3">
                    <img 
                      src={item.images?.[0] || item.image_url || 'https://via.placeholder.com/100'} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-600">Size: {item.selectedSize}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      <p className="font-semibold text-sm">₹{((item.price || 0) * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">₹{tax.toLocaleString('en-IN')}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              <button 
                onClick={handleSubmit}
                className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard size={20} />
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
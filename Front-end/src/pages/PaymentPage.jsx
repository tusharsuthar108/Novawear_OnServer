import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CreditCard, Smartphone, ShieldCheck, Zap, ArrowLeft, Lock, Calendar, User } from "lucide-react";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { getTotalPrice, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });
  const [upiId, setUpiId] = useState('');

  const subtotal = getTotalPrice();
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    } else if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/').trim();
      if (formattedValue.length > 5) return;
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').trim();
      if (formattedValue.length > 3) return;
    }
    
    setCardDetails({ ...cardDetails, [name]: formattedValue });
  };

  const handlePayment = async () => {
    if (!selectedPayment) return;
    
    if (selectedPayment === 'card') {
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardholderName) {
        alert('Please fill all card details');
        return;
      }
    } else if (selectedPayment === 'upi') {
      if (!upiId) {
        alert('Please enter UPI ID');
        return;
      }
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate('/order-success');
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-24">
      <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden">
        <div className="p-12 border-b border-gray-50">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => navigate('/checkout')}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-black uppercase tracking-tight">Payment Details</h1>
          </div>
          
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={14}/> Secure Checkout
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Methods */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Select Payment Method</h2>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setSelectedPayment('upi')}
                  className={`w-full flex items-center justify-between p-6 border-2 rounded-2xl transition-all group ${
                    selectedPayment === 'upi' 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-200 hover:border-black hover:bg-gray-50'
                  }`}
                >
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center">
                       <Smartphone size={20} />
                     </div>
                     <span className="font-semibold">UPI / Google Pay / PhonePe</span>
                   </div>
                   <Zap className={`${selectedPayment === 'upi' ? 'text-yellow-400' : 'text-gray-300'}`} size={20} />
                </button>

                <button 
                  onClick={() => setSelectedPayment('card')}
                  className={`w-full flex items-center justify-between p-6 border-2 rounded-2xl transition-all group ${
                    selectedPayment === 'card' 
                      ? 'border-black bg-gray-50' 
                      : 'border-gray-200 hover:border-black hover:bg-gray-50'
                  }`}
                >
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                       <CreditCard size={20} />
                     </div>
                     <span className="font-semibold">Credit / Debit Card</span>
                   </div>
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Cash Payment</h3>
                <button 
                  onClick={() => setSelectedPayment('cod')}
                  className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
                    selectedPayment === 'cod' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg flex items-center justify-center">
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                         <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 000 4h8a2 2 0 000-4H6z"/>
                       </svg>
                     </div>
                     <div className="text-left">
                       <span className="font-semibold text-gray-900">Cash on Delivery</span>
                       <p className="text-xs text-gray-500">Pay when you receive</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-1">
                     <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">COD</span>
                   </div>
                </button>
              </div>

              {/* UPI Form */}
              {selectedPayment === 'upi' && (
                <div className="bg-blue-50 p-6 rounded-2xl space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Smartphone size={18} className="text-blue-600" />
                    Enter UPI Details
                  </h3>
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g., user@paytm)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Lock size={14} />
                    <span>Your UPI ID is secure and encrypted</span>
                  </div>
                </div>
              )}

              {/* Card Form */}
              {selectedPayment === 'card' && (
                <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <CreditCard size={18} className="text-gray-600" />
                    Enter Card Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        name="cardholderName"
                        placeholder="Cardholder Name"
                        value={cardDetails.cardholderName}
                        onChange={handleCardInputChange}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />
                      <User size={18} className="absolute left-4 top-3.5 text-gray-400" />
                    </div>
                    
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />
                      <CreditCard size={18} className="absolute left-4 top-3.5 text-gray-400" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={handleCardInputChange}
                          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                        <Calendar size={18} className="absolute left-4 top-3.5 text-gray-400" />
                      </div>
                      
                      <div className="relative">
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                        <Lock size={18} className="absolute left-4 top-3.5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Lock size={14} />
                    <span>Your card details are secure and encrypted</span>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
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
                <div className="flex justify-between text-xl">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              <button 
                onClick={handlePayment}
                disabled={!selectedPayment || isProcessing}
                className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing Payment...
                  </>
                ) : (
                  `Pay ₹${total.toLocaleString('en-IN')}`
                )}
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Lock size={14} />
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
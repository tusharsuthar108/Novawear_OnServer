import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, name: "ARCHITECTURAL OVERSIZED TEE", price: 2499, qty: 1, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800" }
  ]);

  const total = items.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="w-full min-h-screen bg-white">
      <CheckoutStepper currentStep={1} />
      <div className="w-full grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 p-6 lg:p-12">
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-12">Shopping Bag</h1>
          {items.map(item => (
            <div key={item.id} className="flex gap-8 py-10 border-b border-gray-100 items-center">
              <img src={item.img} className="w-32 h-40 object-cover rounded-2xl" alt="" />
              <div className="flex-1">
                <h3 className="font-black text-xl">{item.name}</h3>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Premium Cotton</p>
                <div className="flex items-center gap-6 mt-6">
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button className="p-2"><Minus size={14}/></button>
                    <span className="px-4 font-bold">{item.qty}</span>
                    <button className="p-2"><Plus size={14}/></button>
                  </div>
                  <button className="text-red-500 font-black text-[10px] uppercase">Remove</button>
                </div>
              </div>
              <div className="text-2xl font-black italic">₹{item.price}</div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-4 bg-gray-50 p-6 lg:p-12 min-h-screen">
          <div className="sticky top-12 space-y-8">
            <h2 className="text-2xl font-black uppercase italic">Order Summary</h2>
            <div className="flex justify-between font-bold">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <button 
              onClick={() => navigate('/shipping')}
              className="w-full bg-black text-white h-20 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-red-600 transition-all shadow-xl"
            >
              Checkout <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
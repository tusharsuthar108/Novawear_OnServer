import React from "react";
import { CreditCard, Smartphone, ShieldCheck, Zap } from "lucide-react";

export default function PaymentPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden">
        <div className="p-12 border-b border-gray-50">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-black uppercase tracking-tight">Select Payment</h1>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={14}/> Secure Checkout
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-8 border-2 border-gray-100 rounded-3xl hover:border-black hover:bg-gray-50 transition-all group">
               <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center"><Smartphone /></div>
                 <span className="font-black uppercase tracking-widest">UPI / Google Pay / PhonePe</span>
               </div>
               <Zap className="text-gray-200 group-hover:text-yellow-400" />
            </button>

            <button className="w-full flex items-center justify-between p-8 border-2 border-gray-100 rounded-3xl hover:border-black hover:bg-gray-50 transition-all group">
               <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center"><CreditCard /></div>
                 <span className="font-black uppercase tracking-widest">Credit / Debit Card</span>
               </div>
            </button>
          </div>
        </div>

        <div className="p-12 bg-gray-50 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Payable Amount</p>
            <p className="text-4xl font-black italic">₹2,499</p>
          </div>
          <button className="px-12 bg-black text-white h-16 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
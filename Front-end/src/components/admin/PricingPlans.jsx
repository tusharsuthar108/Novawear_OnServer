import React, { useState } from 'react';
import { Plus, Edit, Trash2, Crown, Star, Zap, ArrowLeft } from 'lucide-react';

const PricingPlans = () => {
  const [plans, setPlans] = useState([
    { id: 1, name: "Basic", price: 9.99, duration: "month", features: ["5 Products", "Basic Support", "Free Shipping"], status: "Active", icon: <Star size={20} /> },
    { id: 2, name: "Pro", price: 29.99, duration: "month", features: ["50 Products", "Priority Support", "Free Shipping", "Analytics"], status: "Active", icon: <Zap size={20} /> },
    { id: 3, name: "Enterprise", price: 99.99, duration: "month", features: ["Unlimited Products", "24/7 Support", "Free Shipping", "Advanced Analytics", "Custom Integrations"], status: "Active", icon: <Crown size={20} /> }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowAddForm(false)}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Plans
          </button>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Add New Plan</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Plan Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="number" placeholder="Price" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <textarea placeholder="Features (one per line)" rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
            <div className="flex gap-4">
              <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">Save Plan</button>
              <button type="button" onClick={() => setShowAddForm(false)} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Pricing Plans</h2>
          <p className="text-slate-500">Manage subscription and pricing plans</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={18} />
          Add Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-indigo-50">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-800">${plan.price}</span>
                <span className="text-slate-500">/{plan.duration}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-600 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                plan.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>
                {plan.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
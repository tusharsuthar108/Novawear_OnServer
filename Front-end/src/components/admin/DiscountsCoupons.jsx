import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Percent, Calendar, Users, ArrowLeft } from 'lucide-react';

const DiscountsCoupons = () => {
  const [coupons, setCoupons] = useState([
    { id: 1, code: "SUMMER20", type: "Percentage", value: 20, minOrder: 50, maxUses: 100, used: 45, expiry: "2024-08-31", status: "Active" },
    { id: 2, code: "NEWUSER", type: "Fixed", value: 10, minOrder: 0, maxUses: 500, used: 234, expiry: "2024-12-31", status: "Active" },
    { id: 3, code: "FLASH50", type: "Percentage", value: 50, minOrder: 100, maxUses: 50, used: 50, expiry: "2024-06-15", status: "Expired" }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredCoupons = coupons.filter(coupon => 
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showAddForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowAddForm(false)}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Coupons
          </button>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Create New Coupon</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Coupon Code" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Percentage</option>
                <option>Fixed</option>
              </select>
              <input type="number" placeholder="Discount Value" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="date" placeholder="Expiry Date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">Create Coupon</button>
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
          <h2 className="text-2xl font-bold text-slate-800">Discounts & Coupons</h2>
          <p className="text-slate-500">Manage discount codes and promotional offers</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={18} />
          Create Coupon
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search coupons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCoupons.map((coupon) => (
            <div key={coupon.id} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                    <Percent size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{coupon.code}</h3>
                    <span className="text-sm text-slate-500">{coupon.type}</span>
                  </div>
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

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Discount Value</span>
                  <span className="font-semibold text-slate-800">
                    {coupon.type === 'Percentage' ? `${coupon.value}%` : `$${coupon.value}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Min Order</span>
                  <span className="font-semibold text-slate-800">${coupon.minOrder}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Usage</span>
                  <span className="font-semibold text-slate-800">{coupon.used}/{coupon.maxUses}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-slate-400" />
                <span className="text-sm text-slate-600">Expires: {coupon.expiry}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  coupon.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 
                  coupon.status === 'Expired' ? 'bg-red-100 text-red-600' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {coupon.status}
                </span>
                <div className="w-16 bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full" 
                    style={{ width: `${(coupon.used / coupon.maxUses) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscountsCoupons;
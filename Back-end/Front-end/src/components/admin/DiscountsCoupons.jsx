import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Percent, Calendar, Users, ArrowLeft } from 'lucide-react';
import { fetchCoupons, createCoupon, updateCoupon, deleteCoupon } from '../../api/pricing.api';

const DiscountsCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    coupon_code: '',
    description: '',
    discount_type: 'percentage',
    discount_value: '',
    min_order_amount: '',
    max_discount_amount: '',
    start_date: '',
    end_date: '',
    usage_limit: '',
    is_active: true
  });

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const response = await fetchCoupons();
      setCoupons(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCoupon) {
        await updateCoupon(editingCoupon.coupon_id, formData);
        setSuccess('Coupon updated successfully!');
      } else {
        await createCoupon(formData);
        setSuccess('Coupon created successfully!');
      }
      setShowAddForm(false);
      setEditingCoupon(null);
      setFormData({
        coupon_code: '', description: '', discount_type: 'percentage', discount_value: '',
        min_order_amount: '', max_discount_amount: '', start_date: '', end_date: '',
        usage_limit: '', is_active: true
      });
      loadCoupons();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      coupon_code: coupon.coupon_code,
      description: coupon.description || '',
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value.toString(),
      min_order_amount: coupon.min_order_amount ? coupon.min_order_amount.toString() : '',
      max_discount_amount: coupon.max_discount_amount ? coupon.max_discount_amount.toString() : '',
      start_date: coupon.start_date ? coupon.start_date.split('T')[0] : '',
      end_date: coupon.end_date ? coupon.end_date.split('T')[0] : '',
      usage_limit: coupon.usage_limit ? coupon.usage_limit.toString() : '',
      is_active: coupon.is_active
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await deleteCoupon(id);
        setSuccess('Coupon deleted successfully!');
        loadCoupons();
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const filteredCoupons = coupons.filter(coupon => 
    coupon.coupon_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (showAddForm) {
    return (
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}
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
          <h2 className="text-2xl font-bold text-slate-800 mb-6">{editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Coupon Code" 
                value={formData.coupon_code}
                onChange={(e) => setFormData({...formData, coupon_code: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <select 
                value={formData.discount_type}
                onChange={(e) => setFormData({...formData, discount_type: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="percentage">Percentage</option>
                <option value="flat">Fixed Amount</option>
              </select>
              <input 
                type="number" 
                placeholder="Discount Value" 
                value={formData.discount_value}
                onChange={(e) => setFormData({...formData, discount_value: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <input 
                type="number" 
                placeholder="Min Order Amount (Optional)" 
                value={formData.min_order_amount}
                onChange={(e) => setFormData({...formData, min_order_amount: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <input 
                type="number" 
                placeholder="Max Discount Amount (Optional)" 
                value={formData.max_discount_amount}
                onChange={(e) => setFormData({...formData, max_discount_amount: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <input 
                type="number" 
                placeholder="Usage Limit (Optional)" 
                value={formData.usage_limit}
                onChange={(e) => setFormData({...formData, usage_limit: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <input 
                type="date" 
                placeholder="Start Date" 
                value={formData.start_date}
                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <input 
                type="date" 
                placeholder="End Date" 
                value={formData.end_date}
                onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <textarea 
              placeholder="Description" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <div className="flex gap-4">
              <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">{editingCoupon ? 'Update Coupon' : 'Create Coupon'}</button>
              <button type="button" onClick={() => {setShowAddForm(false); setEditingCoupon(null);}} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl">
          {success}
        </div>
      )}
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
            <div key={coupon.coupon_id} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                    <Percent size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{coupon.coupon_code}</h3>
                    <span className="text-sm text-slate-500">{coupon.discount_type}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(coupon)}
                    className="p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-indigo-50"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(coupon.coupon_id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Discount Value</span>
                  <span className="font-semibold text-slate-800">
                    {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `$${coupon.discount_value}`}
                  </span>
                </div>
                {coupon.min_order_amount && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Min Order</span>
                    <span className="font-semibold text-slate-800">${coupon.min_order_amount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Usage</span>
                  <span className="font-semibold text-slate-800">{coupon.used_count || 0}/{coupon.usage_limit || '∞'}</span>
                </div>
              </div>

              {coupon.end_date && (
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-600">Expires: {new Date(coupon.end_date).toLocaleDateString()}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  coupon.is_active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {coupon.is_active ? 'Active' : 'Inactive'}
                </span>
                {coupon.usage_limit && (
                  <div className="w-16 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full" 
                      style={{ width: `${((coupon.used_count || 0) / coupon.usage_limit) * 100}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscountsCoupons;
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Crown, Star, Zap, ArrowLeft } from 'lucide-react';
import { fetchPricingPlans, createPricingPlan, updatePricingPlan, deletePricingPlan } from '../../api/pricing.api';

const PricingPlans = () => {
  const [plans, setPlans] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    plan_name: '',
    description: '',
    discount_type: 'percentage',
    discount_value: '',
    is_active: true
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const response = await fetchPricingPlans();
      setPlans(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPlan) {
        await updatePricingPlan(editingPlan.plan_id, formData);
        setSuccess('Plan updated successfully!');
      } else {
        await createPricingPlan(formData);
        setSuccess('Plan created successfully!');
      }
      setShowAddForm(false);
      setEditingPlan(null);
      setFormData({ plan_name: '', description: '', discount_type: 'percentage', discount_value: '', is_active: true });
      loadPlans();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      plan_name: plan.plan_name,
      description: plan.description || '',
      discount_type: plan.discount_type,
      discount_value: plan.discount_value.toString(),
      is_active: plan.is_active
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await deletePricingPlan(id);
        setSuccess('Plan deleted successfully!');
        loadPlans();
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError(err.message);
      }
    }
  };

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
            Back to Plans
          </button>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">{editingPlan ? 'Edit Plan' : 'Add New Plan'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Plan Name" 
                value={formData.plan_name}
                onChange={(e) => setFormData({...formData, plan_name: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <select 
                value={formData.discount_type}
                onChange={(e) => setFormData({...formData, discount_type: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="percentage">Percentage</option>
                <option value="flat">Flat Amount</option>
              </select>
              <input 
                type="number" 
                placeholder="Discount Value" 
                value={formData.discount_value}
                onChange={(e) => setFormData({...formData, discount_value: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <textarea 
              placeholder="Description" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <div className="flex gap-4">
              <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">{editingPlan ? 'Update Plan' : 'Save Plan'}</button>
              <button type="button" onClick={() => {setShowAddForm(false); setEditingPlan(null);}} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors">Cancel</button>
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
          <div key={plan.plan_id} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                  <Star size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{plan.plan_name}</h3>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(plan)}
                  className="p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-indigo-50"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(plan.plan_id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-800">
                  {plan.discount_value}{plan.discount_type === 'percentage' ? '%' : '$'}
                </span>
                <span className="text-slate-500">discount</span>
              </div>
            </div>

            {plan.description && (
              <div className="mb-6">
                <p className="text-slate-600 text-sm">{plan.description}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                plan.is_active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
              }`}>
                {plan.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
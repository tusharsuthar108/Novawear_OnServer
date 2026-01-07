import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Percent, MapPin, DollarSign, Settings, ArrowLeft } from 'lucide-react';
import { fetchTaxes, createTax, updateTax, deleteTax, fetchFees, createFee, updateFee, deleteFee } from '../../api/pricing.api';

const TaxesFees = () => {
  const [taxRules, setTaxRules] = useState([]);
  const [fees, setFees] = useState([]);
  const [showAddTaxForm, setShowAddTaxForm] = useState(false);
  const [showAddFeeForm, setShowAddFeeForm] = useState(false);
  const [editingTax, setEditingTax] = useState(null);
  const [editingFee, setEditingFee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [taxFormData, setTaxFormData] = useState({
    tax_name: '',
    tax_type: 'percentage',
    tax_value: '',
    is_active: true
  });
  const [feeFormData, setFeeFormData] = useState({
    fee_name: '',
    fee_type: 'flat',
    fee_value: '',
    is_active: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [taxResponse, feeResponse] = await Promise.all([
        fetchTaxes(),
        fetchFees()
      ]);
      setTaxRules(taxResponse.data || []);
      setFees(feeResponse.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTaxSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTax) {
        await updateTax(editingTax.tax_id, taxFormData);
        setSuccess('Tax rule updated successfully!');
      } else {
        await createTax(taxFormData);
        setSuccess('Tax rule created successfully!');
      }
      setShowAddTaxForm(false);
      setEditingTax(null);
      setTaxFormData({ tax_name: '', tax_type: 'percentage', tax_value: '', is_active: true });
      loadData();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFeeSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFee) {
        await updateFee(editingFee.fee_id, feeFormData);
        setSuccess('Fee updated successfully!');
      } else {
        await createFee(feeFormData);
        setSuccess('Fee created successfully!');
      }
      setShowAddFeeForm(false);
      setEditingFee(null);
      setFeeFormData({ fee_name: '', fee_type: 'flat', fee_value: '', is_active: true });
      loadData();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTaxEdit = (tax) => {
    setEditingTax(tax);
    setTaxFormData({
      tax_name: tax.tax_name,
      tax_type: tax.tax_type,
      tax_value: tax.tax_value.toString(),
      is_active: tax.is_active
    });
    setShowAddTaxForm(true);
  };

  const handleFeeEdit = (fee) => {
    setEditingFee(fee);
    setFeeFormData({
      fee_name: fee.fee_name,
      fee_type: fee.fee_type,
      fee_value: fee.fee_value.toString(),
      is_active: fee.is_active
    });
    setShowAddFeeForm(true);
  };

  const handleTaxDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tax rule?')) {
      try {
        await deleteTax(id);
        setSuccess('Tax rule deleted successfully!');
        loadData();
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleFeeDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this fee?')) {
      try {
        await deleteFee(id);
        setSuccess('Fee deleted successfully!');
        loadData();
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

  if (showAddTaxForm) {
    return (
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowAddTaxForm(false)}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Taxes & Fees
          </button>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">{editingTax ? 'Edit Tax Rule' : 'Add Tax Rule'}</h2>
          <form onSubmit={handleTaxSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Tax Name" 
                value={taxFormData.tax_name}
                onChange={(e) => setTaxFormData({...taxFormData, tax_name: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <select 
                value={taxFormData.tax_type}
                onChange={(e) => setTaxFormData({...taxFormData, tax_type: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="percentage">Percentage</option>
                <option value="flat">Fixed Amount</option>
              </select>
              <input 
                type="number" 
                placeholder="Tax Value" 
                value={taxFormData.tax_value}
                onChange={(e) => setTaxFormData({...taxFormData, tax_value: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">{editingTax ? 'Update Tax Rule' : 'Save Tax Rule'}</button>
              <button type="button" onClick={() => {setShowAddTaxForm(false); setEditingTax(null);}} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (showAddFeeForm) {
    return (
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowAddFeeForm(false)}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Taxes & Fees
          </button>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">{editingFee ? 'Edit Fee' : 'Add Fee'}</h2>
          <form onSubmit={handleFeeSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Fee Name" 
                value={feeFormData.fee_name}
                onChange={(e) => setFeeFormData({...feeFormData, fee_name: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <select 
                value={feeFormData.fee_type}
                onChange={(e) => setFeeFormData({...feeFormData, fee_type: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="flat">Fixed Amount</option>
                <option value="percentage">Percentage</option>
              </select>
              <input 
                type="number" 
                placeholder="Fee Value" 
                value={feeFormData.fee_value}
                onChange={(e) => setFeeFormData({...feeFormData, fee_value: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">{editingFee ? 'Update Fee' : 'Save Fee'}</button>
              <button type="button" onClick={() => {setShowAddFeeForm(false); setEditingFee(null);}} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors">Cancel</button>
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
          <h2 className="text-2xl font-bold text-slate-800">Taxes & Fees</h2>
          <p className="text-slate-500">Configure tax rates and additional fees</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAddTaxForm(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
          >
            <Plus size={18} />
            Add Tax Rule
          </button>
          <button 
            onClick={() => setShowAddFeeForm(true)}
            className="flex items-center gap-2 bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl font-medium hover:bg-slate-200 transition-colors"
          >
            <Plus size={18} />
            Add Fee
          </button>
        </div>
      </div>

      {/* Tax Rules Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
            <Percent size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Tax Rules</h3>
            <p className="text-slate-500 text-sm">Tax rates and regulations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {taxRules.map((rule) => (
            <div key={rule.tax_id} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    T
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{rule.tax_name}</h4>
                    <span className="text-sm text-slate-500">{rule.tax_type}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleTaxEdit(rule)}
                    className="p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-indigo-50"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleTaxDelete(rule.tax_id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Tax Value</span>
                  <span className="font-bold text-slate-800 text-lg">
                    {rule.tax_value}{rule.tax_type === 'percentage' ? '%' : '$'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  rule.is_active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {rule.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fees Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
            <DollarSign size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Platform Fees & Charges</h3>
            <p className="text-slate-500 text-sm">Platform fees, convenience charges, and shipping costs</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Fee Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fees.map((fee) => (
                <tr key={fee.fee_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Settings size={16} className="text-slate-500" />
                      </div>
                      <span className="font-semibold text-slate-800">{fee.fee_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      fee.fee_type === 'flat' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {fee.fee_type === 'flat' ? 'Fixed' : 'Percentage'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {fee.fee_type === 'flat' ? '$' : ''}
                      <span className="font-semibold text-slate-800">{fee.fee_value}</span>
                      {fee.fee_type === 'percentage' ? '%' : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      fee.is_active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {fee.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleFeeEdit(fee)}
                        className="p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-indigo-50"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleFeeDelete(fee.fee_id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaxesFees;
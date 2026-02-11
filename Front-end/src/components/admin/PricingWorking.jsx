import React, { useState, useEffect } from 'react';
import { Tag, DollarSign, Percent, RefreshCw, Plus } from 'lucide-react';
import { couponService } from '../../services/couponService';

const PricingWorking = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discount_type: 'percentage',
    discount_value: '',
    min_order_amount: '',
    max_discount: '',
    valid_from: '',
    valid_until: ''
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const result = await couponService.getAllCoupons();
      if (result.success) {
        setCoupons(result.data);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await couponService.createCoupon(formData);
      if (result.success) {
        fetchCoupons();
        setShowAddForm(false);
        setFormData({
          code: '',
          discount_type: 'percentage',
          discount_value: '',
          min_order_amount: '',
          max_discount: '',
          valid_from: '',
          valid_until: ''
        });
      }
    } catch (error) {
      console.error('Error creating coupon:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pricing & Coupons</h1>
          <p className="text-gray-600 mt-1">Manage discount coupons and pricing</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchCoupons} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2">
            <RefreshCw size={20} />
            Refresh
          </button>
          <button onClick={() => setShowAddForm(!showAddForm)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
            <Plus size={20} />
            Add Coupon
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Coupons</p>
              <p className="text-2xl font-bold text-gray-900">{coupons.length}</p>
            </div>
            <Tag className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Coupons</p>
              <p className="text-2xl font-bold text-green-600">{coupons.filter(c => c.is_active).length}</p>
            </div>
            <DollarSign className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Percentage Discounts</p>
              <p className="text-2xl font-bold text-purple-600">{coupons.filter(c => c.discount_type === 'percentage').length}</p>
            </div>
            <Percent className="text-purple-600" size={32} />
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Coupon</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
              <select
                value={formData.discount_type}
                onChange={(e) => setFormData({...formData, discount_type: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
              <input
                type="number"
                step="0.01"
                value={formData.discount_value}
                onChange={(e) => setFormData({...formData, discount_value: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Order Amount</label>
              <input
                type="number"
                value={formData.min_order_amount}
                onChange={(e) => setFormData({...formData, min_order_amount: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Discount</label>
              <input
                type="number"
                value={formData.max_discount}
                onChange={(e) => setFormData({...formData, max_discount: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
              <input
                type="date"
                value={formData.valid_until}
                onChange={(e) => setFormData({...formData, valid_until: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Create Coupon
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Min Order</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Max Discount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Valid Until</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-400">Loading...</td>
                </tr>
              ) : coupons.length > 0 ? (
                coupons.map((coupon) => (
                  <tr key={coupon.coupon_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-indigo-600">{coupon.code}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">{coupon.discount_type}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `₹${coupon.discount_value}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">₹{coupon.min_order_amount || 0}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">₹{coupon.max_discount || 'No limit'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {coupon.valid_until ? new Date(coupon.valid_until).toLocaleDateString() : 'No expiry'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        coupon.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {coupon.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-400">No coupons found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PricingWorking;

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Percent, MapPin, DollarSign, Settings, ArrowLeft } from 'lucide-react';

const TaxesFees = () => {
  const [taxRules, setTaxRules] = useState([
    { id: 1, type: "GST", name: "Standard GST", rate: 18, region: "India", status: "Active" },
    { id: 2, type: "GST", name: "Reduced GST", rate: 5, region: "India", status: "Active" },
    { id: 3, type: "Service Tax", name: "Digital Services", rate: 12, region: "Global", status: "Active" }
  ]);
  const [fees, setFees] = useState([
    { id: 1, name: "Platform Fee", type: "Fixed", amount: 2.99, description: "Platform processing fee", status: "Active" },
    { id: 2, name: "Convenience Charge", type: "Percentage", amount: 2.5, description: "Payment processing convenience", status: "Active" },
    { id: 3, name: "Shipping Charge", type: "Fixed", amount: 5.99, description: "Standard shipping fee", status: "Active" }
  ]);
  const [showAddTaxForm, setShowAddTaxForm] = useState(false);
  const [showAddFeeForm, setShowAddFeeForm] = useState(false);

  if (showAddTaxForm) {
    return (
      <div className="space-y-6">
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
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Add Tax Rule</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Tax Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>GST</option>
                <option>Service Tax</option>
              </select>
              <input type="number" placeholder="Tax Rate (%)" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="text" placeholder="Region" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">Save Tax Rule</button>
              <button type="button" onClick={() => setShowAddTaxForm(false)} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (showAddFeeForm) {
    return (
      <div className="space-y-6">
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
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Add Fee</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Fee Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Fixed</option>
                <option>Percentage</option>
              </select>
              <input type="number" placeholder="Amount" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="text" placeholder="Description" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">Save Fee</button>
              <button type="button" onClick={() => setShowAddFeeForm(false)} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors">Cancel</button>
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
            <p className="text-slate-500 text-sm">GST rates, service tax, and region-based rules</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {taxRules.map((rule) => (
            <div key={rule.id} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold ${
                    rule.type === 'GST' ? 'bg-emerald-500' : 'bg-blue-500'
                  }`}>
                    {rule.type === 'GST' ? 'G' : 'S'}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{rule.name}</h4>
                    <span className="text-sm text-slate-500">{rule.type}</span>
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
                  <span className="text-sm text-slate-600">Tax Rate</span>
                  <span className="font-bold text-slate-800 text-lg">{rule.rate}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-600">{rule.region}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  rule.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {rule.status}
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fees.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Settings size={16} className="text-slate-500" />
                      </div>
                      <span className="font-semibold text-slate-800">{fee.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      fee.type === 'Fixed' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {fee.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {fee.type === 'Fixed' ? '$' : ''}
                      <span className="font-semibold text-slate-800">{fee.amount}</span>
                      {fee.type === 'Percentage' ? '%' : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 text-sm">{fee.description}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      fee.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {fee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-indigo-50">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
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
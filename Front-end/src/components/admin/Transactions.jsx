import React, { useState } from 'react';
import { Search, Eye, CreditCard, ArrowLeft, Printer } from 'lucide-react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    { id: '#479063DR', method: 'MasterCard', amount: 1520.54, date: 'Jan 21, 2023 08:30 AM', status: 'Paid' },
    { id: '#94267415', method: 'Visa', amount: 2145.00, date: 'Jan 25, 2023 10:25 PM', status: 'Pending' },
    { id: '#36675705', method: 'PayPal', amount: 1520.54, date: 'Jan 29, 2023 12:05 PM', status: 'Paid' },
    { id: '#11686375', method: 'AmericanExpress', amount: 119.99, date: 'Feb 05, 2023 07:02 AM', status: 'Declined' },
    { id: '#88812234', method: 'PayPal', amount: 1520.54, date: 'Jan 29, 2023 12:05 PM', status: 'Paid' },
    { id: '#19168064', method: 'MasterCard', amount: 1520.54, date: 'Jan 21, 2023 08:30 AM', status: 'Paid' },
    { id: '#07081582', method: 'AmericanExpress', amount: 119.99, date: 'Feb 05, 2023 07:02 AM', status: 'Declined' },
    { id: '#79359901', method: 'Visa', amount: 2145.00, date: 'Jan 25, 2023 10:25 PM', status: 'Pending' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === '' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getMethodIcon = (method) => {
    const icons = {
      'MasterCard': '💳',
      'Visa': '💳',
      'PayPal': '🅿️',
      'AmericanExpress': '💳'
    };
    return icons[method] || '💳';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Paid': 'bg-emerald-100 text-emerald-600',
      'Pending': 'bg-yellow-100 text-yellow-600',
      'Declined': 'bg-red-100 text-red-600',
      'Cash': 'bg-blue-100 text-blue-600'
    };
    return colors[status] || 'bg-slate-100 text-slate-500';
  };

  if (selectedTransaction) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedTransaction(null)}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Transactions
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Transaction Details</h2>
            <button className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors">
              <Printer size={16} />
              Print Details
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Transaction ID:</label>
                <p className="text-lg font-bold text-slate-800">{selectedTransaction.id}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Customer:</label>
                <p className="text-slate-800">Shahnewaz Sakil</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Date:</label>
                <p className="text-slate-800">{selectedTransaction.date}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Billing Address:</label>
                <p className="text-slate-800">1947 Pursglove Court, Magnetic Springs</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Item List:</label>
                <div className="space-y-2">
                  <p className="text-slate-800">1. Whitetails Women's Open Sky (x2)</p>
                  <p className="text-slate-800">2. Simple Modern School Boys (x5)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Total Amount:</label>
                <p className="text-xl font-bold text-slate-800">Grand Total - $4152.50</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Method:</label>
                <p className="text-slate-800">{selectedTransaction.method}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Transactions</h2>
          <p className="text-slate-500">Manage payment transactions and details</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-w-[150px]"
          >
            <option value="">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Declined">Declined</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Transaction ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800">{transaction.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getMethodIcon(transaction.method)}</span>
                      <span className="text-slate-800">{transaction.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800">${transaction.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600">{transaction.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedTransaction(transaction)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
          <p className="text-slate-600">Showing 10 Result of 20</p>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">2</button>
            <button className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">3</button>
            <button className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">4</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
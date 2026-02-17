import React, { useState, useEffect, useMemo } from 'react';
import { Search, Eye, CreditCard, ArrowLeft, Printer, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { orderService } from '../../services/orderService';

const TransactionsWorking = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllOrders();
      if (response.success) {
        setOrders(response.data || []);
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const totalAmount = orders.reduce((sum, t) => sum + parseFloat(t.total_amount || 0), 0);
    const paidTransactions = orders.filter(t => t.payment_status === 'Paid');
    const pendingTransactions = orders.filter(t => t.payment_status === 'Pending');
    const successRate = orders.length > 0 ? (paidTransactions.length / orders.length) * 100 : 0;
    
    return {
      totalRevenue: totalAmount,
      totalTransactions: orders.length,
      pendingCount: pendingTransactions.length,
      successRate: successRate
    };
  }, [orders]);

  const filteredTransactions = orders.filter(transaction => {
    const matchesSearch = transaction.order_id?.toString().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === '' || transaction.payment_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getMethodIcon = (method) => {
    return '💳';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Paid': 'bg-emerald-100 text-emerald-600',
      'Pending': 'bg-yellow-100 text-yellow-600',
      'Failed': 'bg-red-100 text-red-600',
    };
    return colors[status] || 'bg-slate-100 text-slate-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
                <p className="text-lg font-bold text-slate-800">#{selectedTransaction.order_id}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Customer:</label>
                <p className="text-slate-800">{selectedTransaction.customer_name}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email:</label>
                <p className="text-slate-800">{selectedTransaction.customer_email}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Date:</label>
                <p className="text-slate-800">{new Date(selectedTransaction.created_at).toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Total Amount:</label>
                <p className="text-xl font-bold text-slate-800">₹{selectedTransaction.total_amount}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Method:</label>
                <p className="text-slate-800">{selectedTransaction.payment_method || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Status:</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTransaction.payment_status)}`}>
                  {selectedTransaction.payment_status}
                </span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-800">₹{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Transactions</p>
              <p className="text-2xl font-bold text-slate-800">{stats.totalTransactions}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <CreditCard className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-slate-800">{stats.pendingCount}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Clock className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Success Rate</p>
              <p className="text-2xl font-bold text-slate-800">{stats.successRate.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-xl">
              <CheckCircle className="text-emerald-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by Order ID..."
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
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.order_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800">#{transaction.order_id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-800">{transaction.customer_name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getMethodIcon(transaction.payment_method)}</span>
                      <span className="text-slate-800">{transaction.payment_method || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800">₹{transaction.total_amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600">{new Date(transaction.created_at).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.payment_status)}`}>
                      {transaction.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedTransaction(transaction)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No transactions found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsWorking;

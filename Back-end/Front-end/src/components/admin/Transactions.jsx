import React, { useState, useMemo } from 'react';
import { Search, Eye, CreditCard, ArrowLeft, Printer, DollarSign, Clock, CheckCircle } from 'lucide-react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    { id: '#TXN001', productName: 'Nike Air Max 270', customerName: 'John Smith', method: 'MasterCard', amount: 129.99, date: 'Jan 21, 2024 08:30 AM', status: 'Paid', orderId: '#ORD001' },
    { id: '#TXN002', productName: 'Adidas Ultraboost 22', customerName: 'Sarah Johnson', method: 'Visa', amount: 189.99, date: 'Jan 22, 2024 10:25 AM', status: 'Pending', orderId: '#ORD002' },
    { id: '#TXN003', productName: 'Levi\'s 501 Jeans', customerName: 'Mike Wilson', method: 'PayPal', amount: 79.99, date: 'Jan 23, 2024 02:15 PM', status: 'Paid', orderId: '#ORD003' },
    { id: '#TXN004', productName: 'Calvin Klein T-Shirt', customerName: 'Emma Davis', method: 'AmericanExpress', amount: 39.99, date: 'Jan 24, 2024 11:45 AM', status: 'Declined', orderId: '#ORD004' },
    { id: '#TXN005', productName: 'Tommy Hilfiger Polo', customerName: 'David Brown', method: 'MasterCard', amount: 89.99, date: 'Jan 25, 2024 09:20 AM', status: 'Paid', orderId: '#ORD005' },
    { id: '#TXN006', productName: 'Zara Blazer', customerName: 'Lisa Garcia', method: 'Visa', amount: 149.99, date: 'Jan 26, 2024 03:30 PM', status: 'Paid', orderId: '#ORD006' },
    { id: '#TXN007', productName: 'H&M Hoodie', customerName: 'Chris Martinez', method: 'PayPal', amount: 49.99, date: 'Jan 27, 2024 07:15 PM', status: 'Pending', orderId: '#ORD007' },
    { id: '#TXN008', productName: 'Puma Running Shoes', customerName: 'Anna Taylor', method: 'MasterCard', amount: 119.99, date: 'Jan 28, 2024 12:00 PM', status: 'Paid', orderId: '#ORD008' },
    { id: '#TXN009', productName: 'Gap Chinos', customerName: 'Robert Lee', method: 'Visa', amount: 69.99, date: 'Jan 29, 2024 04:45 PM', status: 'Declined', orderId: '#ORD009' },
    { id: '#TXN010', productName: 'Under Armour Jacket', customerName: 'Jennifer White', method: 'AmericanExpress', amount: 199.99, date: 'Jan 30, 2024 01:20 PM', status: 'Paid', orderId: '#ORD010' },
    { id: '#TXN011', productName: 'Converse Chuck Taylor', customerName: 'Kevin Anderson', method: 'PayPal', amount: 65.99, date: 'Feb 01, 2024 10:30 AM', status: 'Paid', orderId: '#ORD011' },
    { id: '#TXN012', productName: 'Ralph Lauren Shirt', customerName: 'Michelle Thomas', method: 'MasterCard', amount: 129.99, date: 'Feb 02, 2024 02:45 PM', status: 'Pending', orderId: '#ORD012' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const stats = useMemo(() => {
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    const paidTransactions = transactions.filter(t => t.status === 'Paid');
    const pendingTransactions = transactions.filter(t => t.status === 'Pending');
    const successRate = (paidTransactions.length / transactions.length) * 100;
    
    return {
      totalRevenue: totalAmount,
      totalTransactions: transactions.length,
      pendingCount: pendingTransactions.length,
      successRate: successRate
    };
  }, [transactions]);

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
                <p className="text-slate-800">{selectedTransaction.customerName}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Product:</label>
                <p className="text-slate-800">{selectedTransaction.productName}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Order ID:</label>
                <p className="text-slate-800">{selectedTransaction.orderId}</p>
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
                <label className="block text-sm font-semibold text-slate-700 mb-2">Product Details:</label>
                <div className="space-y-2">
                  <p className="text-slate-800">Product: {selectedTransaction.productName}</p>
                  <p className="text-slate-800">Quantity: 1</p>
                  <p className="text-slate-800">Unit Price: ${selectedTransaction.amount}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Total Amount:</label>
                <p className="text-xl font-bold text-slate-800">Total: ${selectedTransaction.amount}</p>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-800">${stats.totalRevenue.toLocaleString()}</p>
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Product</th>
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
                <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800">{transaction.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-800">{transaction.productName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-800">{transaction.customerName}</span>
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
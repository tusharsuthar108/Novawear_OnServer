import React, { useState } from "react";
import AddProduct from './admin/AddProduct';

import {
  TrendingUp,
  Plus,
  MoreHorizontal,
  ShoppingCart,
  DollarSign,
  Users,
  Package,
} from "lucide-react";

const Dashboard = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  
  if (showAddProduct) {
    return <AddProduct onBack={() => setShowAddProduct(false)} />;
  }
  
  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome to your dashboard</p>
        </div>
        <button
          onClick={() => setShowAddProduct(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Orders Received"
          value="356"
          trend="10%"
          icon={<ShoppingCart className="text-emerald-500" />}
          iconBg="bg-emerald-100"
        />
        <StatCard
          title="Average Daily Sales"
          value="$5680"
          trend="30%"
          icon={<DollarSign className="text-violet-500" />}
          iconBg="bg-violet-100"
        />
        <StatCard
          title="New Customers This Month"
          value="5.8K"
          trend="13%"
          icon={<Users className="text-blue-500" />}
          iconBg="bg-blue-100"
        />
        <StatCard
          title="Pending Orders"
          value="580"
          trend="10%"
          icon={<Package className="text-orange-500" />}
          iconBg="bg-orange-100"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Statistics */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 text-lg">Sales Statistics</h3>
          <div className="h-80 w-full">
            <SimpleAreaChart />
          </div>
        </div>

        {/* Most Selling Category */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 text-lg">Most Selling Category</h3>
          <div className="h-80 w-full">
            <SimplePieChart />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table - Larger Span */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Recent Orders</h2>
            <button className="text-indigo-600 text-sm font-medium hover:underline">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-600 text-sm">
                <tr>
                  <th className="p-4 font-semibold">Item</th>
                  <th className="p-4 font-semibold">Product ID</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <OrderRow
                  name="Apple MacBook Pro 17"
                  id="#XY-25G"
                  price="$2999.00"
                  status="Active"
                />
                <OrderRow
                  name="Gigabyte Gaming Monitor"
                  id="#JK-10A"
                  price="$599.00"
                  status="Disabled"
                />
                <OrderRow
                  name="Logitech G502 Mouse"
                  id="#LG-502"
                  price="$1199.59"
                  status="Pending"
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Transactions Sidebar */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-slate-800">Transactions</h2>
            <button className="text-indigo-600 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-6">
            <TransactionItem
              name="Konnor Guzman"
              date="Jan 10, 2023"
              amount="$660.22"
            />
            <TransactionItem
              name="Shahnewaz"
              date="Jan 15, 2023"
              amount="-$80.40"
              isNegative
            />
            <TransactionItem
              name="Steve Smith"
              date="Feb 01, 2023"
              amount="$150.00"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const SimpleAreaChart = () => {
  const data = [25, 40, 35, 55, 45, 60, 50, 70, 55, 65, 40, 50];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxValue = Math.max(...data);
  
  return (
    <div className="h-full flex items-end justify-between gap-3 px-4 pb-12">
      {data.map((value, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div 
            className="bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg w-full transition-all duration-1000 hover:from-indigo-700 hover:to-indigo-500 cursor-pointer shadow-sm"
            style={{ height: `${(value / maxValue) * 220}px`, minHeight: '20px' }}
          >
            <div className="text-white text-xs font-bold p-1 text-center opacity-0 hover:opacity-100 transition-opacity">
              ${value}k
            </div>
          </div>
          <span className="text-xs text-slate-500 mt-3 font-medium">{months[index]}</span>
        </div>
      ))}
    </div>
  );
};

const SimplePieChart = () => {
  const data = [
    { name: 'Women', value: 40, color: '#3b82f6' },
    { name: 'Men', value: 30, color: '#10b981' },
    { name: 'Kids', value: 20, color: '#eab308' },
    { name: 'Others', value: 10, color: '#ef4444' }
  ];
  
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-48 h-48 rounded-full relative mb-6" style={{
        background: `conic-gradient(
          #3b82f6 0deg ${data[0].value * 3.6}deg,
          #10b981 ${data[0].value * 3.6}deg ${(data[0].value + data[1].value) * 3.6}deg,
          #eab308 ${(data[0].value + data[1].value) * 3.6}deg ${(data[0].value + data[1].value + data[2].value) * 3.6}deg,
          #ef4444 ${(data[0].value + data[1].value + data[2].value) * 3.6}deg 360deg
        )`
      }}>
        <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-slate-800">100%</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-slate-600">{item.name} ({item.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrderRow = ({ name, id, price, status }) => (
  <tr className="hover:bg-slate-50 transition">
    <td className="p-4 text-sm font-medium text-slate-700">{name}</td>
    <td className="p-4 text-sm text-slate-500">{id}</td>
    <td className="p-4 text-sm font-semibold text-slate-900">{price}</td>
    <td className="p-4">
      <span
        className={`px-2 py-1 rounded text-xs font-bold ${
          status === "Active"
            ? "bg-emerald-100 text-emerald-700"
            : status === "Pending"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {status}
      </span>
    </td>
    <td className="p-4 text-center">
      <button className="text-slate-400 hover:text-indigo-600">
        <MoreHorizontal size={18} />
      </button>
    </td>
  </tr>
);

const TransactionItem = ({ name, date, amount, isNegative }) => (
  <div className="flex justify-between items-center">
    <div>
      <p className="text-sm font-bold text-slate-800">{name}</p>
      <p className="text-xs text-slate-400">{date}</p>
    </div>
    <span
      className={`text-sm font-bold ${
        isNegative ? "text-rose-600" : "text-emerald-600"
      }`}
    >
      {amount}
    </span>
  </div>
);

const StatCard = ({ title, value, trend, icon, iconBg }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-bold text-slate-800">{value}</h3>
        <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{title}</p>
      </div>
      <div className={`p-2.5 rounded-xl ${iconBg}`}>{icon}</div>
    </div>
    <div className="mt-4">
      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-100">
        {trend}% <TrendingUp size={10} className="inline ml-1" />
      </span>
    </div>
  </div>
);

export default Dashboard;
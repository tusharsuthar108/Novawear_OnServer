import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle, Clock, Package, Truck, 
  Calendar, CreditCard, User, MapPin, Phone, Mail,
  Download, Edit, MoreHorizontal
} from 'lucide-react';

const OrderDetails = ({ order, onBack }) => {
  const [activeStep, setActiveStep] = useState(2);

  const progressSteps = [
    { id: 1, name: 'Payment Complited', status: 'completed' },
    { id: 2, name: 'Order Confirming', status: 'active' },
    { id: 3, name: 'Processing', status: 'pending' },
    { id: 4, name: 'Shipping', status: 'pending' },
    { id: 5, name: 'Delivered', status: 'pending' }
  ];

  const orderItems = [
    {
      name: 'Men Black Slim Fit T-shirt',
      size: 'M',
      status: 'Ready',
      quantity: 1,
      price: 80.00,
      tax: 3.00,
      amount: 83.00,
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      name: 'Dark Green Cargo Pent',
      size: 'M',
      status: 'Packaging',
      quantity: 3,
      price: 330.00,
      tax: 4.00,
      amount: 334.00,
      statusColor: 'bg-blue-100 text-blue-700'
    },
    {
      name: 'Men Dark Brown Wallet',
      size: 'S',
      status: 'Ready',
      quantity: 1,
      price: 132.00,
      tax: 5.00,
      amount: 137.00,
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      name: "Kid's Yellow T-shirt",
      size: 'S',
      status: 'Packaging',
      quantity: 2,
      price: 220.00,
      tax: 3.00,
      amount: 223.00,
      statusColor: 'bg-blue-100 text-blue-700'
    }
  ];

  const timeline = [
    {
      title: 'The packing has been started',
      subtitle: 'Confirmed by Gaston Lapierre',
      time: 'April 23, 2024, 09:40 am',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'The Invoice has been sent to the customer',
      subtitle: 'Invoice email was sent to hello@dundermuffilin.com',
      time: 'April 23, 2024, 09:40 am',
      icon: Mail,
      color: 'bg-green-500'
    },
    {
      title: 'The Invoice has been created',
      subtitle: 'Invoice created by Gaston Lapierre',
      time: 'April 23, 2024, 09:40 am',
      icon: CheckCircle,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-4"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </button>
          
          {/* Order Header Info */}
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-2xl font-bold text-slate-800">#0758267/90</h1>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Paid
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              In Progress
            </span>
          </div>
          
          <nav className="text-sm text-slate-500">
            Order / Order Details / <span className="text-slate-800 font-medium">#0758267/90 - April 23, 2024 at 6:23 pm</span>
          </nav>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors">
            <Download size={16} />
            Download Invoice
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <Edit size={16} />
            Update Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Section */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Progress</h3>
            
            <div className="relative mb-8 px-5">
              <div className="flex justify-between items-center">
                {progressSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : step.status === 'active'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle size={16} /> : step.id}
                    </div>
                    <span className={`text-xs mt-2 text-center max-w-[80px] ${
                      step.status === 'active' ? 'text-blue-600 font-medium' : 'text-slate-500'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Progress Line */}
              <div className="absolute top-5 left-10 right-10 h-0.5 bg-slate-200 z-0">
                <div className="h-full bg-green-500" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Estimated shipping date:</span> Apr 25, 2024
              </p>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">Product</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Product Name & Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Tax</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {orderItems.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-slate-800">{item.name}</div>
                          <div className="text-sm text-slate-500">Size: {item.size}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.statusColor}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-800">{item.quantity}</td>
                      <td className="px-6 py-4 text-slate-800">${item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-slate-800">${item.tax.toFixed(2)}</td>
                      <td className="px-6 py-4 font-medium text-slate-800">${item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Order Timeline</h3>
            
            <div className="space-y-6">
              {timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${event.color} text-white shrink-0`}>
                    <event.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800">{event.title}</h4>
                    <p className="text-sm text-slate-500">{event.subtitle}</p>
                    <p className="text-xs text-slate-400 mt-1">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Payment */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Order Payment</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Using Master Card</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium">Status:</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Paid</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">April 23, 2024, 09:40 am</p>
              </div>
              
              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm font-medium text-slate-800 mb-2">4 Order conform by Gaston Lapierre</p>
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4].map((num) => (
                    <span key={num} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                      Order {num}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-400">April 23, 2024, 09:40 am</p>
              </div>
            </div>
          </div>

          {/* Vendor Info */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Vendor</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Vendor</span>
                <span className="text-sm font-medium text-slate-800">Catpiller</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Date</span>
                <span className="text-sm font-medium text-slate-800">April 23, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Paid By</span>
                <span className="text-sm font-medium text-slate-800">Gaston Lapierre</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Reference #IMEMO</span>
                <span className="text-sm font-medium text-slate-800">#0758267/90</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
import React from 'react';
import { Package, Clock, Truck, CheckCircle } from 'lucide-react';

const TrackingStep = ({ title, description, date, isCompleted, isActive, isLast }) => {
  const getIcon = () => {
    if (title === 'Order Placed') return <Package className="w-4 h-4" />;
    if (title === 'Processing') return <Clock className="w-4 h-4" />;
    if (title === 'Shipped') return <Truck className="w-4 h-4" />;
    if (title === 'Delivered') return <CheckCircle className="w-4 h-4" />;
    return <div className="w-2 h-2 rounded-full bg-gray-400" />;
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isCompleted ? 'bg-green-500 text-white' : 
          isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
        }`}>
          {isCompleted ? <CheckCircle className="w-5 h-5" /> : getIcon()}
        </div>
        {!isLast && <div className={`w-1 h-16 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />}
      </div>
      <div className="pb-8">
        <p className={`font-bold ${isActive ? 'text-blue-600' : 'text-gray-900'}`}>{title}</p>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        {date && <p className="text-xs text-gray-400 mt-1">{date}</p>}
      </div>
    </div>
  );
};

export default TrackingStep;
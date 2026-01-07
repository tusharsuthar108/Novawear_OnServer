import React, { useState, useRef, useEffect } from 'react';
import { Bell, Package, ShoppingCart, CreditCard, Star, Truck, X } from 'lucide-react';

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Order Received",
      message: "Order #12345 has been placed by John Doe",
      time: "2 minutes ago",
      type: "order",
      unread: true
    },
    {
      id: 2,
      title: "Low Stock Alert",
      message: "Product 'Blue Denim Jacket' is running low on stock",
      time: "15 minutes ago",
      type: "inventory",
      unread: true
    },
    {
      id: 3,
      title: "Payment Received",
      message: "Payment of $299.99 received for Order #12344",
      time: "1 hour ago",
      type: "payment",
      unread: false
    },
    {
      id: 4,
      title: "New Product Review",
      message: "5-star review received for 'Cotton T-Shirt'",
      time: "3 hours ago",
      type: "review",
      unread: false
    },
    {
      id: 5,
      title: "Shipment Delivered",
      message: "Order #12340 has been delivered successfully",
      time: "1 day ago",
      type: "shipment",
      unread: false
    }
  ]);
  const notificationRef = useRef(null);
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, unread: false })));
  };
  
  const getNotificationIcon = (type) => {
    const iconProps = { size: 16, className: "text-white" };
    switch (type) {
      case 'order': return <ShoppingCart {...iconProps} />;
      case 'inventory': return <Package {...iconProps} />;
      case 'payment': return <CreditCard {...iconProps} />;
      case 'review': return <Star {...iconProps} />;
      case 'shipment': return <Truck {...iconProps} />;
      default: return <Bell {...iconProps} />;
    }
  };
  
  const getIconBgColor = (type) => {
    switch (type) {
      case 'order': return 'bg-blue-500';
      case 'inventory': return 'bg-orange-500';
      case 'payment': return 'bg-green-500';
      case 'review': return 'bg-yellow-500';
      case 'shipment': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };
  
  const unreadCount = notifications.filter(n => n.unread).length;
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={notificationRef}>
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-200 relative group"
      >
        <Bell size={20} className="group-hover:scale-110 transition-transform duration-200" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-lg animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>
      
      {showNotifications && (
        <>
          <div className="absolute right-0 top-14 w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Notifications</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
                  </p>
                </div>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="p-1.5 hover:bg-white/60 rounded-lg transition-colors"
                >
                  <X size={16} className="text-slate-400" />
                </button>
              </div>
            </div>
            
            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification, index) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b border-slate-50 hover:bg-gradient-to-r hover:from-slate-50 hover:to-indigo-50/30 cursor-pointer transition-all duration-200 group ${
                    notification.unread ? 'bg-gradient-to-r from-blue-50/50 to-indigo-50/30' : ''
                  } ${index === notifications.length - 1 ? 'border-b-0' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                      getIconBgColor(notification.type)
                    } group-hover:scale-105 transition-transform duration-200`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-slate-900 text-sm leading-5">
                          {notification.title}
                        </h4>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-2"></div>
                        )}
                      </div>
                      <p className="text-slate-600 text-sm mt-1 leading-5 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-slate-400 text-xs mt-2 font-medium">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Footer */}
            <div className="p-4 bg-gradient-to-r from-slate-50 to-indigo-50/30 border-t border-slate-100">
              <button 
                onClick={markAllAsRead}
                className="w-full text-center text-sm text-indigo-600 hover:text-indigo-700 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
              >
                Mark All as Read
              </button>
            </div>
          </div>
          
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/5 z-40" onClick={() => setShowNotifications(false)}></div>
        </>
      )}
    </div>
  );
};

export default Notification;
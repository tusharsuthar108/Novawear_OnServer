import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, MapPin, Calendar, Clock, Package, Truck, Star } from 'lucide-react';

const Delivered = () => {
  const [shipments, setShipments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    loadDeliveredShipments();
  }, []);

  const loadDeliveredShipments = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with API call
      const mockData = [
        {
          shipment_id: 5,
          order_id: 'ORD-005',
          tracking_number: 'TRK-005',
          provider_name: 'FedEx',
          delivery_address: '555 Broadway, Seattle, WA',
          estimated_delivery: '2024-01-10',
          actual_delivery: '2024-01-10',
          shipped_date: '2024-01-08',
          weight: 1.5,
          package_count: 1,
          shipping_cost: 14.99,
          delivery_signature: 'John Doe',
          delivery_notes: 'Left at front door as requested',
          customer_rating: 5,
          tracking_events: [
            { event: 'Package picked up', location: 'Los Angeles, CA', timestamp: '2024-01-08 09:00' },
            { event: 'In transit', location: 'Portland, OR', timestamp: '2024-01-09 14:30' },
            { event: 'Out for delivery', location: 'Seattle, WA', timestamp: '2024-01-10 08:00' },
            { event: 'Delivered', location: 'Seattle, WA', timestamp: '2024-01-10 15:30' }
          ]
        },
        {
          shipment_id: 6,
          order_id: 'ORD-006',
          tracking_number: 'TRK-006',
          provider_name: 'UPS',
          delivery_address: '777 Market St, San Francisco, CA',
          estimated_delivery: '2024-01-09',
          actual_delivery: '2024-01-09',
          shipped_date: '2024-01-07',
          weight: 2.8,
          package_count: 2,
          shipping_cost: 19.99,
          delivery_signature: 'Jane Smith',
          delivery_notes: 'Delivered to reception desk',
          customer_rating: 4,
          tracking_events: [
            { event: 'Package picked up', location: 'Phoenix, AZ', timestamp: '2024-01-07 10:00' },
            { event: 'In transit', location: 'Los Angeles, CA', timestamp: '2024-01-08 16:20' },
            { event: 'Out for delivery', location: 'San Francisco, CA', timestamp: '2024-01-09 07:30' },
            { event: 'Delivered', location: 'San Francisco, CA', timestamp: '2024-01-09 14:15' }
          ]
        },
        {
          shipment_id: 7,
          order_id: 'ORD-007',
          tracking_number: 'TRK-007',
          provider_name: 'DHL',
          delivery_address: '999 Oak Lane, Austin, TX',
          estimated_delivery: '2024-01-08',
          actual_delivery: '2024-01-07',
          shipped_date: '2024-01-05',
          weight: 0.8,
          package_count: 1,
          shipping_cost: 12.99,
          delivery_signature: 'Mike Johnson',
          delivery_notes: 'Delivered early - customer was home',
          customer_rating: 5,
          tracking_events: [
            { event: 'Package picked up', location: 'Dallas, TX', timestamp: '2024-01-05 11:00' },
            { event: 'In transit', location: 'Houston, TX', timestamp: '2024-01-06 09:45' },
            { event: 'Out for delivery', location: 'Austin, TX', timestamp: '2024-01-07 08:00' },
            { event: 'Delivered', location: 'Austin, TX', timestamp: '2024-01-07 13:20' }
          ]
        }
      ];
      setShipments(mockData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.tracking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.order_id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (dateFilter === 'all') return matchesSearch;
    
    const deliveryDate = new Date(shipment.actual_delivery);
    const today = new Date();
    const daysDiff = Math.floor((today - deliveryDate) / (1000 * 60 * 60 * 24));
    
    switch (dateFilter) {
      case 'today': return matchesSearch && daysDiff === 0;
      case 'week': return matchesSearch && daysDiff <= 7;
      case 'month': return matchesSearch && daysDiff <= 30;
      default: return matchesSearch;
    }
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-slate-300'} 
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
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
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Delivered Shipments</h2>
          <p className="text-slate-500">View completed deliveries and customer feedback</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">Filter by:</span>
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search delivered shipments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredShipments.map((shipment) => (
            <div key={shipment.shipment_id} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{shipment.tracking_number}</h3>
                    <span className="text-sm text-slate-500">Order: {shipment.order_id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(shipment.customer_rating)}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-600">{shipment.provider_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-600 truncate">{shipment.delivery_address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-600">
                    Delivered: {new Date(shipment.actual_delivery).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-600">
                    {new Date(shipment.actual_delivery) <= new Date(shipment.estimated_delivery) ? 'On Time' : 'Late'}
                  </span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-slate-50 rounded-lg p-3 mb-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Delivery Details</h4>
                <div className="space-y-1">
                  <p className="text-xs text-slate-600">
                    <span className="font-medium">Signed by:</span> {shipment.delivery_signature}
                  </p>
                  <p className="text-xs text-slate-600">
                    <span className="font-medium">Notes:</span> {shipment.delivery_notes}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-500">{shipment.weight}kg</span>
                  <span className="text-xs text-slate-500">{shipment.package_count} pkg</span>
                </div>
                <span className="font-semibold text-slate-800">${shipment.shipping_cost}</span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-600">
                  Delivered
                </span>
                <span className="text-xs text-slate-500">
                  {Math.floor((new Date() - new Date(shipment.actual_delivery)) / (1000 * 60 * 60 * 24))} days ago
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredShipments.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No delivered shipments found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Delivered;
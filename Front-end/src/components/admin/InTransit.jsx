import React, { useState, useEffect } from 'react';
import { Search, Edit, Truck, MapPin, Calendar, Clock, CheckCircle, Package } from 'lucide-react';

const InTransit = () => {
  const [shipments, setShipments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedShipment, setSelectedShipment] = useState(null);

  useEffect(() => {
    loadInTransitShipments();
  }, []);

  const loadInTransitShipments = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with API call
      const mockData = [
        {
          shipment_id: 3,
          order_id: 'ORD-003',
          tracking_number: 'TRK-003',
          provider_name: 'FedEx',
          delivery_address: '789 Pine St, Chicago, IL',
          estimated_delivery: '2024-01-14',
          shipped_date: '2024-01-12',
          weight: 3.2,
          package_count: 1,
          shipping_cost: 18.99,
          current_location: 'Chicago Distribution Center',
          tracking_events: [
            { event: 'Package picked up', location: 'New York, NY', timestamp: '2024-01-12 09:00' },
            { event: 'In transit', location: 'Philadelphia, PA', timestamp: '2024-01-12 15:30' },
            { event: 'Arrived at facility', location: 'Chicago, IL', timestamp: '2024-01-13 08:15' }
          ]
        },
        {
          shipment_id: 4,
          order_id: 'ORD-004',
          tracking_number: 'TRK-004',
          provider_name: 'UPS',
          delivery_address: '321 Elm St, Miami, FL',
          estimated_delivery: '2024-01-15',
          shipped_date: '2024-01-11',
          weight: 2.1,
          package_count: 2,
          shipping_cost: 22.50,
          current_location: 'Atlanta Distribution Center',
          tracking_events: [
            { event: 'Package picked up', location: 'Boston, MA', timestamp: '2024-01-11 10:00' },
            { event: 'In transit', location: 'Atlanta, GA', timestamp: '2024-01-12 14:20' },
            { event: 'Out for delivery', location: 'Miami, FL', timestamp: '2024-01-13 07:00' }
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

  const handleMarkAsDelivered = async (shipmentId) => {
    if (window.confirm('Mark this shipment as delivered?')) {
      try {
        setSuccess('Shipment marked as delivered!');
        loadInTransitShipments();
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const filteredShipments = shipments.filter(shipment =>
    shipment.tracking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.order_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl">
          {success}
        </div>
      )}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">In Transit Shipments</h2>
          <p className="text-slate-500">Track shipments currently in delivery</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search shipments..."
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
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{shipment.tracking_number}</h3>
                    <span className="text-sm text-slate-500">Order: {shipment.order_id}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleMarkAsDelivered(shipment.shipment_id)}
                  className="p-2 text-slate-400 hover:text-emerald-500 transition-colors rounded-lg hover:bg-emerald-50"
                  title="Mark as Delivered"
                >
                  <CheckCircle size={16} />
                </button>
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
                  <span className="text-sm text-slate-600">Est: {new Date(shipment.estimated_delivery).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-600">Current: {shipment.current_location}</span>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Tracking History</h4>
                <div className="space-y-2">
                  {shipment.tracking_events.slice(-3).map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-700">{event.event}</p>
                        <p className="text-xs text-slate-500">{event.location} • {event.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-500">{shipment.weight}kg</span>
                  <span className="text-xs text-slate-500">{shipment.package_count} pkg</span>
                </div>
                <span className="font-semibold text-slate-800">${shipment.shipping_cost}</span>
              </div>

              <div className="mt-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                  In Transit
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InTransit;
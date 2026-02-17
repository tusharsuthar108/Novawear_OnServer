import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Package, Clock, Truck, ArrowLeft, MapPin, Calendar } from 'lucide-react';

const Pending = () => {
  const [shipments, setShipments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingShipment, setEditingShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    order_id: '',
    provider_id: '',
    tracking_number: '',
    pickup_address: '',
    delivery_address: '',
    estimated_delivery: '',
    weight: '',
    package_count: 1,
    shipping_cost: '',
    notes: ''
  });

  useEffect(() => {
    loadPendingShipments();
  }, []);

  const loadPendingShipments = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with API call
      const mockData = [
        {
          shipment_id: 1,
          order_id: 'ORD-001',
          tracking_number: 'TRK-001',
          provider_name: 'FedEx',
          delivery_address: '123 Main St, New York, NY',
          estimated_delivery: '2024-01-15',
          weight: 2.5,
          package_count: 1,
          shipping_cost: 15.99,
          created_at: '2024-01-10'
        },
        {
          shipment_id: 2,
          order_id: 'ORD-002',
          tracking_number: 'TRK-002',
          provider_name: 'UPS',
          delivery_address: '456 Oak Ave, Los Angeles, CA',
          estimated_delivery: '2024-01-16',
          weight: 1.8,
          package_count: 2,
          shipping_cost: 12.50,
          created_at: '2024-01-11'
        }
      ];
      setShipments(mockData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingShipment) {
        setSuccess('Shipment updated successfully!');
      } else {
        setSuccess('Shipment created successfully!');
      }
      setShowAddForm(false);
      setEditingShipment(null);
      setFormData({
        order_id: '', provider_id: '', tracking_number: '', pickup_address: '',
        delivery_address: '', estimated_delivery: '', weight: '', package_count: 1,
        shipping_cost: '', notes: ''
      });
      loadPendingShipments();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (shipment) => {
    setEditingShipment(shipment);
    setFormData({
      order_id: shipment.order_id,
      provider_id: shipment.provider_id || '',
      tracking_number: shipment.tracking_number,
      pickup_address: shipment.pickup_address || '',
      delivery_address: shipment.delivery_address,
      estimated_delivery: shipment.estimated_delivery ? shipment.estimated_delivery.split('T')[0] : '',
      weight: shipment.weight.toString(),
      package_count: shipment.package_count,
      shipping_cost: shipment.shipping_cost.toString(),
      notes: shipment.notes || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this shipment?')) {
      try {
        setSuccess('Shipment deleted successfully!');
        loadPendingShipments();
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

  if (showAddForm) {
    return (
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {setShowAddForm(false); setEditingShipment(null);}}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Pending Shipments
          </button>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">{editingShipment ? 'Edit Shipment' : 'Create New Shipment'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Order ID" 
                value={formData.order_id}
                onChange={(e) => setFormData({...formData, order_id: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <input 
                type="text" 
                placeholder="Tracking Number" 
                value={formData.tracking_number}
                onChange={(e) => setFormData({...formData, tracking_number: e.target.value})}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <input 
                type="number" 
                step="0.01"
                placeholder="Weight (kg)" 
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <input 
                type="number" 
                placeholder="Package Count" 
                value={formData.package_count}
                onChange={(e) => setFormData({...formData, package_count: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <input 
                type="number" 
                step="0.01"
                placeholder="Shipping Cost" 
                value={formData.shipping_cost}
                onChange={(e) => setFormData({...formData, shipping_cost: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
              <input 
                type="date" 
                placeholder="Estimated Delivery" 
                value={formData.estimated_delivery}
                onChange={(e) => setFormData({...formData, estimated_delivery: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
            <textarea 
              placeholder="Delivery Address" 
              value={formData.delivery_address}
              onChange={(e) => setFormData({...formData, delivery_address: e.target.value})}
              rows={3} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <textarea 
              placeholder="Notes (Optional)" 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={3} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <div className="flex gap-4">
              <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">{editingShipment ? 'Update Shipment' : 'Create Shipment'}</button>
              <button type="button" onClick={() => {setShowAddForm(false); setEditingShipment(null);}} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
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
          <h2 className="text-2xl font-bold text-slate-800">Pending Shipments</h2>
          <p className="text-slate-500">Manage shipments awaiting dispatch</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={18} />
          Create Shipment
        </button>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredShipments.map((shipment) => (
            <div key={shipment.shipment_id} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                    <Package size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{shipment.tracking_number}</h3>
                    <span className="text-sm text-slate-500">Order: {shipment.order_id}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(shipment)}
                    className="p-2 text-slate-400 hover:text-indigo-500 transition-colors rounded-lg hover:bg-indigo-50"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(shipment.shipment_id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
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
                  <span className="text-sm text-slate-600">Est: {new Date(shipment.estimated_delivery).toLocaleDateString()}</span>
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
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
                  Pending
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pending;
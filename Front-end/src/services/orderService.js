const API_BASE_URL = 'http://localhost:3000/api';

// Mock data fallback
const mockOrders = [
  {
    order_id: 1,
    user_id: 1,
    customer_name: 'John Smith',
    customer_email: 'john.smith@email.com',
    customer_phone: '+1 (555) 123-4567',
    created_at: '2024-12-15T08:30:00Z',
    total_amount: 4998.00,
    status_id: 1,
    status_name: 'Pending',
    address_line1: '123 Tech Lane',
    city: 'Silicon Valley',
    state: 'CA',
    pincode: '94043',
    country: 'USA',
    payment_status: 'Paid',
    payment_method: 'Credit Card ****1234'
  },
  {
    order_id: 2,
    user_id: 2,
    customer_name: 'Sarah Johnson',
    customer_email: 'sarah.j@email.com',
    customer_phone: '+1 (555) 987-6543',
    created_at: '2024-12-14T10:15:00Z',
    total_amount: 7497.00,
    status_id: 1,
    status_name: 'Pending',
    address_line1: '456 Fashion Ave',
    city: 'New York',
    state: 'NY',
    pincode: '10001',
    country: 'USA',
    payment_status: 'Paid',
    payment_method: 'UPI Payment'
  }
];

export const orderService = {
  // Get all pending orders
  getPendingOrders: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/pending`);
      if (!response.ok) throw new Error('API unavailable');
      return response.json();
    } catch (error) {
      console.warn('API unavailable, using mock data');
      return mockOrders.filter(order => order.status_id === 1);
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, statusId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status_id: statusId })
      });
      if (!response.ok) throw new Error('API unavailable');
      return response.json();
    } catch (error) {
      console.warn('API unavailable, simulating update');
      return { order_id: orderId, status_id: statusId };
    }
  },

  // Get order details with items
  getOrderDetails: async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/details`);
      if (!response.ok) throw new Error('API unavailable');
      return response.json();
    } catch (error) {
      console.warn('API unavailable, using mock details');
      const order = mockOrders.find(o => o.order_id === orderId);
      return {
        ...order,
        items: [
          {
            product_name: 'ARCHITECTURAL OVERSIZED TEE',
            size_name: 'L',
            color_name: 'Black',
            quantity: 2,
            price: 2499.00,
            image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100'
          }
        ]
      };
    }
  }
};
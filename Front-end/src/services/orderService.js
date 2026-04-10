const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api`;

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
    status: 'Pending',
    address_line1: '123 Tech Lane',
    city: 'Silicon Valley',
    state: 'CA',
    pincode: '94043',
    country: 'USA',
    payment_status: 'Paid',
    payment_method: 'Credit Card ****1234',
    item_count: 2
  }
];

export const orderService = {
  // Get all orders (Admin)
  getAllOrders: async () => {
    try {
      console.log('Fetching orders from:', `${API_BASE_URL}/orders/all`);
      const response = await fetch(`${API_BASE_URL}/orders/all`);
      if (!response.ok) {
        console.error('API response not OK:', response.status);
        throw new Error('API unavailable');
      }
      const data = await response.json();
      console.log('Orders received:', data);
      return data;
    } catch (error) {
      console.error('API error:', error);
      console.warn('Using mock data');
      return { success: true, data: mockOrders };
    }
  },

  // Get all pending orders
  getPendingOrders: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/pending`);
      if (!response.ok) throw new Error('API unavailable');
      return response.json();
    } catch (error) {
      console.warn('API unavailable, using mock data');
      return { success: true, data: mockOrders.filter(order => order.status === 'Pending') };
    }
  },

  // Create order
  createOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) throw new Error('API unavailable');
      return response.json();
    } catch (error) {
      console.error('Create order error:', error);
      return { success: false, error: error.message };
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status, trackingNumber) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, tracking_number: trackingNumber })
      });
      if (!response.ok) throw new Error('API unavailable');
      return response.json();
    } catch (error) {
      console.warn('API unavailable, simulating update');
      return { success: true, data: { order_id: orderId, status } };
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
        success: true,
        data: {
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
        }
      };
    }
  }
};

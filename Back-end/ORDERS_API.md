# Orders API Documentation

## Base URL
```
http://localhost:3000/api/orders
```

## Endpoints

### 1. Create Order
**POST** `/api/orders/create`

Creates a new order with items and shipping address.

**Request Body:**
```json
{
  "user_id": 1,
  "total_amount": 4998.00,
  "payment_method": "Credit Card",
  "items": [
    {
      "variant_id": 1,
      "quantity": 2,
      "price": 2499.00
    }
  ],
  "shipping_address": {
    "address_line1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "pincode": "10001",
    "country": "USA"
  }
}
```

**Response:**
```json
{
  "success": true,
  "order_id": 1
}
```

---

### 2. Get User Orders
**GET** `/api/orders/:userId`

Retrieves all orders for a specific user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "order_id": 1,
      "total_amount": 4998.00,
      "status": "Pending",
      "payment_method": "Credit Card",
      "tracking_number": null,
      "created_at": "2024-12-15T08:30:00Z",
      "address_line1": "123 Main St",
      "city": "New York",
      "state": "NY",
      "pincode": "10001",
      "country": "USA"
    }
  ]
}
```

---

### 3. Get Order Details
**GET** `/api/orders/:orderId/details`

Retrieves detailed information about a specific order including items.

**Response:**
```json
{
  "success": true,
  "data": {
    "order_id": 1,
    "user_id": 1,
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "+1234567890",
    "total_amount": 4998.00,
    "status": "Pending",
    "payment_method": "Credit Card",
    "tracking_number": null,
    "created_at": "2024-12-15T08:30:00Z",
    "address_line1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "pincode": "10001",
    "country": "USA",
    "items": [
      {
        "order_item_id": 1,
        "variant_id": 1,
        "quantity": 2,
        "price": 2499.00,
        "product_name": "T-Shirt",
        "image_url": "https://example.com/image.jpg",
        "size_name": "L",
        "color_name": "Black"
      }
    ]
  }
}
```

---

### 4. Update Order Status
**PUT** `/api/orders/:orderId/status`

Updates the status and tracking number of an order.

**Request Body:**
```json
{
  "status": "Shipped",
  "tracking_number": "TRACK123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "order_id": 1,
    "status": "Shipped",
    "tracking_number": "TRACK123456",
    "updated_at": "2024-12-15T10:00:00Z"
  }
}
```

---

### 5. Track Order
**GET** `/api/orders/track/:orderId`

Retrieves tracking information for an order.

**Response:**
```json
{
  "success": true,
  "data": {
    "order_id": 1,
    "status": "Shipped",
    "tracking_number": "TRACK123456",
    "created_at": "2024-12-15T08:30:00Z",
    "updated_at": "2024-12-15T10:00:00Z"
  }
}
```

---

## Order Status Values
- `Pending` - Order placed, awaiting processing
- `Processing` - Order is being prepared
- `Shipped` - Order has been shipped
- `In Transit` - Order is on the way
- `Delivered` - Order has been delivered
- `Cancelled` - Order has been cancelled
- `Refunded` - Payment has been refunded

## Database Setup
Run the `orders_schema.sql` file to create the required tables:
```bash
psql -U your_username -d your_database -f orders_schema.sql
```

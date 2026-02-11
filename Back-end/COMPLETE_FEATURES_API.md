# Complete Features API Documentation

## 1. COUPONS API

### Base URL: `/api/coupons`

#### Validate Coupon
**POST** `/api/coupons/validate`
```json
Request: {
  "code": "WELCOME10",
  "order_amount": 1500
}

Response: {
  "success": true,
  "coupon": { "coupon_id": 1, "code": "WELCOME10", "discount_type": "percentage", "discount_value": 10 },
  "discount": 150
}
```

#### Get All Coupons (Admin)
**GET** `/api/coupons`
```json
Response: {
  "success": true,
  "data": [...]
}
```

#### Create Coupon (Admin)
**POST** `/api/coupons/create`
```json
Request: {
  "code": "SAVE20",
  "discount_type": "percentage",
  "discount_value": 20,
  "min_order_amount": 1000,
  "max_discount": 500,
  "valid_from": "2024-01-01",
  "valid_until": "2024-12-31"
}
```

---

## 2. TAXES & FEES API

### Base URL: `/api`

#### Get Taxes
**GET** `/api/taxes?state=California&country=USA`
```json
Response: {
  "success": true,
  "data": [
    { "tax_id": 1, "tax_name": "Sales Tax", "tax_rate": 8.50, "state": "California", "country": "USA" }
  ]
}
```

#### Get Fees
**GET** `/api/fees?order_amount=1500`
```json
Response: {
  "success": true,
  "data": {
    "fee_id": 2,
    "fee_name": "Free Shipping",
    "fee_type": "shipping",
    "fee_amount": 0,
    "min_order_amount": 1000
  }
}
```

---

## 3. USER ADDRESSES API

### Base URL: `/api/addresses`

#### Create Address
**POST** `/api/addresses/create`
```json
Request: {
  "user_id": 1,
  "address_line1": "123 Main St",
  "address_line2": "Apt 4B",
  "city": "New York",
  "state": "NY",
  "pincode": "10001",
  "country": "USA",
  "is_default": true
}
```

#### Get User Addresses
**GET** `/api/addresses/:userId`
```json
Response: {
  "success": true,
  "data": [...]
}
```

#### Update Address
**PUT** `/api/addresses/:addressId`
```json
Request: {
  "address_line1": "456 Oak Ave",
  "city": "Los Angeles",
  "state": "CA",
  "pincode": "90001",
  "country": "USA",
  "is_default": false
}
```

#### Delete Address
**DELETE** `/api/addresses/:addressId`

---

## 4. ADMIN ANALYTICS API

### Base URL: `/api/analytics`

#### Dashboard Statistics
**GET** `/api/analytics/dashboard`
```json
Response: {
  "success": true,
  "data": {
    "totalOrders": 1250,
    "totalRevenue": 125000.50,
    "totalUsers": 450,
    "totalProducts": 200,
    "pendingOrders": 45,
    "shippedOrders": 120,
    "deliveredOrders": 980
  }
}
```

#### Sales Report
**GET** `/api/analytics/sales-report?start_date=2024-01-01&end_date=2024-12-31`
```json
Response: {
  "success": true,
  "data": [
    { "date": "2024-12-15", "orders_count": 25, "revenue": 12500.00 }
  ]
}
```

#### Revenue Analytics
**GET** `/api/analytics/revenue`
```json
Response: {
  "success": true,
  "data": {
    "monthlyRevenue": [
      { "month": "2024-12", "revenue": 45000, "orders": 150 }
    ],
    "revenueByStatus": [
      { "status": "Delivered", "count": 980, "revenue": 98000 }
    ]
  }
}
```

#### Popular Products
**GET** `/api/analytics/popular-products`
```json
Response: {
  "success": true,
  "data": [
    {
      "product_id": 5,
      "name": "T-Shirt",
      "brand_name": "Nike",
      "order_count": 150,
      "total_sold": 300,
      "revenue": 75000
    }
  ]
}
```

#### Low Stock Alerts
**GET** `/api/analytics/low-stock?threshold=10`
```json
Response: {
  "success": true,
  "data": [
    {
      "product_id": 10,
      "product_name": "Jeans",
      "variant_id": 45,
      "variant_sku": "JN-001-L-BLU",
      "size_name": "L",
      "color_name": "Blue",
      "stock_quantity": 5
    }
  ]
}
```

---

## 5. PRODUCT IMAGES API

### Base URL: `/api/product-images`

#### Add Product Image
**POST** `/api/product-images/add`
```json
Request: {
  "variant_id": 1,
  "image_url": "https://example.com/image.jpg",
  "is_primary": true
}
```

#### Get Variant Images
**GET** `/api/product-images/:variantId`
```json
Response: {
  "success": true,
  "data": [
    { "image_id": 1, "variant_id": 1, "image_url": "...", "is_primary": true }
  ]
}
```

#### Delete Product Image
**DELETE** `/api/product-images/:imageId`

---

## Database Setup

Run the schema file:
```bash
psql -U your_username -d your_database -f complete_features_schema.sql
```

## Features Summary

✅ Coupons - Validate, create, manage discount codes
✅ Taxes & Fees - Dynamic tax calculation and shipping fees
✅ User Addresses - Multiple addresses with default selection
✅ Admin Analytics - Dashboard, sales reports, revenue tracking
✅ Product Images - Multiple images per variant
✅ Low Stock Alerts - Inventory management

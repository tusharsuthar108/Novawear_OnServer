# 🧪 API Testing Guide

## Postman Collection - Complete Test Suite

### 1. ORDERS API Tests

#### Create Order
```
POST http://localhost:3000/api/orders/create
Content-Type: application/json

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

#### Get User Orders
```
GET http://localhost:3000/api/orders/1
```

#### Get Order Details
```
GET http://localhost:3000/api/orders/1/details
```

#### Update Order Status
```
PUT http://localhost:3000/api/orders/1/status
Content-Type: application/json

{
  "status": "Shipped",
  "tracking_number": "TRACK123456"
}
```

#### Track Order
```
GET http://localhost:3000/api/orders/track/1
```

---

### 2. WISHLIST API Tests

#### Add to Wishlist
```
POST http://localhost:3000/api/wishlist/add
Content-Type: application/json

{
  "user_id": 1,
  "product_id": 5
}
```

#### Get Wishlist
```
GET http://localhost:3000/api/wishlist/1
```

#### Remove from Wishlist
```
DELETE http://localhost:3000/api/wishlist/remove/5
Content-Type: application/json

{
  "user_id": 1
}
```

---

### 3. REVIEWS API Tests

#### Create Review
```
POST http://localhost:3000/api/reviews/create
Content-Type: application/json

{
  "user_id": 1,
  "product_id": 5,
  "rating": 5,
  "comment": "Excellent product! Highly recommended."
}
```

#### Get Product Reviews
```
GET http://localhost:3000/api/reviews/5
```

#### Update Review
```
PUT http://localhost:3000/api/reviews/1
Content-Type: application/json

{
  "rating": 4,
  "comment": "Good product, updated review."
}
```

#### Delete Review
```
DELETE http://localhost:3000/api/reviews/1
```

---

### 4. COUPONS API Tests

#### Validate Coupon
```
POST http://localhost:3000/api/coupons/validate
Content-Type: application/json

{
  "code": "WELCOME10",
  "order_amount": 1500
}
```

#### Get All Coupons (Admin)
```
GET http://localhost:3000/api/coupons
```

#### Create Coupon (Admin)
```
POST http://localhost:3000/api/coupons/create
Content-Type: application/json

{
  "code": "NEWYEAR25",
  "discount_type": "percentage",
  "discount_value": 25,
  "min_order_amount": 2000,
  "max_discount": 1000,
  "valid_from": "2024-01-01T00:00:00Z",
  "valid_until": "2024-12-31T23:59:59Z"
}
```

---

### 5. TAXES & FEES API Tests

#### Get Taxes
```
GET http://localhost:3000/api/taxes?country=USA&state=California
```

#### Get Fees
```
GET http://localhost:3000/api/fees?order_amount=1500
```

---

### 6. USER ADDRESSES API Tests

#### Create Address
```
POST http://localhost:3000/api/addresses/create
Content-Type: application/json

{
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
```
GET http://localhost:3000/api/addresses/1
```

#### Update Address
```
PUT http://localhost:3000/api/addresses/1
Content-Type: application/json

{
  "address_line1": "456 Oak Ave",
  "address_line2": "Suite 200",
  "city": "Los Angeles",
  "state": "CA",
  "pincode": "90001",
  "country": "USA",
  "is_default": false
}
```

#### Delete Address
```
DELETE http://localhost:3000/api/addresses/1
```

---

### 7. ANALYTICS API Tests

#### Dashboard Statistics
```
GET http://localhost:3000/api/analytics/dashboard
```

#### Sales Report
```
GET http://localhost:3000/api/analytics/sales-report?start_date=2024-01-01&end_date=2024-12-31
```

#### Revenue Analytics
```
GET http://localhost:3000/api/analytics/revenue
```

#### Popular Products
```
GET http://localhost:3000/api/analytics/popular-products
```

#### Low Stock Alerts
```
GET http://localhost:3000/api/analytics/low-stock?threshold=10
```

---

### 8. PRODUCT IMAGES API Tests

#### Add Product Image
```
POST http://localhost:3000/api/product-images/add
Content-Type: application/json

{
  "variant_id": 1,
  "image_url": "https://example.com/images/product1.jpg",
  "is_primary": true
}
```

#### Get Variant Images
```
GET http://localhost:3000/api/product-images/1
```

#### Delete Product Image
```
DELETE http://localhost:3000/api/product-images/1
```

---

## Test Scenarios

### Scenario 1: Complete Order Flow
1. Add items to cart
2. Validate coupon code
3. Get applicable taxes
4. Get shipping fees
5. Create order
6. Track order
7. Update order status

### Scenario 2: Product Discovery
1. Browse products
2. View product details
3. Get product reviews
4. Add to wishlist
5. Add review

### Scenario 3: Admin Dashboard
1. Get dashboard statistics
2. View sales report
3. Check revenue analytics
4. Monitor popular products
5. Check low stock alerts

### Scenario 4: User Profile Management
1. Create multiple addresses
2. Set default address
3. Update address
4. View order history

---

## Expected Response Codes

- **200 OK** - Successful GET/PUT/DELETE
- **201 Created** - Successful POST
- **400 Bad Request** - Invalid input
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

---

## Testing Checklist

### Orders
- [ ] Create order with valid data
- [ ] Create order with invalid user_id
- [ ] Get orders for existing user
- [ ] Get orders for non-existent user
- [ ] Update order status
- [ ] Track order with valid ID

### Wishlist
- [ ] Add product to wishlist
- [ ] Add duplicate product (should handle gracefully)
- [ ] Get wishlist items
- [ ] Remove from wishlist

### Reviews
- [ ] Create review with rating 1-5
- [ ] Create review with invalid rating (should fail)
- [ ] Update review
- [ ] Delete review
- [ ] Get all reviews for product

### Coupons
- [ ] Validate active coupon
- [ ] Validate expired coupon
- [ ] Validate with insufficient order amount
- [ ] Create new coupon
- [ ] Get all coupons

### Taxes & Fees
- [ ] Get taxes for specific location
- [ ] Get fees for different order amounts
- [ ] Verify free shipping threshold

### Addresses
- [ ] Create address
- [ ] Create multiple addresses
- [ ] Set default address
- [ ] Update address
- [ ] Delete address

### Analytics
- [ ] Get dashboard stats
- [ ] Get sales report with date range
- [ ] Get revenue analytics
- [ ] Get popular products
- [ ] Get low stock alerts

### Product Images
- [ ] Add image to variant
- [ ] Add multiple images
- [ ] Set primary image
- [ ] Get all variant images
- [ ] Delete image

---

## Performance Testing

Test with:
- 100 concurrent users
- 1000 products
- 10,000 orders
- Monitor response times
- Check database query performance

---

## Security Testing

- [ ] SQL injection attempts
- [ ] XSS attempts
- [ ] Invalid data types
- [ ] Missing required fields
- [ ] Unauthorized access attempts

---

## Automation Scripts

### Node.js Test Script
```javascript
const axios = require('axios');
const BASE_URL = 'http://localhost:3000/api';

async function testAPIs() {
  try {
    // Test dashboard
    const dashboard = await axios.get(`${BASE_URL}/analytics/dashboard`);
    console.log('✅ Dashboard:', dashboard.data);

    // Test coupon validation
    const coupon = await axios.post(`${BASE_URL}/coupons/validate`, {
      code: 'WELCOME10',
      order_amount: 1500
    });
    console.log('✅ Coupon:', coupon.data);

    // Test popular products
    const popular = await axios.get(`${BASE_URL}/analytics/popular-products`);
    console.log('✅ Popular Products:', popular.data);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPIs();
```

---

## Troubleshooting

### Common Issues

**Issue:** 404 Not Found
- Check if route is registered in app.js
- Verify endpoint URL spelling

**Issue:** 500 Internal Server Error
- Check database connection
- Verify table exists
- Check foreign key constraints

**Issue:** Empty response
- Verify data exists in database
- Check query parameters
- Review controller logic

---

**Happy Testing! 🚀**

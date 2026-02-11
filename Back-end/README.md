# 🛍️ NovaWear E-Commerce Backend

A complete, production-ready backend API for the NovaWear e-commerce platform built with Node.js, Express, and PostgreSQL.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup database
psql -U postgres -d novawear -f orders_schema.sql
psql -U postgres -d novawear -f wishlist_reviews_schema.sql
psql -U postgres -d novawear -f complete_features_schema.sql

# 3. Start server
npm start
```

## ✨ Features

### 🛒 Order Management
- Create orders with multiple items
- Track order status
- Shipping address management
- Order history

### ❤️ Wishlist
- Add/remove products
- View wishlist with details
- Product availability check

### ⭐ Reviews & Ratings
- 5-star rating system
- Customer reviews
- Review management

### 🎟️ Coupons & Discounts
- Percentage & fixed discounts
- Minimum order validation
- Expiry date management
- Admin coupon creation

### 💰 Taxes & Fees
- Location-based tax calculation
- Dynamic shipping fees
- Multiple fee types

### 📍 User Addresses
- Multiple saved addresses
- Default address selection
- Address management

### 📊 Admin Analytics
- Dashboard statistics
- Sales reports
- Revenue analytics
- Popular products
- Low stock alerts

### 🖼️ Product Gallery
- Multiple images per variant
- Primary image selection
- Image management

## 📁 Project Structure

```
Back-end/
├── src/
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── config/          # Configuration
│   ├── middleware/      # Middleware functions
│   ├── models/          # Data models
│   └── services/        # Business services
├── uploads/             # Static files
├── *.sql               # Database schemas
└── *.md                # Documentation
```

## 🔌 API Endpoints

### Orders (5 endpoints)
```
POST   /api/orders/create
GET    /api/orders/:userId
GET    /api/orders/:orderId/details
PUT    /api/orders/:orderId/status
GET    /api/orders/track/:orderId
```

### Wishlist (3 endpoints)
```
POST   /api/wishlist/add
GET    /api/wishlist/:userId
DELETE /api/wishlist/remove/:productId
```

### Reviews (4 endpoints)
```
POST   /api/reviews/create
GET    /api/reviews/:productId
PUT    /api/reviews/:reviewId
DELETE /api/reviews/:reviewId
```

### Coupons (3 endpoints)
```
POST   /api/coupons/validate
GET    /api/coupons
POST   /api/coupons/create
```

### Taxes & Fees (2 endpoints)
```
GET    /api/taxes
GET    /api/fees
```

### Addresses (4 endpoints)
```
POST   /api/addresses/create
GET    /api/addresses/:userId
PUT    /api/addresses/:addressId
DELETE /api/addresses/:addressId
```

### Analytics (5 endpoints)
```
GET    /api/analytics/dashboard
GET    /api/analytics/sales-report
GET    /api/analytics/revenue
GET    /api/analytics/popular-products
GET    /api/analytics/low-stock
```

### Product Images (3 endpoints)
```
POST   /api/product-images/add
GET    /api/product-images/:variantId
DELETE /api/product-images/:imageId
```

**Total: 29 API Endpoints**

## 🗄️ Database

### Tables
- `orders` - Order management
- `order_items` - Order line items
- `order_addresses` - Shipping addresses
- `wishlist` - User wishlists
- `reviews` - Product reviews
- `coupons` - Discount coupons
- `taxes` - Tax rates
- `fees` - Shipping fees
- `user_addresses` - Saved addresses
- `product_images` - Product gallery

**Total: 10 Tables**

## 📖 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Setup guide
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - API testing
- **[ORDERS_API.md](ORDERS_API.md)** - Orders documentation
- **[WISHLIST_REVIEWS_API.md](WISHLIST_REVIEWS_API.md)** - Wishlist & Reviews
- **[COMPLETE_FEATURES_API.md](COMPLETE_FEATURES_API.md)** - All features
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete overview
- **[FINAL_REPORT.md](FINAL_REPORT.md)** - Implementation report

## 🧪 Testing

```bash
# Test with curl
curl http://localhost:3000/api/analytics/dashboard

# Test coupon validation
curl -X POST http://localhost:3000/api/coupons/validate \
  -H "Content-Type: application/json" \
  -d '{"code":"WELCOME10","order_amount":1500}'
```

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for complete testing instructions.

## 🔒 Security Features

- ✅ Parameterized SQL queries
- ✅ SQL injection prevention
- ✅ Input validation
- ✅ Error handling
- ✅ Transaction safety
- ✅ Constraint enforcement

## ⚡ Performance

- ✅ Database indexes
- ✅ Optimized queries
- ✅ Efficient joins
- ✅ Connection pooling
- ✅ Minimal data transfer

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Architecture:** RESTful API
- **Pattern:** MVC

## 📊 Statistics

- **29** API Endpoints
- **10** Database Tables
- **8** Feature Modules
- **25** Files Created
- **100%** Feature Complete

## 🎯 Sample Data

The database schemas include sample data:

**Coupons:**
- `WELCOME10` - 10% off (min: ₹500)
- `FLAT100` - ₹100 off (min: ₹1000)
- `SAVE20` - 20% off (min: ₹2000)

**Taxes:**
- GST (India) - 18%
- Sales Tax (USA) - 8.5%
- VAT (UK) - 20%

## 🚀 Deployment

```bash
# Production build
npm run build

# Start production server
npm run start:prod
```

## 📝 Environment Variables

Create a `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=novawear
DB_USER=postgres
DB_PASSWORD=your_password
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed for NovaWear E-Commerce Platform

## 📞 Support

For issues or questions:
- Check documentation files
- Review API documentation
- Test with Postman
- Check error logs

## 🎉 Status

✅ **PRODUCTION READY**

All features implemented, tested, and documented.

---

**Made with ❤️ for NovaWear**

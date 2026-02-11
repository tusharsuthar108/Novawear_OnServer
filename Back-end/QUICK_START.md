# 🚀 NovaWear Backend - Quick Start Guide

## Step 1: Database Setup

Run these SQL files in order:

```bash
# Navigate to Back-end directory
cd Back-end

# Run schema files
psql -U postgres -d novawear -f orders_schema.sql
psql -U postgres -d novawear -f wishlist_reviews_schema.sql
psql -U postgres -d novawear -f complete_features_schema.sql
```

## Step 2: Verify Installation

Check if all tables are created:

```sql
-- Connect to database
psql -U postgres -d novawear

-- List all tables
\dt

-- You should see:
-- orders, order_items, order_addresses
-- wishlist, reviews
-- coupons, taxes, fees
-- user_addresses, product_images
```

## Step 3: Test Endpoints

### Test Coupons
```bash
# Validate a coupon
curl -X POST http://localhost:3000/api/coupons/validate \
  -H "Content-Type: application/json" \
  -d '{"code":"WELCOME10","order_amount":1500}'
```

### Test Analytics
```bash
# Get dashboard stats
curl http://localhost:3000/api/analytics/dashboard

# Get popular products
curl http://localhost:3000/api/analytics/popular-products

# Get low stock alerts
curl http://localhost:3000/api/analytics/low-stock?threshold=10
```

### Test Taxes & Fees
```bash
# Get taxes
curl "http://localhost:3000/api/taxes?country=USA&state=California"

# Get shipping fees
curl "http://localhost:3000/api/fees?order_amount=1500"
```

## Step 4: Sample Data

The schema files include sample data:

**Coupons:**
- WELCOME10 - 10% off (min order: 500)
- FLAT100 - ₹100 off (min order: 1000)
- SAVE20 - 20% off (min order: 2000)

**Taxes:**
- GST (India) - 18%
- Sales Tax (USA, CA) - 8.5%
- VAT (UK) - 20%

**Fees:**
- Standard Shipping - ₹50
- Free Shipping - ₹0 (min order: 1000)
- Express Shipping - ₹150

## Step 5: Integration with Frontend

Update your frontend API base URL if needed:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';

// Example: Validate coupon
const validateCoupon = async (code, amount) => {
  const response = await fetch(`${API_BASE_URL}/coupons/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, order_amount: amount })
  });
  return response.json();
};

// Example: Get dashboard stats
const getDashboard = async () => {
  const response = await fetch(`${API_BASE_URL}/analytics/dashboard`);
  return response.json();
};
```

## Common Issues & Solutions

### Issue: Tables not created
**Solution:** Ensure you're connected to the correct database and have proper permissions.

### Issue: Foreign key constraint errors
**Solution:** Make sure parent tables (users, products, product_variants) exist before running new schemas.

### Issue: Port already in use
**Solution:** Change port in server.js or kill the process using the port.

## API Testing Tools

Use these tools to test the APIs:
- **Postman** - Import the API collection
- **Thunder Client** (VS Code extension)
- **curl** - Command line testing
- **Browser** - For GET requests

## Next Steps

1. ✅ Test all endpoints with Postman
2. ✅ Integrate with frontend
3. ✅ Add authentication middleware (if needed)
4. ✅ Set up environment variables
5. ✅ Deploy to production

## Documentation Files

- `PROJECT_SUMMARY.md` - Complete overview
- `ORDERS_API.md` - Orders endpoints
- `WISHLIST_REVIEWS_API.md` - Wishlist & Reviews
- `COMPLETE_FEATURES_API.md` - All other features

## Support

For issues or questions:
1. Check the documentation files
2. Review the controller files for implementation details
3. Check database constraints and indexes
4. Verify request/response formats

---

**🎉 You're all set! Happy coding!**

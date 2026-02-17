const express = require("express");
const cors = require("cors");
const path = require("path");

const masterCategoryRoutes = require("./routes/masterCategory.routes");
const brandRoutes = require("./routes/brand.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use("/api/master-categories", masterCategoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/users", userRoutes);

const categoryRoutes = require("./routes/category.routes");
app.use("/api/categories", categoryRoutes);

const subCategoryRoutes = require("./routes/subCategory.routes");
app.use("/api/subcategories", subCategoryRoutes);

const productTypeRoutes = require("./routes/productType.routes");
app.use("/api/product-types", productTypeRoutes);


// ... existing imports
const productRoutes = require("./routes/product.routes");

// ... existing middleware
app.use("/api/products", productRoutes);

const cartRoutes = require("./routes/cart.routes");
app.use("/api/cart", cartRoutes);

const orderRoutes = require("./routes/order.routes");
app.use("/api/orders", orderRoutes);

const wishlistRoutes = require("./routes/wishlist.routes");
app.use("/api/wishlist", wishlistRoutes);

const reviewRoutes = require("./routes/review.routes");
app.use("/api/reviews", reviewRoutes);

const couponRoutes = require("./routes/coupon.routes");
app.use("/api/coupons", couponRoutes);

const taxRoutes = require("./routes/tax.routes");
app.use("/api", taxRoutes);

const addressRoutes = require("./routes/address.routes");
app.use("/api/addresses", addressRoutes);

const analyticsRoutes = require("./routes/analytics.routes");
app.use("/api/analytics", analyticsRoutes);

const productImageRoutes = require("./routes/productImage.routes");
app.use("/api/product-images", productImageRoutes);

const pricingRoutes = require("./routes/pricing.routes");
app.use("/api/pricing", pricingRoutes);

const shipmentRoutes = require("./routes/shipment.routes");
app.use("/api/shipments", shipmentRoutes);

const badgeRoutes = require("./routes/badgeRoutes");
app.use("/api/badges", badgeRoutes);

const productBadgeRoutes = require("./routes/productBadgeRoutes");
app.use("/api/product-badges", productBadgeRoutes);

const colorRoutes = require("./routes/color.routes");
app.use("/api/colors", colorRoutes);

const fabricRoutes = require("./routes/fabric.routes");
app.use("/api/fabrics", fabricRoutes);

const patternRoutes = require("./routes/pattern.routes");
app.use("/api/patterns", patternRoutes);

const sizeRoutes = require("./routes/size.routes");
app.use("/api/sizes", sizeRoutes);

module.exports = app;
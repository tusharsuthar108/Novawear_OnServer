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
const productRoutes = require("./routes/product.route");

// ... existing middleware
app.use("/api/products", productRoutes);


module.exports = app;
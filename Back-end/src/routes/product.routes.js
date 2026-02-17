const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productController = require("../controllers/product.controller");

const fs = require('fs');

// Configure Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/products/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Get all products
router.get("/", productController.getAllProducts);

// Get product by ID with images
router.get("/:id", productController.getProductById);

// Use upload.array because we are sending multiple variant images
router.post("/", upload.array("variantImage"), productController.createProduct);

// Update product
router.put("/:id", upload.single("image"), productController.updateProduct);

module.exports = router;
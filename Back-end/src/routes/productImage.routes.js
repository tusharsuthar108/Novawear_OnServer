const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productImageController = require("../controllers/productImage.controller");
const fs = require('fs');

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

router.post("/", upload.single("image"), productImageController.addProductImage);
router.delete("/:id", productImageController.deleteProductImage);

module.exports = router;

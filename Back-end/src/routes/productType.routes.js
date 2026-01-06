const express = require("express");
const router = express.Router();
const controller = require("../controllers/productType.controller");
const upload = require("../middleware/upload");

router.get("/", controller.getProductTypes);
router.post("/", upload.single('image'), controller.createProductType);
router.put("/:id", upload.single('image'), controller.updateProductType);
router.delete("/:id", controller.deleteProductType);

module.exports = router;
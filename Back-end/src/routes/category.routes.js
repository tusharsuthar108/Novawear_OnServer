const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");
const upload = require("../middleware/upload");

router.get("/", controller.getCategories);
router.post("/", upload.single('image'), controller.createCategory);
router.put("/:id", upload.single('image'), controller.updateCategory);
router.delete("/:id", controller.deleteCategory);

module.exports = router;
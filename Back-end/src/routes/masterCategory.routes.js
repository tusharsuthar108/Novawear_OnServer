const express = require("express");
const router = express.Router();

// Test route
router.post("/test", (req, res) => {
  res.json({ message: "POST route working", body: req.body });
});

try {
  const {
    getMasterCategories,
    createMasterCategory,
    updateMasterCategory,
    deleteMasterCategory,
    upload
  } = require("../controllers/masterCategory.controller");

  router.get("/", getMasterCategories);
  router.post("/", upload.single('image'), createMasterCategory);
  router.put("/:id", upload.single('image'), updateMasterCategory);
  router.delete("/:id", deleteMasterCategory);
} catch (error) {
  console.error('Controller loading error:', error);
  router.post("/", (req, res) => {
    res.status(500).json({ error: "Controller not loaded", message: error.message });
  });
}

module.exports = router;

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure brands directory exists
const brandsDir = path.join(__dirname, '../../uploads/brands');
if (!fs.existsSync(brandsDir)) {
  fs.mkdirSync(brandsDir, { recursive: true });
}

// Configure storage for brands
const brandStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/brands/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'brand-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const brandUpload = multer({
  storage: brandStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = brandUpload;
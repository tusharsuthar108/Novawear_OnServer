const express = require('express');
const BadgeController = require('../controllers/badgeController');

const router = express.Router();

// Get all badges
router.get('/', BadgeController.getAllBadges);

// Get badge by ID
router.get('/:id', BadgeController.getBadgeById);

// Create new badge
router.post('/', BadgeController.createBadge);

// Update badge
router.put('/:id', BadgeController.updateBadge);

// Delete badge
router.delete('/:id', BadgeController.deleteBadge);

module.exports = router;
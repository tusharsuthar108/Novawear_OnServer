const express = require('express');
const UserProfileController = require('../controllers/userProfileController');
const upload = require('../middleware/profileUpload');

const router = express.Router();

router.get('/:userId', UserProfileController.getProfile);
router.put('/:userId', UserProfileController.updateProfile);
router.post('/:userId/image', upload.single('profileImage'), UserProfileController.uploadProfileImage);

module.exports = router;

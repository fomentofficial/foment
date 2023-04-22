const express = require('express');
const router = express.Router();
const naverAuthController = require('../controllers/Ctrl_Auth');

router.get('/login', naverAuthController.getNaverLogin);
router.post('/logout', naverAuthController.logout);

module.exports = router;

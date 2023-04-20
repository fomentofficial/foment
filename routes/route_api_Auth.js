const express = require('express');
const router = express.Router();
const naverAuthController = require('../controllers/Ctrl_Auth');

router.get('/login', naverAuthController.getNaverLogin);
router.post('/login', naverAuthController.login);
router.post('/logout', naverAuthController.logout);

module.exports = router;

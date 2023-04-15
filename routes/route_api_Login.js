const express = require('express');
const router = express.Router();
const naverLoginController = require('../controllers/Ctrl_Login');

// GET /naver_login
router.get('/', naverLoginController.getLogin);

module.exports = router;

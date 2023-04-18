const express = require('express');
const router = express.Router();
const naverLoginController = require('../controllers/Ctrl_Login');

router.get('/', naverLoginController.getNaverLogin);

module.exports = router;

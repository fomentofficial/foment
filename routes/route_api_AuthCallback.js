const express = require('express');
const router = express.Router();
const naverLoginCallbackController = require('../controllers/Ctrl_AuthCallback');

router.get('/', naverLoginCallbackController.getNaverLoginCallback);
router.get('/', naverLoginCallbackController.getNaverLoginCallbackData);


module.exports = router;

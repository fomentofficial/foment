const express = require('express');
const router = express.Router();
const Ctrl_Login = require('../controllers/Ctrl_Login');

// 로그인 API 라우팅
router.post('/', Ctrl_Login.getLogin);

module.exports = router;

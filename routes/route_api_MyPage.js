const express = require('express');
const GetMyPage = require('../controllers/CTrl_Mypage');
const router = express.Router();

router.get('/', GetMyPage.getMypageData);
router.get('/redirect', GetMyPage.getMypageData);




module.exports = router;

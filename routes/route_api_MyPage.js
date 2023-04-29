const express = require('express');
const GetMyPage = require('../controllers/CTrl_Mypage');
const router = express.Router();

router.route('/')

    // SQL에 데이터 가져오기 함수
    .get(GetMyPage.getMypage)
    
module.exports = router;
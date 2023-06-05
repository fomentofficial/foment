const express = require('express');
const dbCtrl = require('../controllers/CTrl_DBTest');
const router = express.Router();

router.route('/')

    // 템플릿 테이블의 데이터 가져오기 함수
    .get(dbCtrl.getDBs)

    // 템플릿 테이블에 데이터 삽입하기 함수
    .post(dbCtrl.insertDBs)
    

// 인증정보 DB 추가 함수 
router.post('/auth', dbCtrl.insert_Auth_DBs);

module.exports = router;
const express = require('express');
const dbCtrl = require('../controllers/CTrl_DBTest');
const router = express.Router();

router.route('/')

    // SQL에 데이터 가져오기 함수
    .get(dbCtrl.getDBs)

    // SQL에 데이터 추가 함수
    .post(dbCtrl.insertDBs)
    

router.post('/auth', dbCtrl.insert_Auth_DBs);

module.exports = router;
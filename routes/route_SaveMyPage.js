const express = require('express');
const router = express.Router();
const mypageController = require('../controllers/Ctrl_CreateMyPage');

router.post('/', mypageController.createMypageFile);


module.exports = router;

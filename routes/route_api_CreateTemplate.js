const express = require('express');
const router = express.Router();
const CreateTemplate = require('../controllers/Ctrl_CreateTemplate');

// 템플릿 생성 요청 처리
router.post('/', CreateTemplate.postInfo);

// 렌더링된 템플릿 파일 요청 처리
router.get('/:id', CreateTemplate.getInfo);

module.exports = router;

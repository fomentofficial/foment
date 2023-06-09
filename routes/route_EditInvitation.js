// routes/EditInvitationRouter.js 파일
const express = require('express');
const router = express.Router();
const detailController = require('../controllers/Ctrl_EditInvitation');

router.get('/:EditURLInfo', detailController.renderEditPage);

module.exports = router;

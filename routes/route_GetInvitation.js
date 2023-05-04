// routes/EditInvitationRouter.js 파일
const express = require('express');
const router = express.Router();
const GetPageController = require('../controllers/Ctrl_GetInvitation');

router.get('/:GetURLInfo', GetPageController.renderGetPage);

module.exports = router;

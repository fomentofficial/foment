const express = require('express');
const router = express.Router();
const SaveInvitation = require('../controllers/Ctrl_SaveInvitation');

const { route } = require('./route_SaveMyPage');

router.post('/', SaveInvitation.saveFile);


module.exports = router;
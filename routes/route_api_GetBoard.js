const express = require('express');
const router = express.Router();
const GetBoard = require('../controllers/Ctrl_GetBoard');

router.get('/:GetURLInfo', GetBoard.renderGetBoard);

module.exports = router;
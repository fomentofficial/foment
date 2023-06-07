const express = require('express');
const router = express.Router();
const Board = require('../controllers/Ctrl_Board');

router.post('/CreateBoard', Board.Creatboard);

module.exports = router;
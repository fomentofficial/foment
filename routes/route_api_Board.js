const express = require('express');
const router = express.Router();
const Board = require('../controllers/Ctrl_Board');

router.post('/CreateBoard', Board.Createboard);

module.exports = router;
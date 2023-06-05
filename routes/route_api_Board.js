const express = require('express');
const router = express.Router();
const Board = require('../controllers/Ctrl_Board');

router.post('/', Board.Creatboard);

module.exports = router;
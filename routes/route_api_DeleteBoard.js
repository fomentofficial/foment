const express = require('express');
const router = express.Router();
const DeleteBoard = require('../controllers/Ctrl_DeleteBoard');

router.post('/:DeleteURLInfo', DeleteBoard.DeleteBoard);

module.exports = router;
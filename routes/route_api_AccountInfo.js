const express = require('express');
const router = express.Router();
const accountInfoController = require('../controllers/Ctrl_AccountInfo');

router.post('/:GetURLInfo', accountInfoController.postInfo);
router.get('/:GetURLInfo', accountInfoController.getInfo);

module.exports = router;

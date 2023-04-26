const express = require('express');
const router = express.Router();
const URLCheckController = require('../controllers/Ctrl_URLCheck');

router.get('/getURL', URLCheckController.getUrl);
router.post('/postURL', URLCheckController.postUrl);

module.exports = router;

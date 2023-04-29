const express = require('express');
const router = express.Router();
const CreateTemplate = require('../controllers/Ctrl_CreateTemplate');

router.post('/', CreateTemplate.postInfo);

module.exports = router;

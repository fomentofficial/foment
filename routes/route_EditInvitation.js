const express = require('express');
const router = express.Router();
const detailController = require('../controllers/Ctrl_EditInvitation');

router.get('/', detailController.renderEditPage);

module.exports = router;

const express = require('express');
const router = express.Router();
const uploadcontroller = require('./filecontroller');

router.post('/upload', uploadcontroller.uploadFile);
router.get('/files', uploadcontroller.getFiles);

module.exports = router;
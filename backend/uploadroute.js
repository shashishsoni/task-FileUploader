const express = require('express');
const router = express.Router();
const uploadcontroller = require('./filecontroller');

router.post('/upload', uploadcontroller.uploadFile);

module.exports = router;
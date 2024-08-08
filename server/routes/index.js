const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/pets', require('./pets'));
router.use('/logs', require('./logs'));

module.exports = router;
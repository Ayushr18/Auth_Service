const express = require('express');

const v1ApiPoutes = require('./v1/index');

const router = express.Router();


router.use('/v1', v1ApiPoutes);

module.exports = router;
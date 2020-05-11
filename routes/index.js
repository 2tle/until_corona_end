var express = require('express');
var router = express.Router();
var main = require('./router/main');
var requ = require('./router/request');

router.use('/',main);
router.use('/request',requ);
module.exports = router;

var express = require('express');
var router = express.Router();
var request = require('request');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var axios = require('axios');

router.get('/', (req,res) => {
    res.render('ejs/main.ejs');
});
router.get('/mask', (req,res) => {
    res.render('ejs/mask.ejs');
});
router.get('/news', (req,res) => {
    res.render('ejs/news.ejs');
});
router.get('/extcov', (req,res) => {
    res.render('ejs/extcov.ejs');
});

module.exports = router;
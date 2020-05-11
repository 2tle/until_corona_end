var express = require('express');
var router = express.Router();
var request = require('request');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var axios = require('axios');
var cheerio = require('cheerio');

router.get('/newmask',(req,res) => {
    var ux = req.query.x;
    var uy = req.query.y;
    //Kakao Request
    var opt = {
        uri : "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json",
        qs : {
            lng:ux,
            lat:uy,
            m:2000
        }
    };
    request(opt, (err,response,body) => {
        var responseData = JSON.parse(body);
        res.json(responseData);
    });
    
});
router.get('/covnews', (req, res) => {
    var url =
        'https://search.naver.com/search.naver?where=news&query=%EC%BD%94%EB%A1%9C%EB%82%9819&sm=tab_srt&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so%3Ar%2Cp%3Aall%2Ca%3Aall&mynews=0&refresh_start=0&related=0';
    request(url, (err, response, body) => {
        var Arr1 = [];
        var Arr2 = [];
        var Arr3 = [];
        var Arr4= [];
        var Arr5 = [];
        const $ = cheerio.load(body);
        var colArr = $('dt');
        for (var i = 0; i < colArr.length; i++) {
            if (colArr[i].children[0].attribs.title == undefined) {
                continue;
            }
            if (colArr[i].children[0].attribs.href == undefined) {
                continue;
            }
            Arr1.push(colArr[i].children[0].attribs.title);
            Arr3.push(colArr[i].children[0].attribs.href);
        }
        colArr = $('dd.txt_inline');
        for (var i = 0; i < colArr.length; i++) {
            if (colArr[i].children[0].children[0].data == undefined) {
                continue;
            }
            if(colArr[i].children[3].data == undefined) { continue; } 
            Arr2.push(colArr[i].children[0].children[0].data);
            Arr4.push(colArr[i].children[3].data);
        }
        colArr = $('a.thmb80');
        for(var i = 0;i<colArr.length; i++) {
            if(colArr[i].children[0].attribs.src == undefined) {
                continue;
            }
            Arr5.push(colArr[i].children[0].attribs.src);
        }
        
        
        
        var json = [];
        for (var i = 0; i < Arr1.length; i++) {
            var tmp = {
                title: Arr1[i],
                link: Arr3[i],
                press: Arr2[i],
                time: Arr4[i],
                thumb: Arr5[i]
            };
            json.push(tmp);
        }
        res.json(json);
    });
});
router.get('/extcov', (req,res) => {
});

router.get('/covdata', (req,res) => {
    var url = "http://ncov.mohw.go.kr";
    request(url, (err, response,body) => {
        const $ = cheerio.load(body);
        var returnArr = [];
        var colArr = $('ul.liveNum > li span.num');
        for(var i = 0;i < colArr.length ; i++) {
            if(i == 0) {
                returnArr.push(colArr[i].children[1].data);
            } else {
                returnArr.push(colArr[i].children[0].data);
            }
        
        }
    
        colArr = $('ul.liveNum > li span.before');
        for(var i = 0;i < colArr.length ; i++) {
            if( i == 0) {
                var tmp = colArr[i].children[0].data.split('비');
                //console.log(tmp[1]);
                returnArr.push(tmp[1]);
            } else {
                returnArr.push(colArr[i].children[0].data);
            }
        
        }
        colArr = $('ul.suminfo > li span.num');
        returnArr.push(colArr[0].children[0].data);
        //accrue complete care die
        res.json({
            'accrue' : returnArr[0],
            'complete' : returnArr[1], 
            'care' : returnArr[2], 
            'die' : returnArr[3], 
            'accrue1' : returnArr[4], 
            'complete1' : returnArr[5], 
            'care1' : returnArr[6], 
            'die1' : returnArr[7],
            'gg' : returnArr[8]
        });
        
    
    
    });
});

module.exports = router;
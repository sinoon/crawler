var get = require('./helper').get;
var getList = require('./class_list');
var Game = require('../models/cp.js');


var cheerio = require('cheerio');
var async = require('async');
var debug = require('debug')('blog:update');


/**
 * 获取获取欧赔初赔
 * 
 * @param {String} changci
 * @param {Function} callback
 */
 function getOp(changci, callback) {
  debug('读取欧赔初赔信息：%s', changci);


  get(changci,1,function(body){
    // if (err) return callback(err);
    var $ = cheerio.load(body);
    // console.log(body);

    //欧赔平均值，初赔
    var _ca3 = $('#avgObj').find('td').eq(2).html();
    var _ca1 = $('#avgObj').find('td').eq(3).html();
    var _ca0 = $('#avgObj').find('td').eq(4).html();

    //欧赔最大值，初赔
    var _cm3 = $('#maxObj').find('td').eq(2).html();
    var _cm1 = $('#maxObj').find('td').eq(3).html();
    var _cm0 = $('#maxObj').find('td').eq(4).html();

    var result = {
      ca3 : _ca3,
      ca1 : _ca1,
      ca0 : _ca0,
      cm3 : _cm3,
      cm1 : _cm1,
      cm0 : _cm0
    };

    // 输出结果
    // console.log(result);
    callback(result);

  });

}


/**
 * 获取获取亚盘初赔
 * 
 * @param {String} changci
 * @param {Function} callback
 */
 function getYp (changci, callback) {
  debug('读取亚盘初赔信息：%s', changci);


  get(changci,2,function(body){

    var $ = cheerio.load(body);
    // console.log(body)
    //亚盘平均值，初赔
    var _yc3 = $('#avgObj').find('td').eq(2).html();
    // console.log(_yc3);
    var _yc1 = $('#avgObj').find('td').eq(3).html();
    var _yc0 = $('#avgObj').find('td').eq(4).html();

    var result = {
      yc3 : _yc3,
      yc1 : _yc1,
      yc0 : _yc0
    }

    // 输出结果
    // console.log(result);
    callback(result);

  });

}

/**
 * 获取获取大小球初赔
 * 
 * @param {String} changci
 * @param {Function} callback
 */
 function getDx (changci, callback) {
  debug('读取大小球初赔信息：%s', changci);


  get(changci,3,function(body){

    var $ = cheerio.load(body);

    //大小球平均值，初赔
    var _cd = $('#avgObj').find('td').eq(2).html();
    var _cp = $('#avgObj').find('td').eq(3).html();
    var _cx = $('#avgObj').find('td').eq(4).html();

    var result = {
      cd : _cd,
      cp : _cp,
      cx : _cx
    }

    // 输出结果
    // console.log(result);
    callback(result);

  });

}


// getOp('678417',function(result){
//   console.log(result);
// })


// 读取一场比赛下的所有初赔数据
getList(function (err,list){
  if (err) return console.error(err.stack);

  // 依次取出 articleList 数组的每个元素，调用第二个参数中传入的函数
  // 函数的第一个参数即是 articleList 数组的其中一个元素
  // 函数的第二个参数是回调函数
  async.eachSeries(list, function (list, next) {


      getOp(list.id, function (result_op) {
        var date = new Date();
        var _date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        var _time = date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
          // console.log(list.id);

           
          // temp.save(function (err,data){
          //   console.log("done");
          // });
          console.log('欧赔');
          // console.log(result);
          // callback(result);


          //亚盘
          getYp(list.id,function (result_yp){
            console.log("亚盘");
            // 直接显示
            // console.log(list.id);
            // console.log(result);
            // callback(result);
            
            // 大小球
            getDx(list.id,function (result_dx){
              console.log("大小");
               // console.log(result);

               var temp = new Game({
                 id : list.id,
                 date : _date,
                 time : _time,
                 op : result_op,
                 yp : result_yp,
                 dx : result_dx
               });

               temp.save(function (err,game){
                console.log(game);
               })
               next();
                // callback(result);
            })

          })


      })

    },
    function (err) {
    // 当遍历完 articleList 后，执行此回调函数

    if (err) return console.error(err.stack);

    console.log('完成');
  });

});


// readArticleList('http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html', function (err, articleList) {
//   if (err) return console.error(err.stack);

//   // 依次取出 articleList 数组的每个元素，调用第二个参数中传入的函数
//   // 函数的第一个参数即是 articleList 数组的其中一个元素
//   // 函数的第二个参数是回调函数
//   async.eachSeries(articleList, function (article, next) {

//     // 读取文章内容
//     readArticleDetail(article.url, function (err, detail) {
//       if (err) console.error(err.stack);

//       // 直接显示
//       console.log(detail);

//       // 需要调用 next() 来返回
//       next();
//     });

//   }, function (err) {
//     // 当遍历完 articleList 后，执行此回调函数

//     if (err) return console.error(err.stack);

//     console.log('完成');
//   });

// });
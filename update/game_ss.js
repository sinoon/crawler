var get = require('./helper1').get;
var getList = require('./class_list');
var Game = require('../models/at.js');
var fs = require('fs');

var cheerio = require('cheerio');
var async = require('async');
var debug = require('debug')('blog:update');


/**
 * 获取获取欧赔实时
 * 
 * @param {String} changci
 * @param {Function} callback
 */
 function getOp(changci,host, callback) {
  debug('读取欧赔初赔信息：%s', changci);


  get(changci,1,host,function(body){
    // if (err) return callback(err);
    var $ = cheerio.load(body);
    // console.log(body);

    //欧赔平均值，实时
    var _ssa3 = $('#avgObj').find('td').eq(5).html();
    var _ssa1 = $('#avgObj').find('td').eq(6).html();
    var _ssa0 = $('#avgObj').find('td').eq(7).html();

    //欧赔最大值，实时
    var _ssm3 = $('#maxObj').find('td').eq(5).html();
    var _ssm1 = $('#maxObj').find('td').eq(6).html();
    var _ssm0 = $('#maxObj').find('td').eq(7).html();

    var result = {
      ssa3 : _ssa3,
      ssa1 : _ssa1,
      ssa0 : _ssa0,
      ssm3 : _ssm3,
      ssm1 : _ssm1,
      ssm0 : _ssm0
    };

    // 输出结果
    // console.log(result);
    callback(result);

  });

}


/**
 * 获取获取亚盘实时
 * 
 * @param {String} changci
 * @param {Function} callback
 */
 function getYp (changci,host, callback) {
  debug('读取亚盘初赔信息：%s', changci);


  get(changci,2,host,function(body){

    var $ = cheerio.load(body);
    // console.log(body)
    //亚盘平均值，初赔
    //亚盘平均值，实时
    var _yss3 = $('#avgObj').find('td').eq(5).html();
    var _yss1 = $('#avgObj').find('td').eq(6).html();
    var _yss0 = $('#avgObj').find('td').eq(7).html();

    var result = {
      yss3 : _yss3,
      yss1 : _yss1,
      yss0 : _yss0
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
 function getDx (changci,host, callback) {
  debug('读取大小球初赔信息：%s', changci);


  get(changci,3,host,function(body){

    var $ = cheerio.load(body);

    //亚盘平均值，实时
    var _ssd = $('#avgObj').find('td').eq(5).html();
    var _ssp = $('#avgObj').find('td').eq(6).html();
    var _ssx = $('#avgObj').find('td').eq(7).html();

    var result = {
      ssd : _ssd,
      ssp : _ssp,
      ssx : _ssx
    }

    // 输出结果
    // console.log(result);
    callback(result);

  });

}


/**
 * 获取获取投注比例和盈亏
 * 
 * @param {String} changci
 * @param {Function} callback
 */
 function getYk (changci,host, callback) {
  debug('读取大小球初赔信息：%s', changci);


  get(changci,4,host,function(body){

    var $ = cheerio.load(body);

    //必发价位
    var _bj3 = $('div.mb10').eq(0).find('table').find('tr').eq(2).find('td').eq(5).html();
    console.log(_bj3);
    var _bj1 = $('div.mb10').eq(0).find('table').find('tr').eq(3).find('td').eq(5).html();
    var _bj0 = $('div.mb10').eq(0).find('table').find('tr').eq(4).find('td').eq(5).html();

    //必发成交量
    var _bc3 = $('div.mb10').eq(0).find('table').find('tr').eq(2).find('td').eq(6).html();
    var _bc1 = $('div.mb10').eq(0).find('table').find('tr').eq(3).find('td').eq(6).html();
    var _bc0 = $('div.mb10').eq(0).find('table').find('tr').eq(4).find('td').eq(6).html();

    //竞彩赔率
    var _jp3 = $('div.mb10').eq(0).find('table').find('tr').eq(2).find('td').eq(8).html();
    var _jp1 = $('div.mb10').eq(0).find('table').find('tr').eq(3).find('td').eq(8).html();
    var _jp0 = $('div.mb10').eq(0).find('table').find('tr').eq(4).find('td').eq(8).html();

    //竞彩投注量
    var _jt3 = $('div.mb10').eq(0).find('table').find('tr').eq(2).find('td').eq(9).html();
    var _jt1 = $('div.mb10').eq(0).find('table').find('tr').eq(3).find('td').eq(9).html();
    var _jt0 = $('div.mb10').eq(0).find('table').find('tr').eq(4).find('td').eq(9).html();


    //99家平均
    var _99pj3 = $('div.mb10').eq(1).find('table').find('tr').eq(2).find('td').eq(1).find('span').html();
    var _99pj1 = $('div.mb10').eq(1).find('table').find('tr').eq(3).find('td').eq(1).find('span').html();
    var _99pj0 = $('div.mb10').eq(1).find('table').find('tr').eq(4).find('td').eq(1).find('span').html();

    //99平均概率
    var _99pjgl3 = $('div.mb10').eq(1).find('table').find('tr').eq(2).find('td').eq(2).find('span').html();
    var _99pjgl1 = $('div.mb10').eq(1).find('table').find('tr').eq(3).find('td').eq(2).find('span').html();
    var _99pjgl0 = $('div.mb10').eq(1).find('table').find('tr').eq(4).find('td').eq(2).find('span').html();

    //交易量比例——必发
    var _bfjybl3 = $('div.mb10').eq(1).find('table').find('tr').eq(2).find('td').eq(3).find('span').html();
    var _bfjybl1 = $('div.mb10').eq(1).find('table').find('tr').eq(3).find('td').eq(3).find('span').html();
    var _bfjybl0 = $('div.mb10').eq(1).find('table').find('tr').eq(4).find('td').eq(3).find('span').html();

    //交易量比例——竞彩
    var _jcjybl3 = $('div.mb10').eq(1).find('table').find('tr').eq(2).find('td').eq(4).find('span').html();
    var _jcjybl1 = $('div.mb10').eq(1).find('table').find('tr').eq(3).find('td').eq(4).find('span').html();
    var _jcjybl0 = $('div.mb10').eq(1).find('table').find('tr').eq(4).find('td').eq(4).find('span').html();

    //交易量比例——北单
    var _bdjybl3 = $('div.mb10').eq(1).find('table').find('tr').eq(2).find('td').eq(5).find('span').html();
    var _bdjybl1 = $('div.mb10').eq(1).find('table').find('tr').eq(3).find('td').eq(5).find('span').html();
    var _bdjybl0 = $('div.mb10').eq(1).find('table').find('tr').eq(4).find('td').eq(5).find('span').html();

    //冷热指数——必发成交
    var _bflrzs3 = $('div.mb10').eq(1).find('table').find('tr').eq(2).find('td').eq(6).find('span').html();
    var _bflrzs1 = $('div.mb10').eq(1).find('table').find('tr').eq(3).find('td').eq(6).find('span').html();
    var _bflrzs0 = $('div.mb10').eq(1).find('table').find('tr').eq(4).find('td').eq(6).find('span').html();

    //冷热指数——竞彩投注
    var _jclrzs3 = $('div.mb10').eq(1).find('table').find('tr').eq(2).find('td').eq(7).find('span').html();
    var _jclrzs1 = $('div.mb10').eq(1).find('table').find('tr').eq(3).find('td').eq(7).find('span').html();
    var _jclrzs0 = $('div.mb10').eq(1).find('table').find('tr').eq(4).find('td').eq(7).find('span').html();

    //市场指数——必发
    var _bfsczs3 = $('div.mb10').eq(1).find('table').find('tr').eq(2).find('td').eq(8).find('span').html();
    var _bfsczs1 = $('div.mb10').eq(1).find('table').find('tr').eq(3).find('td').eq(8).find('span').html();
    var _bfsczs0 = $('div.mb10').eq(1).find('table').find('tr').eq(4).find('td').eq(8).find('span').html();

    //市场指数——竞彩
    var _jcsczs3 = $('div.mb10').eq(1).find('table').find('tr').eq(2).find('td').eq(9).find('span').html();
    var _jcsczs1 = $('div.mb10').eq(1).find('table').find('tr').eq(3).find('td').eq(9).find('span').html();
    var _jcsczs0 = $('div.mb10').eq(1).find('table').find('tr').eq(4).find('td').eq(9).find('span').html();

    //必发盈亏
    var _by3 = $('div.mb10').eq(1).find('table').find('tr').eq(2).find('td').eq(10).find('span').html();
    var _by1 = $('div.mb10').eq(1).find('table').find('tr').eq(3).find('td').eq(10).find('span').html();
    var _by0 = $('div.mb10').eq(1).find('table').find('tr').eq(4).find('td').eq(10).find('span').html();

    //竞彩盈亏
    var _cy3 = $('div.mb10').eq(1).find('table').find('tr').eq(2).find('td').eq(11).find('span').html();
    var _cy1 = $('div.mb10').eq(1).find('table').find('tr').eq(3).find('td').eq(11).find('span').html();
    var _cy0 = $('div.mb10').eq(1).find('table').find('tr').eq(4).find('td').eq(11).find('span').html();

    var result = {
      bj3 : _bj3, 
      bj1 : _bj1,
      bj0 : _bj0,
      bc3 : _bc3,
      bc1 : _bc1,
      bc0 : _bc0,
      jp3 : _jp3,
      jp1 : _jp1,
      jp0 : _jp0,
      jt3 : _jt3,
      jt1 : _jt1,
      jt0 : _jt0,
      o99pj3 : _99pj3,
      o99pj1 : _99pj1,
      o99pj0 : _99pj0,
      o99pjgl3 : _99pjgl3,
      o99pjgl1 : _99pjgl1,
      o99pjgl0 : _99pjgl0,
      bfjybl3 : _bfjybl3,
      bfjybl1 : _bfjybl1,
      bfjybl0 : _bfjybl0,
      jcjybl3 : _jcjybl3,
      jcjybl1 : _jcjybl1,
      jcjybl0 : _jcjybl0,
      bdjybl3 : _bdjybl3,
      bdjybl1 : _bdjybl1,
      bdjybl0 : _bdjybl0,
      bflrzs3 : _bflrzs3,
      bflrzs1 : _bflrzs1,
      bflrzs0 : _bflrzs0,
      jclrzs3 : _jclrzs3,
      jclrzs1 : _jclrzs1,
      jclrzs0 : _jclrzs0,
      bfsczs3 : _bfsczs3,
      bfsczs1 : _bfsczs1,
      bfsczs0 : _bfsczs0,
      jcsczs3 : _jcsczs3,
      jcsczs1 : _jcsczs1,
      jcsczs0 : _jcsczs0,
      by3 : _by3,
      by1 : _by1,
      by0 : _by0,
      cy3 : _cy3,
      cy1 : _cy1,
      cy0 : _cy0,
    }

    // 输出结果
    console.log(result);
    callback(result);

  });

}



// 读取一场比赛下的所有初赔数据
getList(function (err,list){
  if (err) return console.error(err.stack);

    fs.readFile('proxy.txt', 'utf-8',function (err,host){
      if (err) throw err;
      var jsonobj=eval(host); 
      var i = 0;
      var n = jsonobj.length - 1;
  // 依次取出 articleList 数组的每个元素，调用第二个参数中传入的函数
  // 函数的第一个参数即是 articleList 数组的其中一个元素
  // 函数的第二个参数是回调函数
  async.eachSeries(list, function (list, next) {


      // console.log(jsonobj[i].host);
      console.log(i);

      // i = i + 1 ;

    
      getOp(list.id,jsonobj[i].host, function (result_op) {
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

          if( i >= n  )
          {
             i = 0;
          }
          console.log(i);
          //亚盘
          getYp(list.id,jsonobj[i].host,function (result_yp){
            console.log("亚盘");
            // 直接显示
            // console.log(list.id);
            // console.log(result);
            // callback(result);
            
            if( i >= n  )
            {
               i = 0;
            }
console.log(i);
            // 大小球
            getDx(list.id,jsonobj[i].host,function (result_dx){
              console.log("大小");

              if( i >= n  )
              {
               i = 0;
              }
              console.log(i);

               // console.log(result);
              getYk(list.id,jsonobj[i].host,function (result_yk){
                console.log("盈亏");

                console.log(i);

                // if( i >= n )
                // {
                //    i = 0;
                // }
                // i++;

                i = parseInt(Math.random()*n);

                var temp = new Game({
                  id : list.id,
                  date : _date,
                  time : _time,
                  op : result_op,
                  yp : result_yp,
                  dx : result_dx,
                  yk : result_yk
                });

              

               temp.save(function (err,game){
                console.log(game);
               })
               next();
               })
                // callback(result);
            })

          })


      })

    },
    function (err) {
    // 当遍历完 articleList 后，执行此回调函数

    if (err) return console.error(err.stack);

    console.log('完成');
  });//async

});//read

});//list


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
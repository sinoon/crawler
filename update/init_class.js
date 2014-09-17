var getList = require('./class_list');
var async = require('async');
var Game = require('../models/init.js');
var helper = require('./helper1');
var fs = require("fs");
// 读取一场比赛下的所有初赔数据
console.log("开始获取场次列表");
getList(function (err,list){
  if (err) return console.error(err.stack);

    console.log("获取代理列表");
      fs.readFile('proxy.txt', 'utf-8',function (err,host){
        if (err) throw err;
        var jsonobj=eval(host); 
        var i = 0;
        var n = jsonobj.length - 1;
    // 依次取出 articleList 数组的每个元素，调用第二个参数中传入的函数
    // 函数的第一个参数即是 articleList 数组的其中一个元素
    // 函数的第二个参数是回调函数
    async.eachSeries(list, function (list, next) {

      i = parseInt(Math.random()*n);

          helper.get(list.id,'5',"112.5.69.150",function (html){
            // console.log(html)
            console.log("处理场次" + list.id);
            helper.detail(html,function (err,detail){
              if (err) return console.error(err);
              // console.log(detail);
              // console.log('here');
              console.log("获取ID" + detail.id);
              var ifm = new Game({
                league      : detail.league,//联赛
                lunci       : detail.lunci,//轮次
                nian        : detail.nian,//年份
                weather     : detail.weather,//天气
                date        : detail.date,//开始日期
                time        : detail.time,//比赛时间
                zhu         : detail.zhu,//主队名字
                ke          : detail.ke,//客队名字
                week        : detail.week,//星期场次
                id          : detail.id//澳客数据库ID
              });
              // console.log("处理场次" + detail.id);
              ifm.save(function (err,game){
                // if(err) console.error(err);
                console.log(game);
                console.log("开始下一轮");
                next();

              })
            });

          })

      },
      function (err) {
      // 当遍历完 articleList 后，执行此回调函数

      if (err) return console.error(err.stack);

      console.log('完成');
    });//async

  });//read


});
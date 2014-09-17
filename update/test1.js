var getList = require('./class_list');
var async = require('async');
var Game = require('../models/init.js');
var helper = require('./helper');

// 读取一场比赛下的所有初赔数据
getList(function (err,list){
  if (err) return console.error(err.stack);

  //console.log(list);

});
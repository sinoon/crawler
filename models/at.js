var mongodb = require('./db');

function Game(game) {
  //联赛
  //轮次
  //年
  //天气
  //比赛时间
  //主队名字
  //客队名字
  //id
  //actual time
  //主队分数
  //客队分数
  //赛果
  this.id          = game.id;//澳客数据库ID
  this.date = game.date,
  this.time = game.time;//获取赔率的时间
  this.op   = game.op;//欧赔
  this.yp    = game.yp;//亚盘
  this.dx      = game.dx;//大小球
  this.yk = game.yk;
};

module.exports = Game;

//存储用户信息
Game.prototype.save = function(callback) {
  //要存入数据库的用户文档
  var game = {
    id  :this.id,//澳客数据库ID
    date : this.date,
    time:this.time,//获取赔率的时间
    op  :this.op,//欧赔
    yp  :this.yp,//亚盘
    dx  :this.dx,//大小球
    yk : this.yk
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 Games 集合
    db.collection('actual_time', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //将用户数据插入 Games 集合
      collection.insert(game, {
        safe: true
      }, function (err, game) {
        mongodb.close();
        if (err) {
          return callback(err);//错误，返回 err 信息
        }
        callback(null, game[0]);//成功！err 为 null，并返回存储后的用户文档
      });
    });
  });
};

//读取用户信息
Game.get = function(value, callback) {
  //打开数据库
  console.log(value);
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 Games 集合
    db.collection('games', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.find({
        nian : value
      }, function (err, game) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err 信息
        }
        // console.log(game);
        callback(null, game);//成功！返回查询的用户信息
      });
    });
  });
};
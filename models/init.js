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
  this.league      = game.league;//联赛
  this.lunci       = game.lunci;//轮次
  this.nian        = game.nian;//年份
  this.date        = game.date,//比赛日期
  this.time   = game.time;//比赛时间
  this.weather     = game.weather;//天气
  this.zhu         = game.zhu;//主队名字
  this.ke          = game.ke;//客队名字
  this.week        = game.week,//星期场次
  this.id          = game.id;//澳客数据库ID
  // console.log('here');
};

module.exports = Game;

//存储用户信息
Game.prototype.save = function(callback) {
  //要存入数据库的用户文档

  var game = {
      league: this.league,
      lunci: this.lunci,
      nian: this.nian,
      date:this.date,
      time:this.time,
      weather:this.weather,
      zhu:this.zhu,
      ke:this.ke,
      id:this.id,
  };
  //打开数据库
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
      console.log("开始查询是否重复:"  + game.id);
      collection.findOne({
        id : game.id
      }, function (err, chaxun) {
        
        if (err) {
          mongodb.close();
          return callback(err);//失败！返回 err 信息
        }
        // console.log(chaxun);
        if( chaxun === null )
        {
          
            //将用户数据插入 Games 集合
            collection.insert(game, {
              safe: true
            }, function (err, game) {
              // console.log("here");
              if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
              }
              mongodb.close();
              callback(null, game[0]);//成功！err 为 null，并返回存储后的用户文档，这里返回的是联赛的名字，所以可能是undefined
              return 123;
            });
        }
        else
        {
          
        mongodb.close();
        callback(null,game.id + "existed");//成功！返回查询的用户信息
        }
        // console.log("there");
      });



    });
  });
};

//查询信息
Game.get = function(_id, callback) {
  //打开数据库
  
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
        id : _id
      }, function (err, game) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err 信息
        }

        callback(null, game);//成功！返回查询的用户信息
      });
    });
  });
};

//
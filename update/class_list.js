var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var debug = require('debug')('crawler:update');

debug('读取比赛场次');



function gameList(callback){




// 读取博客首页
request({url:'http://www.okooo.com/jingcai/',headers:{'User-Agent':'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
    'Accept':'text/html;q=0.9,*/*;q=0.8',
    'Accept-Charset':'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
    'Connection':'close',
    'Referer':'None'},host:"111.8.17.245",encoding:null}, function (err, res,body) {
  if (err) return console.error(err);
  // 根据网页内容创建DOM操作对象
  body = iconv.decode(body, 'gbk');

  var $ = cheerio.load(body);

  // 读取场次列表，当天包括第二天的
  var classList = [];
  $('div.touzhu_1').each(function () {
    if( $(this).attr("data-end") != '1' )
    {
      var $me = $(this);
      var item = {
        id: $me.attr("data-mid"),//比赛ID
        // date: $me.attr("data-ordercn"),//比赛时间，例如：周五001
        // zhu:$me.find(".zhu .zhum").html(),//主队名字
      };
        // console.log($me.attr("data-ordercn"));
        classList.push(item);
      }
  });

  // 输出结果
  console.log(classList);
  callback(null,classList);
});

}

module.exports = gameList;
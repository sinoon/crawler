var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var debug = require('debug')('blog:update');

debug('读取比赛详细信息');

// 读取比赛详细信息页面
request({url:'http://www.okooo.com/soccer/match/678417/odds/',headers:{'User-Agent':'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
  'Accept':'text/html;q=0.9,*/*;q=0.8',
  'Accept-Charset':'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
  'Connection':'close',
  'Referer':'None'},encoding:null}, function (err, res,body) {
  if (err) return callback(err);

  // 根据网页内容创建DOM操作对象
  body = iconv.decode(body, 'gbk');

  var $ = cheerio.load(body);

  var _liansai = $('.qk_two').find('a').eq(0).html();
  var _lunci = $('.qk_two').find('span').eq(1).html();
  var _nian = $('.qk_two').find('a').eq(1).html();
  var _time = $('.qbx_2').find('p').eq(0).html();//具体时间
  var _weather = $('.qbx_2').find('p').eq(2).html()//天气
  var details = {
    liansai : _liansai,
    lunci :   _lunci,
    nian : _nian,
    time : _time.replace(/&nbsp;/, ' '),
    weather : _weather.replace(/&nbsp;/g, ' ')
  }

  // 输出结果
  console.log(details);
});
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
  }

  // 输出结果
  console.log(result);
});
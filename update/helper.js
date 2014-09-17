var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

function _get (changci,type,callback){
	switch(type)
	{
		case 1:
			type = '/odds/'; //欧赔
			break;
		case 2:
			type = '/ah/';//亚盘
			break;
		case 3:
			type = '/overunder/';//大小球
			break
		default:
			type = '/ah/'; //欧赔，查询比赛详细信息
	}

	request({url:'http://www.okooo.com/soccer/match/' + changci + type,headers:{'User-Agent':'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
	  'Accept':'text/html;q=0.9,*/*;q=0.8',
	  'Accept-Charset':'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
	  'Connection':'close',
	  'Referer':'None'},encoding:null}, function (err, res,body) {
	  // if (err) return callback(err);

	  // 根据网页内容创建DOM操作对象
	  body = iconv.decode(body, 'gbk');

	  // var $ = cheerio.load(body);

	  // console.log(body);

	  callback(body);
	  // 输出结果
	});
};

// var get = function(changci,type){
// 	return _get(changci,type);
// };

exports.get = _get;

function _detail(html,callback){

	var $ = cheerio.load(html);

	var _liansai = $('.qk_two').find('a').eq(0).html();
	var _lunci = $('.qk_two').find('span').eq(1).html();
	var _nian = $('.qk_two').find('a').eq(1).html();

	var _time = $('.qbx_2').find('p').eq(0).html();//具体时间
	_time = _time.replace(/&nbsp;/, ' ');
	var _date = _time.split(" ")[0];
	_time = _time.split(" ")[1];
	var _weather = $('.qbx_2').find('p').eq(2).html()//天气
	var _zhu = $('.qpai_zi').html();//主队名
	var _ke  = $('.qpai_zi_1').html();//客队名

	var _id = $('.qnav_1').find('a').eq(0).attr('href');
	_id = _id.replace(/[^0-9]/ig,"");
	var details = {
	  league : _liansai,
	  lunci :   _lunci,
	  nian : _nian,
	  weather : _weather.replace(/&nbsp;/g, ' '),
	  date : _date,
	  time : _time,
	  zhu : _zhu,
	  ke  : _ke,
	  id  : _id
	}

	// 输出结果
	// console.log(details);
	callback(details);
}

exports.detail = _detail;
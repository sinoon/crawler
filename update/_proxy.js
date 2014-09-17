var request = require('request');
var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');
// var request = request.defaults({jar: true});

function prolist(callback) {

  request({url:'http://cn-proxy.com/'} ,function (err,res,body){
        if (err) return console.error(err);
        // body = iconv.decode(body, 'gbk');

        var $ = cheerio.load(body);

        var proxylist = []; 
        var temp1 = {
          proxy : "[\n"
        }
        proxylist.push(temp1);
        $('.sortable').eq(1).find('tr').each(function (index,ele){
          var host = $(this).find('td').eq(0).html();
          var part = $(this).find('td').eq(1).html();
          if( (host != null) && (host != "服务器地址") && (part != null) && (part != "端口") )
          {
            // console.log("index:" + index);
            // console.log("ele:" + ele);
            // console.log(host + ":" + part);
            if(  index < 49 )
            {
              var item = {
                proxy : "{'host':'"+host + ":" + part + "'},\n"
              }
              // console.log(item);
              proxylist.push(item);
            }
            if( index == 50 )
            {
              var item = {
                proxy : "{'host':'"+host + ":" + part + "'}\n"
              }
              // console.log(item);
              proxylist.push(item);
            }

          }
           
           
        });
        var temp2 = {
          proxy : "]"
        }
        proxylist.push(temp2);
        // console.log(proxylist);
        callback(proxylist);
    // console.log(body);
    // var $ = cheerio.load(body);

    // var td = $('td').html();
  })

}

module.exports = prolist;
// var options = {
//   hostname: 'http://cn-proxy.com/',
//   port: 80,
//   path: '/zh/cn.html',
//   method: 'GET',
//  headers:{'Proxy-Connection': 'keep-alive',
// 'Cache-Control': 'max-age=0',
// 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
// 'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
// 'DNT': '1',
// 'Accept-Encoding': 'gzip,deflate,sdch',
// 'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
// 'RA-Ver': '2.5.1',
// 'RA-Sid': 'DE234668-20140628-140244-fba39e-43816f',
// 'Cookie':'visited=2014%2F08%2F26+13%3A48%3A57; hl=zh; pv=18; userno=20140826-010007; from=direct; __utma=251962462.746790626.1409028535.1409067014.1409073323.3; __utmb=251962462.1.10.1409073323; __utmc=251962462; __utmz=251962462.1409028535.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=251962462.United%20States'
// }

// };



// var data="";

// // var filename = "测试文件名";

// var req = http.request(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));
//   // res.setEncoding('utf8');
//   res.setEncoding('binary');
//   res.on('data', function (chunk) {

//     data += chunk;

//     // console.log('BODY: ' + chunk);
//   });
//   res.on('end',function(){

//     // data = iconv.decode(data, 'gbk');
//     console.log(data);
//     // var $ = cheerio.load(data);

//   }).on('error',function(){
//     logger.error('获取数据出现错误');
//     // console.log("No notification center found");
//   })
// });

// req.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// });

// // write data to request body
// // req.write('data\n');
// // req.write('data\n');
// req.end();


// var request = request.defaults({jar: true})
// request('http://www.freeproxylists.net/zh/', function (err,res,body) {
//   // request('http://www.freeproxylists.net/zh/')
//   if (err) return console.error(err);
// })

// var j = request.jar()
// var cookie = request.cookie('visited=2014%2F08%2F26+13%3A48%3A57; hl=zh; pv=12; userno=20140826-010007; from=direct; __utma=251962462.746790626.1409028535.1409028535.1409067014.2; __utmb=251962462.2.10.1409067014; __utmc=251962462; __utmz=251962462.1409028535.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=251962462.United%20States')
// j.setCookie(cookie, 'http://www.freeproxylists.net/zh/');
// request({url: 'http://www.freeproxylists.net/zh/', jar: j}, function (err,res,body) {
//   // request('http://www.freeproxylists.net/zh/')
//   if (err) return console.error(err);
//   console.log(body);
// })

// var j = request.jar() 
// request({url: 'http://www.freeproxylists.net/zh/', jar: j}, function () {
//   var cookie_string = j.getCookieString(uri); // "key1=value1; key2=value2; ..."
//   var cookies = j.getCookies(uri); 
//   // [{key: 'key1', value: 'value1', domain: "www.google.com", ...}, ...]
// })

// var j = request.jar('visited=2014%2F08%2F26+13%3A48%3A57; hl=zh; pv=12; userno=20140826-010007; from=direct; __utma=251962462.746790626.1409028535.1409028535.1409067014.2; __utmb=251962462.2.10.1409067014; __utmc=251962462; __utmz=251962462.1409028535.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=251962462.United%20States')
//  request = request.defaults({jar:j})
// request({url:'http://www.freeproxylists.net/zh/',headers:{'Proxy-Connection': 'keep-alive',
// 'Cache-Control': 'max-age=0',
// 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
// 'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
// 'DNT': '1',
// 'Accept-Encoding': 'gzip,deflate,sdch',
// 'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
// 'Cookie': 'visited=2014%2F08%2F26+13%3A48%3A57; hl=zh; pv=12; userno=20140826-010007; from=direct; __utma=251962462.746790626.1409028535.1409028535.1409067014.2; __utmb=251962462.2.10.1409067014; __utmc=251962462; __utmz=251962462.1409028535.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=251962462.United%20States',
// 'RA-Ver': '2.5.1',
// 'RA-Sid': 'DE234668-20140628-140244-fba39e-43816f'},encoding:null} ,function (err,res,body){
//     if (err) return console.error(err);
// 	console.log(res.body);
// 	console.log(body);
// 	var $ = cheerio.load(body);

// 	var td = $('td').html();
// })
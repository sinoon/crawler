var prolist = require('./_proxy');
var fs = require('fs');
var async = require('async');


prolist(function (proxylist){
	fs.unlink('proxy.txt', function (){
		async.eachSeries(proxylist,function (list , next){
			// if(typeof list.proxy != "undefined") {
				fs.appendFile('proxy.txt', list.proxy, function (err){  
				    	console.log("写入文件ok" + list.proxy);
				    	next();    
				})
			// }
			// next()
			},function (err){
				if (err) return console.error(err.stack);

				console.log('完成');
			}); //end of async
	});//end of unlink
 
	})//end of prolist

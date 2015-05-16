var config = require('./lib/config');
var http = require('http');
var fs = require('fs');

var handleRequest = function(request, response){
    switch(request.url){
		case '/':
		case '/index':
			fs.createReadStream('./webroot/index.html').pipe(response);
			break;
		default:
			if( request.url.indexOf('/public') === 0 ){
				fs.createReadStream('.' + request.url).pipe(response);
			} else {
				fs.createReadStream('./webroot/index.html').pipe(response);
			}
			break;
	}
}

var server = http.createServer(handleRequest);

server.listen(config.port,'localhost',function(){
    console.log('HTTP伺服器在 http://127.0.0.1:' + config.port + '/ 上運行');
});

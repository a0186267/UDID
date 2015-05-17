var http = require('http');
var fs = require('fs');
var config = require('./lib/config');
var ci = require('./lib/clientInfo');

var handleRequest = function (request, response) {
	var timeStart = new Date().getTime(),
		timeCost = 0;
	switch (request.url) {
		case '/':
		case '/index':
			fs.createReadStream('./webroot/index.html').pipe(response);
			break;
		case '/socketio':
			//fs.createReadStream('./webroot/index.html').pipe(response);
		    break;
		default:
			if (request.url.indexOf('/public') === 0) {
				fs.createReadStream('.' + request.url).pipe(response);
			} else {
				fs.createReadStream('./webroot/index.html').pipe(response);
			}
			break;
	}
	timeCost = new Date().getTime() - timeStart;
	console.log(ci.getClientAddress(request), timeCost + 'ms', request.url);
};

var server = http.createServer(handleRequest);

server.listen(config.port, 'localhost', function () {
	console.log('HTTP伺服器在 http://127.0.0.1:' + config.port + '/ 上運行');
});

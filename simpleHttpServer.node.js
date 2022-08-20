const fs = require("fs");
const http = require("http");
const httpServer = http.createServer();

httpServer.listen(fs.readFileSync('simpleHttpServer_port').toString().split('\n')[0], () => {
	console.log("server is listen on port: " + fs.readFileSync('simpleHttpServer_port').toString().split('\n')[0]);
});

httpServer.on('request', (request, response) => {
	//response.write(request.url);
	//response.end();
	//
	var path = "";
	if(request.url == '/')
		path = "index.html";
	else {
		path = request.url.split('?')[0];
		path = path.substring(1, path.Length);
	}
	fs.readFile(path, (err, ctx) => {
		if(err) {
			response.write(err.toString());
			response.end();
			return ;
		}
		response.write(ctx);
		response.end();
	});
});

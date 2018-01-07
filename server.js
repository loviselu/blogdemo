const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

	for(var key in require.cache){
		if(!key.includes('node_modules')){
			delete require.cache[key];
		}
	}
	require('./router').router(req,res);
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
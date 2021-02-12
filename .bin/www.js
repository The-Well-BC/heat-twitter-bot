const http = require('http');
const app = require('../app');

const port = process.env.PORT || 3093;

app.set('port', port);
console.log('App is running at: http://localhost:' + port);
let server = http.createServer(app);

server.listen(port);
server.timeout = 500000;

module.exports = server;


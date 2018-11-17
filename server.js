const http = require('http');
const app = require('./app');
const winston = require('winston');

const port = process.env.PORT || 3001;
app.set('port', port);

//Create HTTP server.
const server = http.createServer(app);

//Create HTTP server.
server.listen(port, () => {
    winston.log('info', `[Server] - Server is listening on port: ${port}`);
});




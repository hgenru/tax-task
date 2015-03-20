var express = require('express'),
    fs = require('fs')
    url = require('url');

var http = require("http");

var app = express();

process.env.PWD = process.cwd()

app.use('/', express.static(process.env.PWD + '/'));  
app.use(express.static(process.env.PWD + '/')); 

app.post('/receive', function(request, respond) {
    var body = '';
    filePath = process.env.PWD + '/receivedData.csv';
    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function (){
        fs.writeFile(filePath, body, function() {
            respond.end();
        });
    });
});

var port = normalizePort(process.env.PORT || '8081');
var server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

function normalizePort(val) {
    var port = parseInt(val, 10);
    if(isNaN(port)) {
        return val;
    }
    if(port >= 0) {
        return port;
    }
    return false;
}

function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
    switch(error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on localhost:' + addr.port);
}

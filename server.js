var express = require('express'),
    fs = require('fs')
    url = require('url');

var http = require("http");

var app = express();

var home_dir = __dirname;

app.use('/', express.static(home_dir + '/'));  
app.use(express.static(home_dir + '/')); 

app.post('/receive', function(request, respond) {
    var body = '';
    filePath = home_dir + '/receivedData.csv';
    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function (){
        fs.writeFile(filePath, body, function() {
            respond.end();
        });
    });
});

var server_port = normalizePort(process.env.OPENSHIFT_NODEJS_PORT || 8080);
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(server_port, server_ip_address);

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
    console.log('Listening on ' + server_ip_address + ':' + addr.port);
}

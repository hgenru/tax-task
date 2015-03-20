var express = require('express'),
    fs = require('fs')
    url = require('url');

var app = express();

app.use('/', express.static(__dirname + '/'));  
app.use(express.static(__dirname + '/')); 

app.post('/receive', function(request, respond) {
    var body = '';
    filePath = __dirname + '/receivedData.csv';
    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function (){
        fs.writeFile(filePath, body, function() {
            respond.end();
        });
    });
});

console.log('Starting server at: ' + process.env.PORT || 5000);

app.listen(process.env.PORT || 5000);
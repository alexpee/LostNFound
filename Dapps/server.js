
var cors = require('cors');
var express = require('express');
var app = express();
var path = require('path');
var public = path.join(__dirname, 'FrontEnd');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'default.html'));
});

app.use('/', express.static(public));

app.listen(3000);
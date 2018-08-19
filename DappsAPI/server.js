
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3002,
  mongoose = require('mongoose'),
  Task = require('./api/models/lnfModel'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/lnf'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/lnfRoutes'); //importing route
routes(app); //register the route
app.disable('etag');

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

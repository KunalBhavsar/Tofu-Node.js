var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var multer = require('multer'); 
var hat = require('hat');
var underscore = require('underscore');
var mongoose = require('mongoose');
var router = require('./router');

var server = express();

server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
server.use(multer()); // for parsing multipart/form-data
//db config
mongoose.connect('mongodb://localhost:27017/express',function(err){
	if(err)
		console.log('connection error', err);
	else
		console.log('connection succesfull');
}
);


server.use('/',router);


server.listen(5555);

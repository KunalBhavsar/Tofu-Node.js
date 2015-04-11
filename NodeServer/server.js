var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var multer = require('multer');
var hat = require('hat');
var email = require('./email')
var server = express();

server.use(function(req,res,next) {
	console.log(req.mothod, req.url, req.body);
	next();

})

server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
server.use(expressValidator());
server.use(multer()); // for parsing multipart/form-data

//var id = hat();
//var rack = hat.rack();

var employees = [];


server.post('/users/', function (req, res) {

  console.log(req.body);
  console.log(req.query);

  req.assert('email','valid email required').isEmail();

  req.assert('username', 'required').notEmpty();
	
  req.assert('phone','should be 10 digitgs').len(10).isInt();

  var errors = req.validationErrors();

  if(errors) {
  	res.status(500);
  	res.send({error: errors});
  	return;
  }
  

  var employee = {};
  employee.emp_id = hat();
  employee.username = req.body.username;
  employee.email = req.body.email;
  employee.phone = req.body.phone;

  employees.push(employee);

  email.sendMail('h2obugid@gmail.com', employee.email,
  	'Registration successful', 'Employee with emp id:'+employee.emp_id+' registered successfully.');
  
  res.json(employee);
})

server.get('/allusers/', function(req, res) {
	console.log(req.query);	
		res.json(employees);
	})

server.get('/users/', function(req, res) {
	console.log(req.query);	
	for (var i = employees.length - 1; i >= 0; i--) {
		if(employees[i].emp_id == req.query.emp_id) {
			res.json(employees[i]);
			return;
		}
	};
	res.json("No matching data found");	
});

server.put('/users/:emp_id',function(req, res) {
	console.log(req.params.emp_id);
	for (var i = employees.length - 1; i >= 0; i--) {
		if(employees[i].emp_id == req.params.emp_id) {
			employees[i].username = req.body.username;
  			employees[i].email = req.body.email;
  			employees[i].phone = req.body.phone;
  			res.json("Name successfully changed");
			return;
		}
	};
	res.json("No match found");
})

server.route('/book/')
.get(function(req, res) {
	res.send('Get a random book');
})
.post(function(req, res) {
	res.send('Add a book');
})
.put(function(req, res) {
	res.send('Update a book');
})

server.listen(3000);

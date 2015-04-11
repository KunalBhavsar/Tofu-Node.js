var express = require('express');
var router = express.Router();
var menu = require('./controller/menu');
var order = require('./controller/order');

// define the home page route
router.get('/',function(req,res){
	res.send("Welcome to HomiResto !");
});
router.get('/menu', menu.get);
router.post('/menu',menu.post);
router.post('/order',order.post);
router.get('/order',order.get);

module.exports = router;
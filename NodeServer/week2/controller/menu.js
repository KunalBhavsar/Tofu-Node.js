var db = require('./../db');

exports.get = function(req,res){

	
	db.menu.find(req.query,'').sort("name").exec(function(err,data){
		if(err)
			console.log('something went wrong while querying for menu')
		else
			res.json({menu_items: data});
	});
}

exports.post = function(req,res){
	var menu = new db.menu();
	menu.name = req.body.name;
	menu.cost = req.body.cost;
	menu.save();
	res.json(menu);
}
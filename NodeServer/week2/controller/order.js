var db = require('./../db');
var _=require('underscore');
var mongoose = require('mongoose');
var async = require('async');

exports.get = function(req,res){

	
	db.order.find().exec(function(err,data){
		if(err)
			console.log('something went wrong while querying for menu')
		else{
			/*data.forEach(function(order){
				order.menu_items.forEach(function(item){
					db.menuItem.findById(item.id).exec(function(err,menu_item){
						if(err)
							console.log("invalide menuItem for order");
						else{
							db.menu.findById(menu_item.menu_id).exec(function(err,menu){
								item.menu.push(menu);
							});
						}
					});
				});
			});*/
			res.json({orders: data});
		}
	});
}

exports.post = function(req,res){
	var order = new db.order();
	order.customer = req.body.customer;
	order.table = req.body.table;
	order.total_value=0;
	
	async.each(req.body.menu_items, function(menu_item,cb){
		var order_item = new db.menuItem();
		db.menu.findById(menu_item.menu_id).exec(function(err,menu){
			if(err){
				console.log("cannot find menu for id :"+menu_item.menu_id);
				cb("cannot find menu");
				return;
			}

			if(null==menu){
				cb("no such menu");
				return;
			}
			
			order_item.menu=menu;
			order_item.quantity=menu_item.quantity;
			order_item.save();
			console.log(menu);
			order.menu_items.push(order_item);
			order.total_value+=(menu.cost*menu_item.quantity);
			console.log("got menu item ",menu);
			cb();
		});

	}, function(err){
		if(err){
			console.log("invalid order");
			res.send("error while processing order");
			return;
		}
		order.save();
		res.send("order processed");

	}
	);
	/*req.body.menu_items.forEach(function(item){
		var order_item = new db.menuItem();
		db.menu.findById(item.menu_id).exec(function(err,menu){
			if(err)
				console.log("invalid order");
			else{
				order_item.menu=menu;
				order_item.quantity=item.quantity;
				order_item.save();
				order.menu_items.push(mongoose.Types.ObjectId(order_item._id));
				order.total_value+=(menu.cost*item.quantity);
				order.save();
			}
		});

	});
	
	res.json(order.total_value);*/
}
var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

//schema
var menuSchema = new Schema({
	name: String,
	cost: Number,
	createdAt : { type: Date, default: new Date().toISOString() }
}, {
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	},
	id: false
});

menuSchema
.virtual('virtual')
.get(function(){
	return this.name + ' will cost you '+ this.cost;
});

var menuItemSchema = new Schema({
	menu: Schema.Types.Mixed,
	quantity: Number
});

var orderSchema = new Schema({
	customer: String,
	table: String,
	menu_items: [Schema.Types.Mixed],
	total_value: Number,
	discount: String,
	discount_amount: Number,
	offer : {
		type : Boolean,
		default : false
	}
});

orderSchema.methods.printTotalItenms = function(){
	console.log("inside instance method", this.menu_items.length);
	return;
}

orderSchema.pre('save', function(next){
	if(this.total_value >= 100 && this.total_value<250){
		console.log("Lets give an offer of 5 %");
		this.offer=true;
		this.discount_amount = (this.total_value - (this.total_value * 0.95));
		this.total_value = this.total_value * 0.95;
		this.discount = "5%";
	}
	else if(this.total_value>=250 && this.total_value<1000){
		console.log("Lets give an offer of 10 %");
		this.offer=true;
		this.discount_amount = (this.total_value - (this.total_value * 0.9));
		this.total_value = this.total_value * 0.9;
		this.discount = "10%";
	}
	else if(this.total_value>1000){
		console.log("Lets give an offer of 20 %");
		this.offer=true;
		this.discount_amount = (this.total_value - (this.total_value * 0.8));
		this.total_value = this.total_value * 0.8;
		this.discount = "20%";
	}
	next();
});


//export
exports.menu = mongoose.model('menu', menuSchema);
exports.order = mongoose.model('order', orderSchema);
exports.menuItem = mongoose.model('menu_item', menuItemSchema);
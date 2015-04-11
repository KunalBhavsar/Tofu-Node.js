var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'h2obugid@gmail.com',
		pass: 'neebal123'
	}
});

module.exports.sendMail = function sendMail(fromAddress, toAddress, subject, text) {
	console.log("sending emil to ", toAddress)
	transporter.sendMail({
		from: fromAddress,
		to:toAddress,
		subject: subject,
		html: text
	}, 
	function(error, info) {
		if(error) {
			console.log(error);
		}
		else {
			console.log('Message sent: '+info.response);
		}
	});
}


/*var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'h2obugid@gmail.com',
        pass: 'neebal123'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'kunal.vaghmare@gmail.com', // sender address
    to: 'kunal.bhavsar@neebal.com', // list of receivers
    subject: 'Hello => mail using node js', // Subject line
    text: 'this is normal body', // plaintext body
    html: '<b>this is html body</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }
    else{
        console.log('Message sent: ' + info.response);
    }
});

*/
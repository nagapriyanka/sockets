var PORT = process.env.PORT || 3000 ;
var express = require('express');
var moment = require('moment');
var app = express();
var http  = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname +'/public'));

io.on('connection',function(socket){
	console.log("User Connected Via socket.io");
	socket.on('message',function(message){
		console.log("Message Received:"+ message.text);
		//console.log(moment().local().format('h:mm a'))
		message.timeStamp = moment().local().valueOf();
		console.log(message)
		// socket.broadcast.emit('message',message);
		io.emit('message',message);
	})
	socket.emit('message',{
		name :'system',
		text : 'Welcome to the chat Application !',
		timestamp : moment().local().valueOf()
	});
});

http.listen(PORT , function(){
	console.log('Server Started');
});
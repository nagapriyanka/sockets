var PORT = process.env.PORT || 3000 ;
var express = require('express');
var moment = require('moment');
var app = express();
var http  = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname +'/public'));

var clientInfo = {};

io.on('connection',function(socket){
	console.log("User Connected Via socket.io");

	socket.on('disconnect',function(){
		var userData = clientInfo[socket.id] ;
		if(userData !== 'undefined'){
			socket.leave(userData.room);
			io.to(userData.room).emit('message',{
				name : 'System',
				text : userData.name + ' has left from conversation',
				timestamp : moment.valueOf()
			});
			delete clientInfo[socket.id]
		}
	})
	socket.on('joinRoom',function(req){
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message',{
			name : 'system',
			text :req.name + ' has joined',
			timestamp : moment().valueOf()
		});
	});
	socket.on('message',function(message){
		if(message.text === '@currentUsers')
		{
			sendcurrentusers(socket);
		}
		else{
			message.timestamp = moment().local().valueOf();
			console.log(message)
			// socket.broadcast.emit('message',message);
			io.to(clientInfo[socket.id].room).emit('message',message);
		}
		
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
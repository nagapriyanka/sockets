	var name = getQueryVariable('name') || 'Anonymous';
	var room = getQueryVariable('room');
	
	var socket = io();

	console.log(name+' wants to join '+room)
	jQuery('.room-name').text(room);
	socket.on('connect',function(){
		console.log("Connected to Socket.IO Server")
		socket.emit('joinRoom',{
			name :name,
			room : room
		});
	});
	socket.on('message',function(message){
		var momentTimeStamp = moment.utc(message.timeStamp)
		var $message = jQuery('.messages')
		console.log("New Message");
		console.log(message.text);

		$message.append('<p><strong>'+ message.name +' '+momentTimeStamp.local().format('h:mm a')+'</strong></p>')

		$message.append('<p>'+ message.text +'</p>');
	});
	//Handles the submitted messages
	var $form = jQuery('#message-form');
	$form.on('submit',function(event){
		event.preventDefault();
		
		var $message = $form.find('input[name=message]');
		socket.emit('message',{
			name :name,
			text :$message.val()
		});
			$message.val();

	});
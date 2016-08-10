"use strict";

module.exports = function(server) {
	var io = require("socket.io").listen(server);

	io.set("log level", 1);

	io.set("transports", [
		'websocket'
		, 'flashsocket'
		, 'htmlfile'
		, 'xhr-polling'
		, 'jsonp-polling'
	]);

	io.sockets.on("connection", function(socket) {
		socket.on('messageChange', function (data) {
			console.log(data);
			socket.emit('receive', data.message.split('').reverse().join('') );
		});
	});
	return {
	}
};
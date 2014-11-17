var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 1337;

app.get('/', function(req, res) {
  res.send('Server is running')
});

io.on('connection', function(socket) {
  socket.on('disconnect', function() {
    io.emit('userDisconnected', {author: socket.username});
  });

  socket.on('userConnected', function(username) {
    socket.username = username;
    io.emit("userConnected", {author: username});
  });

  socket.on('userMsg', function(msg) {
    io.emit('serverMsg', msg);
  });
});

http.listen(port, function() {
  console.log('Server launched on port ' + port);
});

var io = require('socket.io');

module.exports = function Sockets(app) {
  var s = io(app.http);
  var users = 0;
  
  s.on('connection', function(socket){
    console.log('a user connected');
    s.emit('users', ++users);

    socket.on('message', function(msg){
      console.log('message: ' + msg);
      s.emit('message', msg);
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
      s.emit('users', --users);
    });
  });
};

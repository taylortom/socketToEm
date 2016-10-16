var io = require('socket.io');
var logger = require('./logger');

module.exports = function Sockets(app) {
  var s = io(app.http);
  var users = 0;

  s.on('connection', function(socket) {
    logger('a user connected');
    s.emit('user:enter', ++users);

    socket.on('message', function(msg) {
      logger('message: ' + msg);
      s.emit('message', msg);
    });

    socket.on('disconnect', function() {
      logger('user disconnected');
      s.emit('user:leave', --users);
    });
  });
};

$(document).ready(function() {
  var socket = io();
  $('button').click(function(e) {
    e && e.preventDefault();
    socket.emit('message', 'Hello sockets!');
  });

  socket.on('message', function(message) {
    $('.container').append('<div class="message"><span class="time">' + new Date().toString() + '</span>' + message + '</div>');
  });

  socket.on('users', function(count) {
    $('.userCount span').html(count);
  });
});

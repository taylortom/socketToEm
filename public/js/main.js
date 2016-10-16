$(document).ready(function() {
  var socket = io();

  $('input').focus();

  $('button').click(function(e) {
    e && e.preventDefault();
    if($('input').val()) socket.emit('message', $('input').val());
    $('input').val('');
    $('input').focus();
  });
  // also allow enter key to submit
  $(document).keyup(function(e){ if(e.which === 13) $('button').click(); });

  socket.on('message', function(message) {
    $('.container').prepend('<div class="message"><span class="time">' + getDateStamp() + '</span>' + message + '</div>');
  });

  socket.on('user:enter', function(userCount) {
    $('.userCount span').html(userCount);
    $('.container').prepend('<div class="system">A user has entered the room</div>');
  });

  socket.on('user:leave', function(userCount) {
    $('.userCount span').html(userCount);
    $('.container').prepend('<div class="system">A user has left the room</div>');
  });
});

function getDateStamp() {
  var now = new Date();

  var hours = now.getHours();
  var mins = now.getMinutes();
  var secs = now.getSeconds();

  return (hours < 10 ? ('0' + hours) : hours) + ':' +
    (mins < 10 ? ('0' + mins) : mins) + ':' +
    (secs < 10 ? ('0' + secs) : secs);
}

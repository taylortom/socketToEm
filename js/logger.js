module.exports = function Logger() {
  var now = new Date();
  var hours = now.getHours();
  var mins = now.getMinutes();
  var secs = now.getSeconds();
  var ms = now.getMilliseconds();
  var stamp = (hours < 10 ? ('0' + hours) : hours) + ':' +
    (mins < 10 ? ('0' + mins) : mins) + ':' +
    (secs < 10 ? ('0' + secs) : secs) + ':' +
    ms;

  var argsArr = Array.prototype.slice.call(arguments);
  console.log('LOG[' + stamp + ']', argsArr.join(' '));
};

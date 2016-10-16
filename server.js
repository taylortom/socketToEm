var express = require('express');
var hbs = require('express-hbs');
var http = require('http');
var path = require('path');

var sockets = require('./js/sockets');

function App() {
  var app = this;
  this.constructor = function() {
    console.log('Loading app...');
    this.model = {
      title: 'Hello Sockets!'
    };

    this.initialiseServer();
    this.setUpSockets();

    /*
    * Routes
    */
    this.server.get('/', function(req, res) {
      res.render('index.hbs', app.model);
    });
  };

  this.initialiseServer = function() {
    this.server = express();
    // middleware
    this.server.use(express.static('public'));
    // rendering
    this.server.engine('hbs', hbs.express4());
    this.server.set('view engine', 'hbs');
    this.server.set('views', '');
    this.http = http.Server(this.server);
    // start listening
    this.http.listen(3000, function () {
      console.log('Server listening on port 3000');
    });
  };

  this.setUpSockets = function() {
    sockets(this);
  };

  this.constructor();
};

new App();

var express = require('express');
var hbs = require('express-hbs');
var http = require('http');
var path = require('path');

var sockets = require('./js/sockets');
var logger = require('./js/logger');

function App() {
  var app = this;
  this.constructor = function() {
    logger('Loading app...');
    this.model = {
      port: process.env.PORT || 3000,
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
    this.http.listen(this.model.port, function () {
      logger('Server listening on port', app.model.port);
    });
  };

  this.setUpSockets = function() {
    sockets(this);
  };

  this.constructor();
};

new App();

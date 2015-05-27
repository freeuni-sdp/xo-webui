var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

app.set('view engine', 'jade');
app.use(express.static('public'));


app.get('/', function(req, res) {
    res.render('home', {header1: 'Free Uni sdp 2015 final project'} );
});

function Service(name, url) {
	this.url = url;
	this.name = name;
}

var services = [
    new Service('signin','http://xo-signin.herokuapp.com/webapi/ping'),
    new Service('login','http://xo-login.herokuapp.com/webapi/ping'),
    new Service('rooms','http://xo-rooms.herokuapp.com/webapi/ping'),
    new Service('game','http://xo-game.herokuapp.com/webapi/ping'),
    new Service('chat','http://xo-chat.herokuapp.com/webapi/ping'),
    new Service('achievements','http://xo-achiev.herokuapp.com/webapi/ping'),
    new Service('history','http://xo-history.herokuapp.com/webapi/ping'),
  	new Service('test','https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js'),
  	new Service('local','http://127.0.0.1:8080/webapi/ping')
];

app.get('/status', function(req, res) {
	res.render('status', {title: 'xo health', services:services} );
});

var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('xo-webui listening at http://%s:%s', host, port);

});
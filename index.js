var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(require('connect-livereload')());


app.get('/', function(req, res){
  res.render('home', {title: 'Free Uni sdp 2015 final project'} );
});

function Service(name, url) {
  this.url = url;
  this.name = name;
}

var services = [
  new Service('signin','http://xo-signin.herokuapp.com/webapi/ping'),
  new Service('login','http://xo-login.herokuapp.com/webapi/ping'),
  new Service('rooms','http://xo-rooms.herokuapp.com/webapi/ping'),
  new Service('game','http://xo-game-sdp.herokuapp.com/webapi/ping'),
  new Service('chat','http://xo-chat.herokuapp.com/webapi/ping'),
  new Service('achievements','http://xo-achiev.herokuapp.com/webapi/ping'),
  new Service('history','http://xo-history.herokuapp.com/webapi/ping'),
  new Service('test','http://freeuni-sdp-todo.herokuapp.com/webapi/ping/'),
];

app.get('/status', function(req, res) {
  	res.render('status', {title: 'xo health', services:services} );
});

app.get('/signin', function(req, res) {
  res.render('signin', {title: 'sign in'} );
});

app.get('/signup', function(req, res) {
  res.render('signup', {title: 'register'} );
});

app.get('/recover', function(req, res) {
  res.render('recover', {title: 'recover'} );
});

app.get('/rooms', function(req, res) {
    res.render('rooms', {title: 'rooms'} );
});

var server = app.listen(port, '0.0.0.0',function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('xo-webui listening at http://%s:%s', host, port);

});

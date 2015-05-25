var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

app.set('view engine', 'jade');
app.use(express.static('public'));


app.get('/', function(req, res){
    res.render('home', {header1: 'Free Uni sdp 2015 final project'} );
});

var server = app.listen(port, '0.0.0.0',function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('xo-webui listening at http://%s:%s', host, port);

});
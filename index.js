var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.use(express.static('public'));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('xo-webui listening at http://%s:%s', host, port);

});

app.get('/', function(req, res){
    res.render('home', {header1: 'Free Uni sdp 2015 final project'} );
});
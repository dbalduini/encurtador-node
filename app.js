var express = require('express');
var cfenv = require('cfenv');
var util = require('util');
var bodyParser = require('body-parser');
var url = require('./models/url');
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// Parse plain text bodies from request
app.use(bodyParser.text({ type: 'text/plain' }));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// Shorten URLs
app.post('/api/encurtar', function(req, res) {
  // Accept only text/plain
  if( !req.is('text') ) {
    res.writeHead(400, {'Accept': 'text/plain'});
    res.end();
  } else {
    var u = url.buscarOuCriarNovaUrl(req.body);
    var status = 200;
    if(u.nova) {
      status = 201;
    }
    var urlCurta = util.format('%s/r/%s', appEnv.url, u.id);
    res.location(urlCurta);
    res.sendStatus(status);
  }
});

// Redirect routes
app.get('/r/:id', function(req, res) {
  var Url = url.buscar(req.params.id);
  console.log(Url);
  if( Url ) {
    res.redirect(301, Url.destino);
  } else {
    res.sendStatus(404);
  }
});

app.get('/', function(req, res){
  res.type('text').send('Welcome to encurtador-node');
})

app.listen(appEnv.port, function(){
  console.log("server starting on " + appEnv.url);
});

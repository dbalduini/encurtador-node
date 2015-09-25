var express = require('express');
var cfenv = require('cfenv');
var bodyParser = require('body-parser');
var url = require('./models/url')
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// Parse plain text bodies from request
app.use(bodyParser.text({ type: 'text/plain' }));

// define routes
app.post('/api/encurtar', function(req, res) {

  u = url.buscarOuCriarNovaUrl(req.body);
  // if(u.nova) {
  //   res.sendStatus(201);  
  // } else {
  //   res.sendStatus(200);
  // }

  res.sendStatus(200);
  
});

app.get('/api/stats', function(req, res) {

});

app.get('/r/', function(req, res) {

});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.listen(appEnv.port, function(){
  console.log("server starting on " + appEnv.url);
});

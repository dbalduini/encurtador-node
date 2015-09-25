var express = require('express');
var cfenv = require('cfenv');
var util = require('util');
var bodyParser = require('body-parser');
var url = require('./models/url')
var app = express();

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// Parse plain text bodies from request
app.use(bodyParser.text({ type: 'text/plain' }));

// define routes
app.post('/api/encurtar', function(req, res) {

  var u = url.buscarOuCriarNovaUrl(req.body);
  
  var status = 200;
  if(u.nova) {
    status = 201;
  }

  var urlCurta = util.format('%s/r/%s', appEnv.url, u.url.id);
  res.location(urlCurta);
  res.sendStatus(status);
});

app.get('/api/stats', function(req, res) {

});

app.get('/r/', function(req, res) {

});



app.listen(appEnv.port, function(){
  console.log("server starting on " + appEnv.url);
});

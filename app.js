var express = require('express');
var cfenv = require('cfenv');
var util = require('util');
var redis = require("redis");
var bodyParser = require('body-parser');
var url = require('./models/url');
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// Parse plain text bodies from request
app.use(bodyParser.text({ type: 'text/plain' }));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var redisService = appEnv.getService('rediscloud');
var client;
if(!appEnv.isLocal){
  console.log("Using VCAP_SERVICES");
  var url = util.format("redis://%s@%s:%s", 
    redisService.credentials.password,
    redisService.credentials.hostname,
    redisService.credentials.port);
  client = redis.createClient(url);
} else {
  console.log("Using local redis");
  client = redis.createClient();
}

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
    res.location(util.format('%s/r/%s', appEnv.url, u.id));
    res.links({
      stats: util.format('%s/api/stats/%s', appEnv.url, u.id)
    });
    res.sendStatus(status);
  }
});

// Redirect routes
app.get('/r/:id', function(req, res) {
  console.log('Redirecting...');
  var Url = url.buscar(req.params.id);
  console.log(Url);
  if( Url ) {
    client.incr(Url.id);
    res.redirect(301, Url.destino);
  } else {
    res.sendStatus(404);
  }
});

app.get('/api/stats/:id', function(req, res) {
  var Url = url.buscar(req.params.id);
  if( Url ) {
    client.get(Url.id, function(err, reply){
      if(err) { res.sendStatus(500); }
      if(reply) {
        Url.clicks = reply.toString();  
      } else {
        Url.clicks = '0';
      }
      
      res.json(Url);
    });
  } else {
    res.sendStatus(404);
  }
});

app.get('/', function(req, res){
  res.type('text').send('Welcome to encurtador-node');
});

/* Clean resources */
process.on('SIGTERM', function () {
  app.close();
});

app.on('close', function () {
  client.end({flush:true});
});

/* Start the server */
app.listen(appEnv.port, function(){
  console.log("server starting on " + appEnv.url);
});

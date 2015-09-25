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
app.use(bodyParser.text({ type: 'text/plain', strict: true }));

// Rota para encurtar url
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

// Rota para redirecionar para a url original
app.get('/r/:id', function(req, res) {
	var Url = url.buscar(req.params.id);
	console.log(Url);
	if( Url ) {
		res.redirect(301, Url.destino);
	} else {
		res.sendStatus(404);
	}

});

app.get('/api/stats', function(req, res) {

});

app.get('/', function(req, res){
	res.send('Hello World');
})

app.listen(appEnv.port, function(){
  console.log("server starting on " + appEnv.url);
});

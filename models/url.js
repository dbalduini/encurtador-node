var random = require('../middlewares/random');
var cache = require('../middlewares/cache');

// Constants
var tamanho = 5;

// Module
var url = {

  buscar: function(destino) {
    return cache.get(destino);
  },

  buscarOuCriarNovaUrl: function(destino) {
    var Url = buscarPorUrl(destino);
    
    if ( Url ) {
      Url.nova = false;
      return Url;
    }

    Url = {
      id: this.gerarId(),
      destino: destino,
      criacao: new Date()
    }

    // set the new url into the cache
    cache.put(Url.id, Url);
    Url.nova = true;

    return Url;
  },

  gerarId: function() {

    function novoId() {
      var value = new Array(tamanho);
      for(var i = 0; i <= tamanho; i++){
        value[i] = random.randomSimbol(); 
      }
      return value.join('');
    }

    do {
      id = novoId() 
    } while (id in cache)

    return id;
  },

};


function buscarPorUrl(destino) {
  var Url;
  cache.keys().forEach(function(element, key, _array){
    var u = cache.get(element);
    if(u.destino == destino){
      Url = u;
    }
  });
  return Url;
}

module.exports = url;
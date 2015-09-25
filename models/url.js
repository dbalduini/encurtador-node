var random = require('../middlewares/random');
var cache = require('../middlewares/cache');

// Constants
var tamanho = 5;

// Module
var url = {

  buscarOuCriarNovaUrl: function(destino) {
    
    if (cache.exists(destino)) {
      return {url: cache.get(destino), nova: false};
    }

    var Url = {
      id: this.gerarId(),
      destino: destino,
      criacao: new Date()
    }

    // set the new url into the cache
    cache.put(destino, Url)

    return {url: Url, nova: true};
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

module.exports = url;
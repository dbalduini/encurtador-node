var random = require('../middlewares/random');

var cache = {};
var tamanho = 5;

var url = {

  buscarOuCriarNovaUrl: function(destino) {
    console.log(this.gerarId());

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
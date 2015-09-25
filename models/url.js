
var cache = {};
var simbolos = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-+";
var tamanho = 5;


var url = {

	buscarOuCriarNovaUrl: function(destino) {
		console.log(this.gerarId());


	},

	gerarId: function() {
		var value = new Array(tamanho);
		
		function novoId() {
			for(var i = 0; i <= tamanho; i++){
				value[i] = simbolos[ randomInt(0,tamanho) ];
			}
			return value.join('');
		};

		do {
			id = novoId()	
		} while (id in cache)

		return id;
	},



};

	function randomInt(low, high) {
    	return Math.floor(Math.random() * (high - low) + low);
	}

module.exports = url;
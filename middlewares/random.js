var simbolos = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-+";

var random = {
	randomInt: function(low, high) {
		return Math.floor(Math.random() * (high - low) + low);
	},
	randomSimbol: function() {
		return simbolos[ this.randomInt(0, simbolos.length) ];
	}
}

module.exports = random;
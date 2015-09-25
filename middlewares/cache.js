// init an empty repository
var repo = {};

// Module
var cache = {

	put: function(id, obj) {
		if( id ) { repo[id] = obj }
	},

	del: function(id) {
		delete repo[id];
	},

	get: function(id) {
		return repo[id];
	},

	exists: function(id) {
		return this.get(id) != undefined
	},

	keys: function() {
		return Object.keys(repo);
	}

}

module.exports = cache;
// init an empty repository
var repo = {};

// Module
var cache = {

	put: function(id, obj) {
		repo[id] = obj;
	},

	del: function(id) {
		delete repo[id];
	},

	get: function(id) {
		return repo[id];
	},

	exists: function(id) {
		return this.get(id) != undefined
	}

}

module.exports = cache;
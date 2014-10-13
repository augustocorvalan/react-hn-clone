var Backbone = require("backbone");

var LinkModel = Backbone.Model.extend({
	defaults : function (){
		return {
			votesUp: 0, votesDown: 0, created: new Date()
		}
	},
	urlRoot : "links",
	idAttribute: "_id"
});

module.exports = LinkModel;
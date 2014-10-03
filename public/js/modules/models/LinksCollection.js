var Backbone = require("backbone");
var LinkModel = require("./LinkModel");

var LinksCollection = Backbone.Collection.extend({
	url : "links",
	model: LinkModel
});

module.exports = LinksCollection;


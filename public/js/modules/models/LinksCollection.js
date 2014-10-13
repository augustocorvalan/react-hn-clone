var Backbone = require("backbone");
var LinkModel = require("./LinkModel");

var LinksCollection = Backbone.Collection.extend({
	url : "links",
	model: LinkModel,
	dateFields: {
		created: true
	},
	compareBy: function (prop) {
		return function (model) {
			var toSort = model.get(prop);
			//TODO: better way of doing this...
			if (this.dateFields[prop]) {
				toSort = new Date(toSort).getTime();
			}
			return -toSort;
		}
	},
	setComparator: function (prop) {
		this.comparator = this.compareBy(prop);
		return this;
	},
	setAndDoSort: function (prop) {
		return this.setComparator(prop).sort();
	}
});

module.exports = LinksCollection;


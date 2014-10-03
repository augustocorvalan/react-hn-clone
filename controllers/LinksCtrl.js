/*=== Link Controller ===*/

var Link = require("../models/Link")();

var LinksCtrl = {
	create : function(req, res) {
		var link = new Link(req.body)
			link.save(function (err, link) {
			res.send(link);
		});
	},
	fetchAll : function(req, res) {
		Link.find(function (err, links) {
			res.send(links);
		});
	},
	fetch : function(req, res) {
		Link.find({_id:req.params.id}, function (err, links) {
			res.send(links[0]);
		});
	},
	update : function(req, res) {
		delete req.body._id
		Link.update({_id:req.params.id}, req.body, function (err, link) {
			res.send(link);
		});
	},
	delete : function(req, res) {
		Link.findOneAndRemove({_id:req.params.id}, function (err, link) {
			res.send(link);
		});
	}
}

module.exports = LinksCtrl;

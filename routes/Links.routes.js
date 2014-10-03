/*=== Link CRUD Routes ===*/
var LinksCtrl = require("../controllers/LinksCtrl");

var LinksRoutes = function(app) {

	app.post("/links", function(req, res) {
		LinksCtrl.create(req, res);
	});

	app.get("/links", function(req, res) {
		LinksCtrl.fetchAll(req, res);
	});

	app.get("/links/:id", function(req, res) { //try findById
		LinksCtrl.fetch(req, res);
	});

	app.put("/links/:id", function(req, res) {
		LinksCtrl.update(req, res);
	});

	app.delete("/links/:id", function(req, res) {
		LinksCtrl.delete(req, res);
	});

}

module.exports = LinksRoutes;
/*=== Link Model ===*/

var mongoose = require('mongoose');

var LinkModel = function() {

	var LinkSchema = mongoose.Schema({
		id: Object id, title: String, url: String, votesUp: Double, votesDown: Double
	});

	return mongoose.model('Link', LinkSchema);
}

module.exports = LinkModel;

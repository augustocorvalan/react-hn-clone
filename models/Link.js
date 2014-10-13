/*=== Link Model ===*/

var mongoose = require('mongoose');

var LinkModel = function() {

	var LinkSchema = mongoose.Schema({
		title: String, url: String, votesUp: Number, votesDown: Number, created: Date 
	});

	return mongoose.model('Link', LinkSchema);
}

module.exports = LinkModel;

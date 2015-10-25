var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	portrait: String,
	displayName: String,
	wallet: Array
});

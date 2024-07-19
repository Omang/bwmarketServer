const mongoose = require('mongoose');


const PaidSchema = new mongoose.Schema({
	code: {type: String},
	fullname: {type: String},
	duration: {type: String}
}, {timestamps: true});

module.exports = mongoose.model('Payment', PaidSchema);
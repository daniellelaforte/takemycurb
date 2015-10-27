var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  googleId: {
	  type: String,
  },
});


var User = mongoose.model('user', userSchema)

module.exports = User


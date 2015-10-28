var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  googleId: {
	  type: String,
  },
  startTime: {type: Number},
  endTime: {type: Number},
  geoAddress: {type: Object},
  flag: {type: Boolean}
});


var User = mongoose.model('user', userSchema)

module.exports = User


// Include our Model
var theUser = require('../models/users')

// Define our Route Handlers

// Create a NEW Hero
var createUser = function(req, res){
	// Data from a POST request lives in req.body

	var newUser = new theUser({
		id			: req.body.id,
	})

	newUser.save( function(err, doc){
		res.send(doc)
	} )

}


module.exports = {
	createUser : createUser,
}
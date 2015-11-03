// Include our Model
var theUser = require('../models/users')

// Define our Route Handlers

// Create a NEW Hero
var createUser1 = function(req, res){
	// Data from a POST request lives in req.body
// googleId    : req.body.id
   	var mytime = new Date().getTime();
	var newUser = new theUser({
		googleId    :"11270938384195711868",
		address     :"1651 Broadway Boulder CO 80302", 
		startTime   : mytime,
		endTime     : mytime + 10000,
		flag        : true
	})

	newUser.save( function(err, doc){
		res.send(doc)
	} )

}

var createUser2 = function(req, res){
	// Data from a POST request lives in req.body
// googleId    : req.body.id
	var mytime = new Date().getTime();
	var secondUser = new theUser({
		googleId    : "112709383841957118685",
		address     :"1001 Arapahoe Ave, Boulder, CO 80302", 
		startTime   :mytime,
		endTime     :mytime + 60000,
		flag        : true
	})

	secondUser.save( function(err, doc){
		res.send(doc)
	} )

}

var createUser3 = function(req, res){
	// Data from a POST request lives in req.body
// googleId    : req.body.id
	var mytime = new Date().getTime();
	var thirdUser = new theUser({
		googleId    :"112709383841957118684",
		address     :"1400 Walnut St, Boulder, CO 80302", 
		startTime   :mytime,
		endTime     :mytime + 120000,
		flag        : true
	})

	thirdUser.save( function(err, doc){
		res.send(doc)
	} )

}

var createUser4 = function(req, res){
	// Data from a POST request lives in req.body
// googleId    : req.body.id
	var mytime = new Date().getTime();
	var fourthUser = new theUser({
		googleId    :"112709383841957118682",
		address     :"1005 Pearl St, Boulder, CO 80302", 
		startTime   :mytime + 180000,
		endTime     :mytime,
		flag        : true
	})

	fourthUser.save( function(err, doc){
		res.send(doc)
	} )

}

var createUser5 = function(req, res){
	// Data from a POST request lives in req.body
// googleId    : req.body.id
	var mytime = new Date().getTime();
	var fifthUser = new theUser({
		googleId    :"112709383841957118681",
		address     :"1441 Pearl St, Boulder, CO 80302", 
		startTime   :mytime,
		endTime     :mytime + 240000,
		flag        : true
	})

	fifthUser.save( function(err, doc){
		res.send(doc)
	} )

}

// var timeFinder = function(req, res){

// 	users.find( function(err, doc){
// 		res.send(doc)
// 	} )

// }


module.exports = {
	createUser1 : createUser1,
	createUser2 : createUser2,
	createUser3 : createUser3,
	createUser4 : createUser4,
	createUser5 : createUser5,
}
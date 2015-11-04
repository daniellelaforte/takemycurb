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

var createUser6 = function(req, res){
	// Data from a POST request lives in req.body
// googleId    : req.body.id
   	var mytime = new Date().getTime();
	var sixthUser = new theUser({
		googleId    :"11270938384195711860",
		address     :"926 Pearl St, Boulder, CO 80302", 
		startTime   : mytime,
		endTime     : mytime + 60000,
		flag        : true
	})

	sixthUser.save( function(err, doc){
		res.send(doc)
	} )

}

var createUser7 = function(req, res){
	// Data from a POST request lives in req.body
// googleId    : req.body.id
   	var mytime = new Date().getTime();
	var seventhUser = new theUser({
		googleId    :"11270938384195711841",
		address     :"1942 Broadway, Boulder, CO 80302", 
		startTime   : mytime,
		endTime     : mytime + 120000,
		flag        : true
	})

	seventhUser.save( function(err, doc){
		res.send(doc)
	} )

}

var createUser8 = function(req, res){
	// Data from a POST request lives in req.body
// googleId    : req.body.id
   	var mytime = new Date().getTime();
	var eigthUser = new theUser({
		googleId    :"11270938384195711840",
		address     :"1402 Broadway, Boulder, CO 80302", 
		startTime   : mytime,
		endTime     : mytime + 180000,
		flag        : true
	})

	eigthUser.save( function(err, doc){
		res.send(doc)
	} )

}

var createUser9 = function(req, res){
	// Data from a POST request lives in req.body
// googleId    : req.body.id
   	var mytime = new Date().getTime();
	var ninthUser = new theUser({
		googleId    :"11270938384195711842",
		address     :"1730 Pearl St, Boulder, CO 80302", 
		startTime   : mytime,
		endTime     : mytime + 240000,
		flag        : true
	})

	ninthUser.save( function(err, doc){
		res.send(doc)
	} )

}

var createUser10 = function(req, res){
	// Data from a POST request lives in req.body
// googleId    : req.body.id
   	var mytime = new Date().getTime();
	var tenthUser = new theUser({
		googleId    :"11270938384195711843",
		address     :"2115 13th St, Boulder, CO 80302", 
		startTime   : mytime,
		endTime     : mytime + 60000,
		flag        : true
	})

	tenthUser.save( function(err, doc){
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
	createUser6 : createUser6,
	createUser7 : createUser7,
	createUser8 : createUser8,
	createUser9 : createUser9,
	createUser10 : createUser10,
}
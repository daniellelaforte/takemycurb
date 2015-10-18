// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var json = require('express-json');
// var someFile = require('./scaffold.js') // looking for our own file
var GOOGLE_CLIENT_ID = '512580275271-gb59krbdvbesvth60cbg45df0aq4dju2.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = 'QD5xxzw04zy2Wiy4uR82riGD';
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;




passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
}, 
  function(accesstoken, refreshToken, profile, done) {
    //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    // return done(err, user);
    // });
    console.log(profile);
    return done(null, profile);
  }
));

// Create Express App Object \\
var app = express();
//app.engine('.html', require('ejs').__express);
//app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(json()).use(json.urlencoded());
app.use(session({ secret: 'SECRET', resave: true,
  saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public') );


app.get('/login', function(req, res) {
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.sendFile('login.html', {root : './public', user: req.user});
  }
});

app.get('/auth/google', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});


// Application Configuration \\
// Data is normally sent in a URL encoded string OR stringified JSON
// {
//   name : 'McGillyCuddy',
//   age  : 120
// }
// name=McGillyCuddy&age=20



// Serving Static Files (typically HTML, CSS, JS, or images)


// Routes \\
app.get('/', function(req, res){
  if(req.isAuthenticated()){
  res.sendFile('driveway.html', {root : './public', user: req.user});
  } else {
    res.redirect('/login');
  }
});



// Static file serving will override this route if it is defined BEFORE this route
// and there is a filename that matches the route defined below


// Creating Server and Listening for Connections \\
var port = 3000;

app.listen(port, function(){
  console.log('Server running on port ' + port);

});





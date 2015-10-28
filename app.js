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

var userCtrler = require('./controllers/userCtrl');
var User = require('./models/users');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/allusers')


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
}, function(accesstoken, refreshToken, profile, done) {
  console.log(profile);
  User.findOne({
    googleId: profile.id
    }, function (err, user) {
      if (err) {
        return done(err, null);
      }
      if (user) {
        return done(null, user);
      }
      var user = new User({
        googleId: profile.id,
      })

      user.save(function(err) {
        if (err) {return done(err, null)}
        return done(null, user);
      })
    }
   );
}))

var timeQuery = function (){
  User.find(function(err, docs){
    for (var i in docs){
      console.log(docs[i].startTime);
      
    }
    });

}

timeQuery();









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

app.post('/geocode', function(req, res) {
  
})




// Routes \\
app.get('/', function(req, res){
  if(req.isAuthenticated()){
   // console.log(req.body);
  res.sendFile('driveway.html', {root : './public', user: req.user});
  } else {
    res.redirect('/login');
  }
});


app.get('/api/me', function(req, res){
  res.send(req.user)
})

var port = 3000;

app.listen(port, function(){
  console.log('Server running on port ' + port);

});





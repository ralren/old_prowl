//app.js

//BASE SETUP
//=======================================================================
//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
//https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application

//Import modules.
var express = require('express');
var app = express();
var handlebars  = require('express-handlebars');
var bodyParser = require('body-parser');

//Import database.
//var db = require('./lib/server.js');

//Import authentication library.
var server = require('./lib/server.js');

app.set('port', process.env.PORT || 3000);

//configure app to use bodyParser() for getting data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configure app to use handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static file serving
app.use(express.static(__dirname + '/public'));

//ROUTES FOR PROWL FRONTEND
//=======================================================================

//serves up the homepage
app.get('/', function (req, res) {
    res.render('home', {title: 'prowl'});
});

app.post('/', function(req, res){
  //get form information
  var email = req.body.email;
  var channel = req.body.channel;
  var keywords = req.body.keywords;

  //if one of the fields is missing
  if (!email || !channel || !keywords) {
    var message = "Whoops! Fields were missing!";
    res.render('home', {title: 'prowl', message: message});
  }

  //check if channel exists
  server.channelExistence(channel, function(result, cb) {
    if (result < 0) {
      var message = "Sorry, channel doesn't exist!";
      res.render('home', {title: 'prowl', message: message});
    }
  });

  //if email doesn't exist already, add it
  server.isProwler(email, function(result) {
    if (!result) {
      server.addProwler(email, function(reply) {
        if (err) {
          console.log(err);
        } else {
          console.log(reply);
        }
      });
    }
  });

  //if channel doesn't exist already, add it
  server.isProwlerChannel(email, channel, function(result) {
    if (!result) {
      server.addProwlerChannel(email, channel, function(reply) {
        if (err) {
          console.log(err);
        } else {
          console.log(reply);
        }
      });
    }
  });

  //if keywords doesn't exist already, add it
  server.isKeywords(email, channel, keywords, function(result) {
    if (!result) {
      server.addKeywords(email, channel, keywords, function(reply) {
        if (err) {
          console.log(err);
        } else {
          console.log(reply);
        }
      });
    }
  });

  res.render('home', {title: 'prowl', message: "Welcome to the system!"});
});

//START THE SERVER
//=======================================================================
app.listen(app.get('port'), function () {
	console.log('Express started on http://localhost:' +
							app.get('port') + '; press Ctrl-C to terminate');
});

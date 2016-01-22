//app.js

//BASE SETUP
//=======================================================================

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
  } else {

    //check if channel exists
    server.channelExists(channel, function(result, cb) {
      console.log(result);
      if (!result) {
        var message = "Sorry, channel doesn't exist!";
        res.render('home', {title: 'prowl', message: message});
      } else {

        //add everything because sets don't allow duplicates anyways
        server.addProwler(email, function(reply) {
          if (err) {
            console.log(err);
          } else {
            console.log(reply);
          }
        });

        server.addProwlerChannel(email, channel, function(reply) {
          if (err) {
            console.log(err);
          } else {
            console.log(reply);
          }
        });

        server.addChannel(channel, function(reply) {
          if (err) {
            console.log(err);
          } else {
            console.log(reply);
          }
        });

        server.addChannelID(channel, function(reply){
          if (err) {
            console.log(err);
          } else {
            console.log(reply);
          }
        });

        server.addKeywords(email, channel, keywords, function(reply) {
          if (err) {
            console.log(err);
          } else {
            console.log(reply);
          }
        });
        res.render('home', {title: 'prowl', message: "Everything is good to go!"});
      }
    });
  }
});

//START THE SERVER
//=======================================================================
app.listen(app.get('port'), function () {
	console.log('Express started on http://localhost:' +
							app.get('port') + '; press Ctrl-C to terminate');
});

//equivalent to app.js

//BASE SETUP
//=======================================================================
//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
//https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application
var express = require('express');
var handlebars = require('express-handlebars')
var app = express();
var bodyParser = require('body-parser');
var redis = require('redis');
var youtube = require('youtube-api');
var db = require('./server.js');

app.set('port', process.env.PORT || 3000);

//set up handlebars view engine
var view = handlebars.create({ defaultLayout:'main' });
app.engine('handlebars', view.engine);
app.set('view engine', 'handlebars');

//configure app to use bodyParser() for getting data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ROUTES FOR PROWL FRONTEND
//=======================================================================

app.get('/prowlers', function(req, res) {
    db.getProwlers(function(err, docs) {
      res.json({prowlers: docs});
    });
});

app.get('/channels', function(req, res) {
    db.getChannels('ldelosreyes@smith.edu', function(err, docs) {
      res.json({channels: docs});
    });
});

app.get('/keywords', function(req, res) {
    db.getKeywords('ldelosreyes@smith.edu', 'chaoticmonki', function(err, docs) {
      res.json({keywords: docs});
    });
});

app.get('/channelID', function(req, res) {
    db.getChannelID('chaoticmonki', function(err, docs) {
      res.json({playlistID: docs});
    });
});


//START THE SERVER
//=======================================================================
app.listen(app.get('port'), function () {
	console.log('Express started on http://localhost:' +
							app.get('port') + '; press Ctrl-C to terminate');
});

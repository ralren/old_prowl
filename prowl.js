//equivalent to app.js

//BASE SETUP
//=======================================================================
//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
//https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var redis = require('redis');
var youtube = require('youtube-api');

app.set('port', process.env.PORT || 3000);

//configure app to use bodyParser() for getting data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ROUTES FOR PROWL FRONTEND
//=======================================================================
//test route to make sure everything is working
app.get('/', function(req, res) {
    res.send('hooray! welcome to the website!');
});


//START THE SERVER
//=======================================================================
app.listen(app.get('port'), function () {
	console.log('Express started on http://localhost:' +
							app.get('port') + '; press Ctrl-C to terminate');
});

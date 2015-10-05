//BASE SETUP
//=======================================================================
//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var redis = require('redis');
var youtube = require('youtube-api');

//TODO: set up connection to redis
//TODO: create a separate file of our models

app.set('port', process.env.PORT || 3000);

//configure app to use bodyParser() for getting data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ROUTES FOR SELDOM API
//=======================================================================
var router = express.Router(); //get an instance of express router

//TODO: add routes specifically for channels, 'prowls', and emails

//test route to make sure everything is working
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to the api!'});
});

//REGISTER ROUTES
//=======================================================================
//all of our routes will be prefixed with /api
app.use('/api', router);

//START THE SERVER
//=======================================================================
app.listen(app.get('port'), function () {
	console.log('Express started on http://localhost:' +
							app.get('port') + '; press Ctrl-C to terminate');
});

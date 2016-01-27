//prowler.js

//BASE SETUP
//=======================================================================
//where emailing and stuff gets done

//set up connection to redis
var redis = require('redis');
var client = redis.createClient();

//set up youtube connection
var youtube = require('youtube-api');
var apiKey = require('../credentials.js');
youtube.authenticate({
  type: 'key',
  key: apiKey,
});


/*
+need a redis key that saves the time of last checked
+also need to create models/objects for channels and videos
+channels have one field: the list of videos that have been uploaded since the
  script last ran
+seen channels will be stored in a set to keep
+videos have several fields: url, title, description?

+need a function that checks on the youtube uploads
+need a function that breaks down the title
+need a function that emails people once a title and keyword match


*/

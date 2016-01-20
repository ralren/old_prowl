//delegate.js

//BASE SETUP
//=======================================================================
//where we check if everything in the form is peachy

//set up youtube connection
var youtube = require('youtube-api');
var api_key = require('../credentials.js');
youtube.authenticate({
  type: 'key',
  key: api_key,
});

exports.channelExistence = function(channel, cb) {
  youtube.channels.list({
    part: 'contentDetails',
    forUsername: channel
  }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      cb((data.items).length);
    }
  });
};

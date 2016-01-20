//server.js

//BASE SETUP
//=======================================================================

//set up connection to redis
var redis = require('redis');
var client = redis.createClient();

//set up youtube connection
var youtube = require('youtube-api');
var api_key = require('../credentials.js');
youtube.authenticate({
  type: 'key',
  key: api_key,
});

// GET functions
//=======================================================================

//Fetch all emails/prowlers.
exports.getProwlers = function(cb) {
  client.smembers('prowler', function(err, prowlers) {
    if (err) {
      console.log(err);
    } else {
      cb(null, prowlers);
    }
  });
};

//Fetch all channels for an email/prowler.
exports.getChannels = function(email, cb) {
  var key = 'prowler:'.concat(email);
  client.smembers(key, function(err, channels) {
    if (err) {
      console.log(err);
    } else {
      cb(null, channels);
    }
  });
};

//Fetch all keys for an email/prowler.
exports.getKeywords = function(email, channel, cb) {
  var key = 'prowler:'.concat(email, ':', channel);
  client.smembers(key, function(err, keywords) {
    if (err) {
      console.log(err);
    } else {
      cb(null, keywords);
    }
  });
};

//Fetch playlistID of a channel.
exports.getChannelID = function(channel, cb) {
  var key = 'channel:'.concat(channel);
  client.get(key, function(err, playlistID) {
    if (err) {
      console.log(err);
    } else {
      cb(null, playlistID);
    }
  });
};

// DELETE functions
//=======================================================================

//Delete an email
exports.deleteProwler = function(email, cb) {
  client.srem('prowler', email, function(err, reply) {
    if (err) {
      console.log(err);
    } else {
      console.log(reply);
    }
  });
};

//Delete a channel from an email.
exports.deleteChannel = function(email, channel, cb) {
  var key = 'prowler:'.concat(email);
  client.srem(key, channel, function(err, reply) {
    if (err) {
      console.log(err);
    } else {
      console.log(reply);
    }
  });
};

//Delete a keyword from an email's channel.
exports.deleteKeyword = function(email, channel, keyword, cb) {
  var key = 'prowler:'.concat(email, ':', channel);
  client.srem(key, keywords, function(err, reply) {
    if (err) {
      console.log(err);
    } else {
      console.log(reply);
    }
  });
};

// POST functions
//=======================================================================

//Add a channel to the list.
exports.addChannel = function(channel, cb) {
  client.sadd(['channel', channel], function(err, reply) {
    if (err) {
      console.log(err);
    } else {
      console.log("Added to prowler's channels.");
    }
  });
};

//Add the ID for a channel
exports.addChannelID = function(channel, cb) {
  var key = 'channel:'.concat(channel);

  //find the id for the channel
  youtube.channels.list({
    part: 'contentDetails',
    forUsername: channel
    }, function(err, data) {
      if (err) {
        console.log(err);
      } else {

        //assign the id to the channel
        var channelID = data.items[0].contentDetails.relatedPlaylists.uploads;
        client.set(key, channelID, function(err, reply) {
          if (err) {
            console.log(err);
          } else {
            console.log("Added channel id.");
          }
      });
    }
  });
};

//Add email to prowler list.
exports.addProwler = function(email, cb) {
  client.sadd('prowler', email, function(err, reply) {
    if (err) {
      console.log(err);
    } else {
      console.log("Added prowler.");
    }
  });
};

//Add channel to prowler's list.
exports.addProwlerChannel = function(email, channel, cb) {
  var key = 'prowler:'.concat(email);
  client.sadd(key, channel, function(err, reply) {
    if (err) {
      console.log(err);
    } else {
      console.log("Added prowler channel.");
    }
  });
};

//Add keywords to prowler and designated channel
exports.addKeywords = function(email, channel, keywords, cb) {
  var key = 'prowler:'.concat(email, ':', channel);
  client.sadd(key, keywords, function(err, reply) {
    if (err) {
      console.log(err);
    } else {
      console.log("Added keywords.");
    }
  });
};

// HELPER functions
//=======================================================================

//Does the channel exist on Youtube?
exports.channelExists = function(channel, cb) {
  youtube.channels.list({
    part: 'contentDetails',
    forUsername: channel
  }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      cb((data.items).length > 0);
    }
  });
};

//server.js

//BASE SETUP
//=======================================================================
//http://www.sitepoint.com/using-redis-node-js/

var redis = require('redis');
var client = redis.createClient();

client.smembers('prowler', function(err, reply) {
    console.log(reply);
});


//add to channel
//add to prowler
//add channel to prowler:[email]
//add keywords to prowler:[email]

//delete prowler
//delete channel from prowler:[email]
//delete keywords from prowler:[email]

//fetch channel's playlist id
//fetch email's channels
//fetch a prowler's channel's keywords

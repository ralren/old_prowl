# Description

Prowl is a work in progress web app that aims to email subscribers YouTube videos they're specifically waiting to be uploaded.

# Example
For example, I'm a big fan of Let's Plays and particularly like watching Markiplier's videos on the horror video game Five Nights at Freddy's. I would put my email in my app, add that I'm looking for videos on Markiplier's channel, and the keywords I would be looking for is "Five Nights at Freddy's". I could also be more thorough and do it again to add "FNAF" as a new keyword to keep an eye on.

Now, maybe weeks go on by until Markiplier finally uploads a video of the new FNAF. When that happens, my web app will email me a link to the video instead of me having to go on YouTube every hour of the day for weeks on end to check if Markiplier has uploaded a video of my interest.

# TODOs
* Set up server.js
* Set up routes in prowl.js.
* Work on service.js - the meat of this project.

# NOTES to SELF
* To fetch a Youtuber's Playlist ID GET: https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=chaoticmonki&key={YOUR_API_KEY}

  Should be under contentDetails:relatedPlaylists:uploads
* set channel:presshearttocontinue UU_ufxdQbKBrrMOiZ4LzrUyA
* set channel:markiplier UUxubOASK0482qC5psq89MsQ
* set channel:chaoticmonki UUu2yrDg7wROzElRGoLQH82A

can set a phrase with ""

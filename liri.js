require('dotenv').config();

var keys = require('./key');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

// if (command == 'my-tweets') {
//   client.get('statuses/user_timeline', function(error, tweets, response) {
//     if (!error) {
//       for (var i in tweets) {
//         console.log('Post ' + i);
//         console.log('Post Title: ' + tweets[i].text);
//         console.log('Created on: ' + tweets[i].created_at);
//       }
//     }
//   });
// }

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  var artist = data.tracks.items[0].artists[0].name;
  var songname = data.tracks.items[0].name;
  var songPreview = data.tracks.items[0].external_urls.spotify;
  var album = data.tracks.items[0].album.name;
  console.log("=================");
  console.log("Artist: ", artist);
  console.log("Song: ",  songname);
  console.log("Song Preview: ", songPreview);
  console.log("Album: ", album);
  console.log("=================")

});
// console.log(JSON.stringify(tweets, undefined, 2));

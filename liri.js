require('dotenv').config();

var keys = require('./key');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var input = process.argv[3];

if (command === 'my-tweets') {
  client.get('statuses/user_timeline', function(error, tweets, response) {
    if (!error) {
      for (var i in tweets) {
        console.log('\x1b[33m%s\x1b[0m', 'Post Title: ' + tweets[i].text);
        console.log('Created on: ' + tweets[i].created_at);
      }
    }
  });
} else if (command === 'spotify-this-song') {
  if (input === undefined) {
    spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      var artist = data.tracks.items[0].artists[0].name;
      var songname = data.tracks.items[0].name;
      var songPreview = data.tracks.items[0].external_urls.spotify;
      var album = data.tracks.items[0].album.name;

      console.log('=================');
      console.log('Artist: ', artist);
      console.log('Song: ', songname);
      console.log('Song Preview: ', songPreview);
      console.log('Album: ', album);
      console.log('=================');
    });
  } else {
    spotify.search({ type: 'track', query: input }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      var artist = data.tracks.items[0].artists[0].name;
      var songname = data.tracks.items[0].name;
      var songPreview = data.tracks.items[0].external_urls.spotify;
      var album = data.tracks.items[0].album.name;

      console.log('Artist: ', artist);
      console.log('Song: ', songname);
      console.log('Song Preview: ', songPreview);
      console.log('Album: ', album);
    });
  }
} else if (command === 'movie-this') {
  if (input === undefined) {
    request(
      'http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy',
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log('Movie Title: ' + JSON.parse(body).Title);
          console.log('Year: ' + JSON.parse(body).Year);
          console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
          console.log(
            'Rotten Tomatoes Ratings: ' + JSON.parse(body).Ratings[1].Value
          );
          console.log(
            'Countries where movie is produced: ' + JSON.parse(body).Country
          );
          console.log('Language: ' + JSON.parse(body).Language);
          console.log('Plot: ' + JSON.parse(body).Plot);
          console.log('Actors: ' + JSON.parse(body).Actors);
        }
      }
    );
  } else {
    request(
      `http://www.omdbapi.com/?t=${input}&y=&plot=short&apikey=trilogy`,
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log('Movie Title: ' + JSON.parse(body).Title);
          console.log('Year: ' + JSON.parse(body).Year);
          console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
          console.log(
            'Rotten Tomatoes Ratings: ' + JSON.parse(body).Ratings[1].Value
          );
          console.log(
            'Countries where movie is produced: ' + JSON.parse(body).Country
          );
          console.log('Language: ' + JSON.parse(body).Language);
          console.log('Plot: ' + JSON.parse(body).Plot);
          console.log('Actors: ' + JSON.parse(body).Actors);
        }
      }
    );
  }
} else if (command === 'read-file') {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(',');

    spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      var artist = data.tracks.items[0].artists[0].name;
      var songname = data.tracks.items[0].name;
      var songPreview = data.tracks.items[0].external_urls.spotify;
      var album = data.tracks.items[0].album.name;

      console.log('Artist: ', artist);
      console.log('Song: ', songname);
      console.log('Song Preview: ', songPreview);
      console.log('Album: ', album);
    });
  });
}

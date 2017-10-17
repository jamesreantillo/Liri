// OMDB Here is your key: 331b47b5


// spotify
// Client ID: a2898be6341f421b84f437b1caf641b7
// Client Secret: 94f93b446aae40df8e45c4332ed950bc




var Twitter = require('twitter');
var action = process.argv[2];
var value = process.argv[3];
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var request = require("request");
var fs = require('fs');


switch (action) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        spotifyThis(value);
        break;
    case 'movie-this':
        omdbThis(value);
        break;
    case 'do-what-it-says':
        doWhatitSays(value)
}


// my-tweets function
function myTweets() {
    var client = new Twitter(keys.twitter);
    // console.log(client)
    var params = {
        screen_name: 'KingJames',
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error && response.statusCode == 200) {
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log(' ');
                console.log(number + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log(' ');
                fs.appendFile('log.txt', (number + '. Tweet: ' + tweets[i].text + '\r\nCreated at: ' + tweets[i].created_at + ' \r\n'), function(err) {
                    if (err) throw err;
                });
            }
        }
    });
}
 // end myTweets function

// spotifyThis function
function spotifyThis(value) {
    if (value == null) {
        value = 'The Sign';
    }
    var spotify = new Spotify({
          id: 'a2898be6341f421b84f437b1caf641b7',
          secret: '94f93b446aae40df8e45c4332ed950bc'
        });

        spotify.search({ type: 'track', query: value }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          } 
          else {
                for (var i = 0; i < data.tracks.items.length; i++) {
                
                console.log("------------------------------ " +  (i + 1) + " ------------------------------" + "\r\n")
                console.log("Artist: " + data.tracks.items[i].artists[0].name);
                console.log("Song: " + data.tracks.items[i].name);
                console.log("Preview Here: " + data.tracks.items[i].preview_url);
                console.log("Album: " + data.tracks.items[i].album.name);
                console.log("-----------------------------------------------------------------" )

                fs.appendFile("log.txt", "\r\n------------------------------ " +  (i + 1) + " ------------------------------" +
                                         '\r\nArtist: ' + data.tracks.items[i].artists[0].name + 
                                         '\r\nSong: ' + data.tracks.items[i].name +
                                         '\r\nPreview Here: ' + data.tracks.items[i].preview_url +
                                         '\r\nAlbum: ' + data.tracks.items[i].album.name +
                                         "\r\n---------------------------------------------------------------", function(err) {
                  if (err) {
                    console.log(err);
                  }
                });
                }
            
        
            }
        });
}
 // end spotifyThis function


// omdbThis function
function omdbThis(value) {
    if (value == null) {
        value = 'Mr. Nobody';
    }
        var queryUrl = "http://www.omdbapi.com/?t=" + value + "&tomatoes=true&y=&plot=short&apikey=40e9cece";
        request(queryUrl, function(error, response, body) {

          if (!error && response.statusCode === 200) {
            // console.log(body)
            console.log("----------------------------------------");    
            console.log('Title: ' + JSON.parse(body).Title);
            console.log('Release Year: ' + JSON.parse(body).Year);
            console.log('IMDb Rating: ' + JSON.parse(body).imdbRating);
            console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).tomatoRating);
            console.log('Country: ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Actors: ' + JSON.parse(body).Actors);
            console.log("----------------------------------------");
                fs.appendFile("log.txt", "\r\n----------------------------------------" +
                                         '\r\nTitle: ' + JSON.parse(body).Title + 
                                         '\r\nRelease Year:'  + JSON.parse(body).Year +
                                         '\r\nIMDb Rating: ' + JSON.parse(body).imdbRating +
                                         '\r\nRotten Tomatoes Rating: ' + JSON.parse(body).tomatoRating +
                                         '\r\nCountry: ' + JSON.parse(body).Country +
                                         '\r\nLanguage: ' + JSON.parse(body).Language +
                                         '\r\nPlot: ' + JSON.parse(body).Plot +
                                         '\r\nActors: ' + JSON.parse(body).Actors +
                                         "\r\n----------------------------------------", function(err) {
                  if (err) {
                    console.log(err);
                  }
                });
          }
        });
} 
//end omdbThis function

  

function doWhatitSays(){
    
    fs.readFile('random.txt', 'utf-8', function(err, data){
        
        var song = data.split(',');
        // console.log(song)
        if(song[0] === 'spotify-this-song'){
            spotifyThis(song[1]);
        }
    })
}


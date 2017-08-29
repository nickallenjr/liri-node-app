var keys = require('./keys.js');

var twitKeys = keys.twitterkeys;
var spotKeys = keys.spotifykeys;

var twitterKeyArray = [];
var twitterValueArray = [];
var spotifyKeyArray = [];
var spotifyValueArray= [];

var command = process.argv[2];
var input = process.argv[3];
var input2 = process.argv[4];
var inputargs = process.argv.slice(3);
var inputs = inputargs.join(' ');


// Take in the command line arguments
// var args = process.argv.slice(2);

// Build your address as an array or string
// var address = args.join(' ');

for (var key in twitKeys) {
	twitterKeyArray.push(key);
	twitterValueArray.push(twitKeys[key]);
}

for (var key in spotKeys) {
	spotifyKeyArray.push(key);
	spotifyValueArray.push(spotKeys[key]);
}

//For looping through keys if needed later
// for (var i = 0; i < keyArray.length; i++) {
// 	var [i] = keyArray[i];
// }

// for (var i = 0; i < twitterValueArray.length; i++) {
// 	value[i] = twitterValueArray[i];
// }


if (command === 'my-tweets') {
	var Twitter = require('twitter');

	var client = new Twitter({
		consumer_key: twitterValueArray[0],
		consumer_secret: twitterValueArray[1],
		access_token_key: twitterValueArray[2],
		access_token_secret: twitterValueArray[3]
	})

	//var params = {screen_name:'mrnickallenjr'};
	// var params = {q: 'twitter', lang: 'eu'}
	client.get('https://api.twitter.com/1.1/statuses/user_timeline.json', {screen_name: 'mrnickallenjr', count: 20}, function(error, tweets, response) {
		if(!error) {
			// console.log(tweets);
			for (var i = 0; i < tweets.length; i++) {
				console.log("Tweeted at: " + tweets[i].created_at + "");
				console.log("Tweet: " + tweets[i].text + "");
				console.log("-----------------------------")
			}
		}
	})

}else if (command === 'spotify-this-song') {
	var Spotify = require('node-spotify-api');

	var spotify = new Spotify({
		id: spotifyValueArray[0],
		secret: spotifyValueArray[1]
	});
	if (input === undefined) {
		spotify
		.request("https://api.spotify.com/v1/tracks/51QxenFmXlJXUN9mpvxlaL")
		.then(function(data) {
			console.log("Artist: " + data.album.artists[0].name + "");
			console.log("Song: " + data.name + "");
			console.log("Preview Link: " + data.preview_url + "");
			console.log("Album: " + data.album.name + "");
		})
		.catch(function(err) {
			console.log("The following error occured: " + err + "");
		});
	}else {
		spotify
		.search({ 
			type: 'track', 
			query: inputs,
			limit: 1,
		}).then(function(data) {
			console.log("Artist: " + data.tracks.items[0].artists[0].name + "");
			console.log("Song: " + data.tracks.items[0].name + "");
			console.log("Preview Link: " + data.tracks.items[0].uri + "");
			console.log("Album: " + data.tracks.items[0].album.name + "");
		})
	}
	

}else if (command === 'movie-this') {
	var request = require('request');
	if (input === undefined) {
			request("http://www.omdbapi.com/?t=Mr.?Nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {
			if (!error) {
				var movieInfo = JSON.parse(body);
				console.log("Title: " + movieInfo.Title + "");
				console.log("Year: " + movieInfo.Year + "");
				console.log("IMDB Rating: " + movieInfo.Ratings[0].Value + "");
				console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value + "");
				console.log("Country: " + movieInfo.Country + "");
				console.log("Language: " + movieInfo.Language + "");
				console.log("Plot: " + movieInfo.Plot + "");
				console.log("Actors: " + movieInfo.Actors + "");
			}
		})
	}else {
		request("http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
			if (!error) {
				var movieInfo = JSON.parse(body);
				console.log("Title: " + movieInfo.Title + "");
				console.log("Year: " + movieInfo.Year + "");
				console.log("IMDB Rating: " + movieInfo.Ratings[0].Value + "");
				console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value + "");
				console.log("Country: " + movieInfo.Country + "");
				console.log("Language: " + movieInfo.Language + "");
				console.log("Plot: " + movieInfo.Plot + "");
				console.log("Actors: " + movieInfo.Actors + "");
			}
		})
	}

}else if (command === 'do-what-it-says') {
	var fs = require('fs');
	fs.readFile('random.txt', 'utf8', function(err, data) {
		if (err) {
			return console.log(err);
		}
		var dataArr = data.split(',');

		var Spotify = require('node-spotify-api');

		var spotify = new Spotify({
			id: spotifyValueArray[0],
			secret: spotifyValueArray[1]
		})
		spotify
			.search({ 
				type: 'track', 
				query: dataArr[1],
				limit: 1,
			}).then(function(data) {
				console.log("Artist: " + data.tracks.items[0].artists[0].name + "");
				console.log("Song: " + data.tracks.items[0].name + "");
				console.log("Preview Link: " + data.tracks.items[0].uri + "");
				console.log("Album: " + data.tracks.items[0].album.name + "");
			})
	})
}

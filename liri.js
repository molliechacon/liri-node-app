// keys and package requests
var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var spotifyAPI = require("node-spotify-api");
var fs = require("fs");


// input variables
var nodeArgs = process.argv;
var command = process.argv[2];


// grabbing entire song/movie name using a for loop
var userInput = "";

for (var i = 3; i < nodeArgs.length; i++) {
	if (i > 3 && i < nodeArgs.length) {
		userInput = userInput + "+" + nodeArgs[i];
	} else {
		userInput += nodeArgs[i];
	}
}


// cases
if (command === "my-tweets") {
	myTweets();
} else if (command === "spotify-this-song") {
	if (userInput){
	spotifySong();
	} else {
		userInput = "The Sign Ace of Base";
		spotifySong();
	}
} else if (command === "movie-this") {
	if (userInput){
		movieThis();
	} else {
		userInput = "Mr. Nobody"
		movieThis();
	}
} else if (command === "do-what-it-says") {
	doWhatItSays();
} else {
	console.log("Please enter one of the following required commands: my-tweets, spotify-this-song, movie-this or do-what-it-says.");
}


// functions
function myTweets() {

	var params = {screen_name: "PearlMaferl"};
	var client = new twitter(keys);

	client.get("statuses/user_timeline", params, function(error, tweets, response) {
		if (!error) {

			console.log(" ");
			console.log("=============== My Tweets ==============");
			console.log(" ");
			for (i = 0; i < tweets.length; i++) {
				var twitterData = (tweets[i].created_at + "\n" + tweets[i].text + "\n");
				console.log(twitterData);
			}
		}
	})
};

function spotifySong() {

	var spotifyKey = new spotifyAPI({
		id: "1b10b9d316bb4217982080097aae03c1",
		secret: "32e21acefdb248a5b457ae0f1c997c69"
	});

	spotifyKey.search({type: "track", query: userInput, limit: 1}, function(err, data) {

		if (err) {
			console.log("Error occured: " + err);
		} else {

			var data = data.tracks.items[0];

			console.log(" ");
			console.log("=============== Sweet Song Info! ==============");
			console.log(" ");
			console.log("Artist: " + data.artists[0].name);
			console.log("Song Name: " + data.name);
			console.log("Preview Link: " + data.preview_url);
			console.log("Album: " + data.album.name);
		}
	})
};

function movieThis() {

	var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=40e9cece";

	request(queryURL, function(error, response, body) {
		if (!error && response.statusCode === 200){

			var body = JSON.parse(body);

			console.log("Movie Title: " + body.Title);
			console.log("Year: " + body.Year);
			console.log("IMDB Rating: " + body.imdbRating);
			console.log("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
			console.log("Country: " + body.Country);
			console.log("Language: " + body.Language);
			console.log("Plot: " + body.Plot);
			console.log("Actors: " + body.Actors);
		} 
	})
};

function doWhatItSays() {

	fs.readFile("random.txt", "utf8", function(error, data) {

		if(error){
			return console.log(error);
		} else {

			var fileAction = data.split(",");

			command = fileAction[0];
			userInput = fileAction[1];

			if (command === "my-tweets") {
				myTweets();
			} else if (command === "spotify-this-song") {
				if (userInput){
				spotifySong();
				} else {
					userInput = "The Sign Ace of Base";
					spotifySong();
				}
			} else if (command === "movie-this") {
				if (userInput){
					movieThis();
				} else {
					userInput = "Mr. Nobody"
					movieThis();
				}

			}
		}
	});
};
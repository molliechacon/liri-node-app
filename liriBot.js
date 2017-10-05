// keys and package requests
// var twitterkeys = require("./keys.js")
var request = require("request");

// input variables
var nodeArgs = process.argv;
var command = process.argv[2];

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
	spotifySong();

} else if (command === "movie-this") {
	movieThis();

} else if (command === "do-what-it-says") {
	doWhatItSays();
}

// } else if () {

// }

// functions
function myTweets() {

};

function spotifySong() {

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

};
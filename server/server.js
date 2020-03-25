const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const unirest = require("unirest");
const words = [
	"bookworm",
	"buzzwords",
	"pneumonia",
	"puzzling",
	"yachtsman",
	"xylophone",
	"transcript"
];
const req = unirest(
	"GET",
	`https://wordsapiv1.p.rapidapi.com/words/${
		words[Math.floor(Math.random() * words.length)]
	}/definitions`
);

req.headers({
	"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
	"x-rapidapi-key": "f3eaf87e7bmsh27b6ab2b9afaef8p17f034jsne7aef592f6d7"
});

req.end(function(res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/word", (req, res) =>
	res.send({
		world: words[Math.floor(Math.random() * words.length)]
	})
);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("/guest", function(req, res) {
	res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

const express = require("express");
const app = express();
const port = 3000;

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

app.get("/world", (req, res) =>
	res.send({
		world: words[Math.floor(Math.random() * words.length)]
	})
);

app.listen(port, () => console.log(`Listening on port ${port}!`));
